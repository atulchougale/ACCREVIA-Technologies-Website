/**
 * Central company / site configuration.
 * Edit this file to change company details everywhere on the website.
 * Never put secrets (tokens, API keys, bank or ID numbers) in this file.
 */

const env = import.meta.env;

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const siteConfig = {
  name: "ACCREVIA Technologies",
  shortName: "ACCREVIA",
  tagline: "ACCRETE. EVOLVE. CREATE.",
  positioning: "Building Software, SaaS & Intelligent Digital Solutions",
  heroSupport:
    "We design and build reliable software products, SaaS platforms, intelligent automation solutions and modern digital systems that help businesses evolve.",
  description:
    "ACCREVIA Technologies is a software development company building SaaS products, web applications, APIs, AI automation and cloud solutions. Creators of FarmStay.",
  /** Public site URL. Empty until a domain / Netlify URL is configured via VITE_SITE_URL. */
  url: stripTrailingSlash(__SITE_URL__),
  locale: "en_IN",
  contact: {
    email: "atul7chougale@gmail.com",
    primaryPhone: { display: "+91 83080 38343", tel: "+918308038343" },
    secondaryPhone: { display: "+91 93598 46710", tel: "+919359846710" },
    /** WhatsApp number in international format, digits only (used for wa.me links). */
    whatsappNumber: "918308038343",
    whatsappDisplay: "+91 83080 38343",
    whatsappMessage: "Hello ACCREVIA Technologies, I would like to know more about your services.",
    address: {
      lines: ["Chougale Galli, Bhacharwadi, Kotoli", "Kolhapur, Maharashtra - 416230", "India"],
      oneLine: "Chougale Galli, Bhacharwadi, Kotoli, Kolhapur, Maharashtra - 416230, India",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/in/atulchougale07",
    github: "https://github.com/atulchougale",
  },
  /** Public URL of the FarmStay product. Empty until the product has a live URL (VITE_FARMSTAY_URL). */
  farmstayUrl: (env.VITE_FARMSTAY_URL ?? "").trim(),
  legalLastUpdated: "October 2026",
} as const;

export const whatsappLink = (message: string = siteConfig.contact.whatsappMessage) =>
  `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject = "Enquiry for ACCREVIA Technologies") =>
  `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`;
