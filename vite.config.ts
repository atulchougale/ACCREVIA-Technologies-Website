import { defineConfig, loadEnv, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pages } from "./src/config/pages.ts";

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Build-time SEO plugin:
 *  - resolves %SITE_URL% in index.html (canonical, Open Graph) and drops those tags when no URL is known
 *  - emits a static HTML file per route with correct title / description / canonical (crawler-friendly, no SSR needed)
 *  - emits robots.txt and (when a site URL is known) sitemap.xml
 * The site URL comes from VITE_SITE_URL, or from Netlify's built-in URL variable during Netlify builds.
 */
function seoPlugin(siteUrl: string): Plugin {
  let resolved: ResolvedConfig;
  return {
    name: "accrevia-seo",
    configResolved(config) {
      resolved = config;
    },
    transformIndexHtml(html) {
      if (siteUrl) return html.replaceAll("%SITE_URL%", siteUrl);
      return html
        .split("\n")
        .filter((line) => !line.includes("%SITE_URL%") && !line.includes('property="og:image'))
        .join("\n");
    },
    closeBundle() {
      const dist = resolve(resolved.root, resolved.build.outDir);
      let template: string;
      try {
        template = readFileSync(resolve(dist, "index.html"), "utf-8");
      } catch {
        return;
      }

      for (const page of pages) {
        if (page.path === "/") continue;
        const canonical = siteUrl ? `${siteUrl}${page.path}` : "";
        let html = template
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
          .replace(/(<meta name="description" content=").*?(")/, `$1${escapeHtml(page.description)}$2`)
          .replace(/(<meta property="og:title" content=").*?(")/, `$1${escapeHtml(page.title)}$2`)
          .replace(/(<meta property="og:description" content=").*?(")/, `$1${escapeHtml(page.description)}$2`)
          .replace(/(<meta name="twitter:title" content=").*?(")/, `$1${escapeHtml(page.title)}$2`)
          .replace(/(<meta name="twitter:description" content=").*?(")/, `$1${escapeHtml(page.description)}$2`);
        if (canonical) {
          html = html
            .replace(/(<link rel="canonical" href=").*?(")/, `$1${canonical}$2`)
            .replace(/(<meta property="og:url" content=").*?(")/, `$1${canonical}$2`);
        }
        const dir = resolve(dist, page.path.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, "index.html"), html);
      }

      const robots = ["User-agent: *", "Allow: /", ...(siteUrl ? ["", `Sitemap: ${siteUrl}/sitemap.xml`] : []), ""].join("\n");
      writeFileSync(resolve(dist, "robots.txt"), robots);

      if (siteUrl) {
        const urls = pages
          .filter((page) => page.indexable)
          .map((page) => `  <url>\n    <loc>${siteUrl}${page.path === "/" ? "/" : page.path}</loc>\n  </url>`)
          .join("\n");
        writeFileSync(
          resolve(dist, "sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
      } else {
        console.warn("[accrevia-seo] No site URL known (set VITE_SITE_URL) - sitemap.xml was not generated.");
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || process.env.URL || "").replace(/\/+$/, "");

  return {
    plugins: [react(), seoPlugin(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
  };
});
