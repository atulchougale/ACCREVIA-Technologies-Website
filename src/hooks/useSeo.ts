import { useEffect } from "react";
import type { PageMeta } from "../config/pages";
import { buildPageJsonLd } from "../config/structuredData";
import { siteConfig } from "../config/site";

const JSON_LD_ATTRIBUTE = "data-page-jsonld";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

function upsertCanonical(href: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

/**
 * Applies a page's SEO metadata (title, description, canonical, Open Graph, Twitter, robots, JSON-LD).
 * The same data is also written into the static HTML for every route at build time (see vite.config.ts),
 * so crawlers and link previews see correct metadata without running JavaScript.
 */
export function useSeo(page: PageMeta) {
  useEffect(() => {
    const { title, description, path, noindex } = page;
    const base = siteConfig.url;
    const url = `${base}${path === "/" ? "/" : path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (noindex) {
      upsertCanonical(null);
      removeMeta("property", "og:url");
    } else {
      upsertCanonical(url);
      upsertMeta("property", "og:url", url);
    }

    document.head.querySelectorAll(`script[${JSON_LD_ATTRIBUTE}]`).forEach((node) => node.remove());
    for (const block of buildPageJsonLd(page, base)) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(JSON_LD_ATTRIBUTE, "");
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [page]);
}
