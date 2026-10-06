/**
 * Per-page SEO metadata. Pure data (no imports) so the Vite build plugin can also read it
 * to generate per-route HTML, sitemap.xml and robots.txt.
 */
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Include in sitemap.xml */
  indexable: boolean;
}

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "ACCREVIA Technologies | Software, SaaS & AI Automation",
    description:
      "ACCREVIA Technologies is a software development company building SaaS products, web applications, APIs, AI automation and cloud solutions, including the FarmStay platform.",
    indexable: true,
  },
  {
    path: "/about",
    title: "About ACCREVIA Technologies | Software Engineering Company",
    description:
      "Learn about ACCREVIA Technologies, a newly established software company focused on SaaS products, modern web applications, scalable backends, cloud and AI-enabled solutions.",
    indexable: true,
  },
  {
    path: "/services",
    title: "Software Development Services | ACCREVIA Technologies",
    description:
      "Custom software, web applications, SaaS product development, AI and automation, API and backend development, cloud and DevOps, and software modernization from ACCREVIA.",
    indexable: true,
  },
  {
    path: "/products",
    title: "FarmStay SaaS Platform | ACCREVIA Technologies Products",
    description:
      "FarmStay is a multi-tenant SaaS platform for farmhouse management: bookings, customers, staff, role-based access, accounts, reporting and notifications.",
    indexable: true,
  },
  {
    path: "/technologies",
    title: "Technologies & Capabilities | ACCREVIA Technologies",
    description:
      "Angular, React, TypeScript, ASP.NET Core, Node.js, SQL Server, MongoDB, AWS, Azure, Docker, Kubernetes, Terraform and AI/LLM integration used by ACCREVIA Technologies.",
    indexable: true,
  },
  {
    path: "/contact",
    title: "Contact ACCREVIA Technologies | Start a Project",
    description:
      "Contact ACCREVIA Technologies by email, phone or WhatsApp to discuss custom software, SaaS development, automation or cloud projects. Based in Kolhapur, Maharashtra, India.",
    indexable: true,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | ACCREVIA Technologies",
    description: "How ACCREVIA Technologies handles information you share with us when you use this website or contact us.",
    indexable: true,
  },
  {
    path: "/terms-and-conditions",
    title: "Terms & Conditions | ACCREVIA Technologies",
    description: "The terms that apply when you use the ACCREVIA Technologies website and enquire about our services.",
    indexable: true,
  },
];

export const notFoundMeta = {
  title: "Page not found | ACCREVIA Technologies",
  description: "The page you are looking for does not exist.",
};

export function getPageMeta(path: string): PageMeta {
  const meta = pages.find((page) => page.path === path);
  if (!meta) throw new Error(`No page metadata configured for ${path}`);
  return meta;
}
