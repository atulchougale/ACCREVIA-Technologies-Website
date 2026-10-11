/**
 * Route inventory and per-page SEO metadata. Pure data (no React / Vite imports) so the build plugin can read it
 * to generate per-route HTML, sitemap.xml, robots.txt and the Netlify redirects file.
 *
 * Every route here must also exist in src/App.tsx. Pages with `indexable: false` are excluded from sitemap.xml.
 */
import { serviceCatalog } from "../data/serviceCatalog.ts";

export interface Crumb {
  name: string;
  path: string;
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Included in sitemap.xml. */
  indexable: boolean;
  /** Adds <meta name="robots" content="noindex, nofollow"> (never combine with a robots.txt block). */
  noindex?: boolean;
  breadcrumb?: Crumb[];
  /** Structured data flavour for this page. */
  schema?: "service" | "software";
  serviceSlug?: string;
}

const HOME: Crumb = { name: "Home", path: "/" };
const SERVICES: Crumb = { name: "Services", path: "/services" };
const PRODUCTS: Crumb = { name: "Products", path: "/products" };

const servicePages: PageMeta[] = serviceCatalog.map((service) => ({
  path: `/services/${service.slug}`,
  title: `${service.title} | ACCREVIA Technologies`,
  description: service.metaDescription,
  indexable: true,
  schema: "service",
  serviceSlug: service.slug,
  breadcrumb: [HOME, SERVICES, { name: service.title, path: `/services/${service.slug}` }],
}));

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "ACCREVIA Technologies | Software, SaaS & AI Solutions",
    description:
      "ACCREVIA Technologies is a software company building SaaS products, web apps, APIs, AI automation and cloud solutions, including the FarmStay platform.",
    indexable: true,
  },
  {
    path: "/about",
    title: "About ACCREVIA Technologies | Software Engineering Company",
    description:
      "ACCREVIA Technologies is a newly established software company focused on SaaS products, web applications, scalable backends, cloud and AI-enabled solutions.",
    indexable: true,
    breadcrumb: [HOME, { name: "About", path: "/about" }],
  },
  {
    path: "/services",
    title: "Software Development Services | ACCREVIA Technologies",
    description:
      "Custom software, web applications, SaaS product development, AI and automation, API and backend development, cloud and DevOps, and software modernization from ACCREVIA.",
    indexable: true,
    breadcrumb: [HOME, SERVICES],
  },
  ...servicePages,
  {
    path: "/products",
    title: "SaaS Products | ACCREVIA Technologies",
    description:
      "Software products built by ACCREVIA Technologies. Meet FarmStay, our multi-tenant SaaS platform for farmhouse management, and see how we build products.",
    indexable: true,
    breadcrumb: [HOME, PRODUCTS],
  },
  {
    path: "/products/farmstay",
    title: "FarmStay | Farmhouse Management SaaS | ACCREVIA Technologies",
    description:
      "FarmStay is a multi-tenant SaaS platform for farmhouse management: bookings, customers, staff, role-based access, accounts, reporting and notifications in one place.",
    indexable: true,
    schema: "software",
    breadcrumb: [HOME, PRODUCTS, { name: "FarmStay", path: "/products/farmstay" }],
  },
  {
    path: "/technologies",
    title: "Technologies & Capabilities | ACCREVIA Technologies",
    description:
      "Angular, React, TypeScript, ASP.NET Core, Node.js, SQL Server, MongoDB, AWS, Azure, Docker, Kubernetes, Terraform and AI/LLM integration used by ACCREVIA Technologies.",
    indexable: true,
    breadcrumb: [HOME, { name: "Technologies", path: "/technologies" }],
  },
  {
    path: "/contact",
    title: "Contact ACCREVIA Technologies | Email, Phone & WhatsApp",
    description:
      "Contact ACCREVIA Technologies by email, phone or WhatsApp to discuss software, SaaS, automation or cloud work. Based in Kolhapur, Maharashtra, India.",
    indexable: true,
    breadcrumb: [HOME, { name: "Contact", path: "/contact" }],
  },
  {
    path: "/start-project",
    title: "Start Your Project | ACCREVIA Technologies",
    description:
      "Tell ACCREVIA Technologies what you want to build. Share your project type, goals, timeline and budget range and we will reply by your preferred contact method.",
    indexable: true,
    breadcrumb: [HOME, { name: "Start Your Project", path: "/start-project" }],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | ACCREVIA Technologies",
    description: "How ACCREVIA Technologies handles information you share when you use this website, submit a form or contact us.",
    indexable: true,
    breadcrumb: [HOME, { name: "Privacy Policy", path: "/privacy" }],
  },
  {
    path: "/terms",
    title: "Terms & Conditions | ACCREVIA Technologies",
    description: "The terms that apply when you use the ACCREVIA Technologies website and enquire about our services.",
    indexable: true,
    breadcrumb: [HOME, { name: "Terms & Conditions", path: "/terms" }],
  },
  {
    path: "/thank-you",
    title: "Thank You | ACCREVIA Technologies",
    description: "Your enquiry has been received by ACCREVIA Technologies.",
    indexable: false,
    noindex: true,
  },
];

export const notFoundMeta: PageMeta = {
  path: "/404",
  title: "Page Not Found | ACCREVIA Technologies",
  description: "The page you are looking for does not exist.",
  indexable: false,
  noindex: true,
};

/** Old URLs that now live elsewhere. Emitted as 301 redirects on Netlify. */
export const legacyRedirects: Array<{ from: string; to: string }> = [
  { from: "/privacy-policy", to: "/privacy" },
  { from: "/terms-and-conditions", to: "/terms" },
];

export function getPageMeta(path: string): PageMeta {
  const meta = pages.find((page) => page.path === path);
  if (!meta) throw new Error(`No page metadata configured for ${path}`);
  return meta;
}
