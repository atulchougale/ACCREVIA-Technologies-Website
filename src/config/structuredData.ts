/**
 * JSON-LD builders. Only describes facts the website states: no ratings, reviews, prices or awards.
 * Pure module, shared by the runtime (useSeo) and the build-time plugin that writes static HTML per route.
 */
import { company } from "./company.ts";
import { getServiceBySlug } from "../data/serviceCatalog.ts";
import type { PageMeta } from "./pages.ts";

type JsonLd = Record<string, unknown>;

const absolute = (siteUrl: string, path: string) => `${siteUrl}${path === "/" ? "/" : path}`;

export function buildPageJsonLd(page: PageMeta, siteUrl: string): JsonLd[] {
  if (page.path === "/" || page.noindex) return [];
  const url = absolute(siteUrl, page.path);
  const provider = { "@type": "Organization", name: company.name, url: `${siteUrl}/` };
  const blocks: JsonLd[] = [];

  if (page.breadcrumb && page.breadcrumb.length > 1) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumb.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absolute(siteUrl, crumb.path),
      })),
    });
  }

  if (page.schema === "service" && page.serviceSlug) {
    const service = getServiceBySlug(page.serviceSlug);
    if (service) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        url,
        serviceType: service.title,
        provider,
      });
    }
  } else if (page.schema === "software") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "FarmStay",
      description: page.description,
      url,
      applicationCategory: "BusinessApplication",
      creator: provider,
    });
  } else {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url,
      isPartOf: { "@type": "WebSite", name: company.name, url: `${siteUrl}/` },
    });
  }
  return blocks;
}
