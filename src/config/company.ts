/**
 * Pure company constants (no Vite/React imports) so both the app and the build-time SEO plugin can use them.
 * Never put secrets (tokens, API keys, bank or ID numbers) in this file.
 */
export const company = {
  name: "ACCREVIA Technologies",
  shortName: "ACCREVIA",
  tagline: "ACCRETE. EVOLVE. CREATE.",
  positioning: "Building Software, SaaS & Intelligent Digital Solutions",
  heroSupport:
    "We design and build reliable software products, SaaS platforms, intelligent automation solutions and modern digital systems that help businesses evolve.",
  description:
    "ACCREVIA Technologies is a software development company building SaaS products, web applications, APIs, AI automation and cloud solutions. Creators of FarmStay.",
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
} as const;
