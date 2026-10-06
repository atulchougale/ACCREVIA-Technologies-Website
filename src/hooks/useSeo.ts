import { useEffect } from "react";
import { siteConfig } from "../config/site";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
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

/** Sets the document title and social/SEO meta tags for the current route. */
export function useSeo({ title, description, path, noindex = false }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    // Absolute URLs are only emitted when the real site URL is known (never invented).
    const absolute = siteConfig.url ? `${siteConfig.url}${path === "/" ? "/" : path}` : null;
    upsertCanonical(absolute);
    if (absolute) upsertMeta("property", "og:url", absolute);
  }, [title, description, path, noindex]);
}
