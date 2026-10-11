/**
 * Central company / site configuration.
 * Edit this file to change company details everywhere on the website.
 * Never put secrets (tokens, API keys, bank or ID numbers) in this file.
 */

import { company } from "./company";

const env = import.meta.env;

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const siteConfig = {
  ...company,
  /** Public site URL (production domain by default, see vite.config.ts). */
  url: stripTrailingSlash(__SITE_URL__),
  locale: "en_IN",
  /** Public URL of the FarmStay product. Empty until the product has a live URL (VITE_FARMSTAY_URL). */
  farmstayUrl: (env.VITE_FARMSTAY_URL ?? "").trim(),
  /** GA4 Measurement ID (G-XXXXXXXXXX). Empty = analytics fully disabled and no consent banner is shown. */
  gaMeasurementId: (env.VITE_GA_MEASUREMENT_ID ?? "").trim(),
  legalLastUpdated: "October 2026",
} as const;

export const whatsappLink = (message: string = siteConfig.contact.whatsappMessage) =>
  `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject = "Enquiry for ACCREVIA Technologies") =>
  `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`;
