/**
 * Form definitions shared by the React forms and the build-time plugin that writes the hidden
 * Netlify Forms detection markup. Field names here must match the inputs rendered by the forms.
 */
export const HONEYPOT_FIELD = "bot-field";

export const formFields = {
  "start-project": [
    "fullName",
    "company",
    "email",
    "phone",
    "country",
    "city",
    "projectType",
    "timeline",
    "budget",
    "contactMethod",
    "description",
    "currentSystem",
    "existingTechnology",
    "launchDate",
    "keyFeatures",
    "consent",
  ],
  contact: ["name", "email", "topic", "message", "consent"],
} as const;

export type FormName = keyof typeof formFields;

export const projectTypes = [
  "Custom Software Development",
  "Web Application",
  "SaaS Product",
  "Mobile Application",
  "AI / Automation",
  "Cloud / DevOps",
  "API / Backend Development",
  "UI/UX / Frontend",
  "Existing System Modernization",
  "Other",
] as const;

export const timelines = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Not decided"] as const;

export const budgets = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000 – ₹10,00,000",
  "Above ₹10,00,000",
  "Not sure yet",
] as const;

export const contactMethods = ["Email", "Phone", "WhatsApp", "Meeting"] as const;
