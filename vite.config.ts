import { defineConfig, loadEnv, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { formFields, HONEYPOT_FIELD } from "./src/config/forms.ts";
import { legacyRedirects, notFoundMeta, pages, type PageMeta } from "./src/config/pages.ts";
import { buildPageJsonLd } from "./src/config/structuredData.ts";

const DEFAULT_SITE_URL = "https://accreviatechnologies.online";

const escapeAttribute = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeJsonForHtml = (value: string) => value.replace(/</g, "\\u003c");

/** Hidden, static copies of the React forms so Netlify Forms can detect them at deploy time. */
function netlifyFormsMarkup() {
  const forms = Object.entries(formFields).map(([name, fields]) => {
    const inputs = [HONEYPOT_FIELD, ...fields].map((field) => `<input name="${field}" />`).join("");
    return `<form name="${name}" method="POST" data-netlify="true" netlify-honeypot="${HONEYPOT_FIELD}" hidden>${inputs}</form>`;
  });
  return forms.join("\n    ");
}

/**
 * Build-time SEO / routing plugin (runs on `vite build`):
 *  - resolves %SITE_URL% in index.html and injects the hidden Netlify Forms markup
 *  - writes one static HTML file per route (about.html, services/x.html ...) with its own title, description,
 *    canonical, Open Graph tags and JSON-LD, so crawlers see correct metadata without JavaScript
 *  - writes 404.html (served by Netlify with a real HTTP 404 for unknown URLs), robots.txt, sitemap.xml
 *    and a _redirects file that maps clean URLs to those files WITHOUT a catch-all rewrite
 * The site URL is the production domain by default and can be overridden with VITE_SITE_URL.
 */
function seoPlugin(siteUrl: string): Plugin {
  let resolved: ResolvedConfig;
  return {
    name: "accrevia-seo",
    configResolved(config) {
      resolved = config;
    },
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_URL%", siteUrl).replace("</body>", `    ${netlifyFormsMarkup()}\n  </body>`);
    },
    closeBundle() {
      const dist = resolve(resolved.root, resolved.build.outDir);
      let template: string;
      try {
        template = readFileSync(resolve(dist, "index.html"), "utf-8");
      } catch {
        return;
      }

      // Collapse whitespace inside <meta>/<link> tags so the replacements below work however index.html is formatted.
      template = template.replace(/<(meta|link)\b[^>]*>/g, (tag) => tag.replace(/\s+/g, " ").replace(/\s+\/>$/, " />"));

      const render = (page: PageMeta) => {
        const url = `${siteUrl}${page.path === "/" ? "/" : page.path}`;
        let html = template
          .replace(/<title>.*?<\/title>/, `<title>${escapeAttribute(page.title)}</title>`)
          .replace(/(<meta name="description" content=").*?(")/, `$1${escapeAttribute(page.description)}$2`)
          .replace(/(<meta property="og:title" content=").*?(")/, `$1${escapeAttribute(page.title)}$2`)
          .replace(/(<meta property="og:description" content=").*?(")/, `$1${escapeAttribute(page.description)}$2`)
          .replace(/(<meta name="twitter:title" content=").*?(")/, `$1${escapeAttribute(page.title)}$2`)
          .replace(/(<meta name="twitter:description" content=").*?(")/, `$1${escapeAttribute(page.description)}$2`);
        if (page.noindex) {
          html = html
            .replace(/\s*<link rel="canonical"[^>]*>/, "")
            .replace(/\s*<meta property="og:url"[^>]*>/, "")
            .replace("</head>", '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
        } else {
          html = html
            .replace(/(<link rel="canonical" href=").*?(")/, `$1${url}$2`)
            .replace(/(<meta property="og:url" content=").*?(")/, `$1${url}$2`);
        }
        const jsonLd = buildPageJsonLd(page, siteUrl)
          .map((block) => `    <script type="application/ld+json" data-page-jsonld>${escapeJsonForHtml(JSON.stringify(block))}</script>`)
          .join("\n");
        if (jsonLd) html = html.replace("</head>", `${jsonLd}\n  </head>`);
        return html;
      };

      const write = (relativePath: string, content: string) => {
        const target = resolve(dist, relativePath);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, content);
      };

      // Home keeps index.html (title / canonical already match); every other route gets its own flat .html file.
      write("index.html", render(pages[0]));
      for (const page of pages.slice(1)) write(`${page.path.slice(1)}.html`, render(page));
      write("404.html", render(notFoundMeta));

      // Redirects: legacy URLs, trailing-slash normalisation, then clean URL -> static file (HTTP 200).
      // There is intentionally NO "/* /index.html 200" rule: unknown URLs fall through to 404.html with HTTP 404.
      const redirects = [
        "# Generated by vite.config.ts (accrevia-seo). Do not edit by hand.",
        ...legacyRedirects.flatMap(({ from, to }) => [`${from}  ${to}  301!`, `${from}/  ${to}  301!`]),
        ...pages.slice(1).map((page) => `${page.path}/  ${page.path}  301!`),
        ...pages.slice(1).map((page) => `${page.path}  ${page.path}.html  200`),
        "",
      ];
      write("_redirects", redirects.join("\n"));

      write("robots.txt", ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n"));

      const urls = pages
        .filter((page) => page.indexable && !page.noindex)
        .map((page) => `  <url>\n    <loc>${siteUrl}${page.path === "/" ? "/" : page.path}</loc>\n  </url>`)
        .join("\n");
      write(
        "sitemap.xml",
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

  return {
    plugins: [react(), seoPlugin(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
  };
});
