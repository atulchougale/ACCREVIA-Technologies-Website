import { useSyncExternalStore } from "react";
import { siteConfig } from "../config/site";

/**
 * Consent-aware Google Analytics 4.
 * - Fully disabled (no script, no storage, no banner) unless VITE_GA_MEASUREMENT_ID is a valid "G-..." ID.
 * - The Google script is only loaded after the visitor accepts. Nothing is sent before that.
 * - The choice is stored in localStorage (not a cookie) under CONSENT_KEY.
 */
export type ConsentState = "granted" | "denied" | "unset";

const CONSENT_KEY = "accrevia-analytics-consent";
const measurementId = siteConfig.gaMeasurementId;

export const analyticsEnabled = /^G-[A-Z0-9]{4,}$/.test(measurementId);

type GtagFn = (...args: unknown[]) => void;
interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: GtagFn;
  [key: `ga-disable-${string}`]: boolean | undefined;
}

const analyticsWindow = () => window as unknown as AnalyticsWindow;

const listeners = new Set<() => void>();
let loaded = false;

function readStoredConsent(): ConsentState {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

let consent: ConsentState = typeof window === "undefined" ? "unset" : readStoredConsent();

function loadGoogleAnalytics() {
  if (!analyticsEnabled || loaded || typeof document === "undefined") return;
  loaded = true;
  const w = analyticsWindow();
  w[`ga-disable-${measurementId}`] = false;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  // Analytics storage only; advertising signals stay denied.
  w.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  w.gtag("js", new Date());
  w.gtag("config", measurementId, { send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function setConsent(next: ConsentState) {
  if (!analyticsEnabled) return;
  consent = next;
  try {
    if (next === "unset") window.localStorage.removeItem(CONSENT_KEY);
    else window.localStorage.setItem(CONSENT_KEY, next);
  } catch {
    /* storage unavailable: the choice only lasts for this page view */
  }
  if (next === "granted") loadGoogleAnalytics();
  if (next !== "granted") analyticsWindow()[`ga-disable-${measurementId}`] = true;
  emit();
}

/** Call once at start-up: restores a previously granted choice. */
export function initAnalytics() {
  if (analyticsEnabled && consent === "granted") loadGoogleAnalytics();
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => consent,
    () => "unset" as ConsentState,
  );
}

export function trackPageView(path: string, title: string) {
  if (!analyticsEnabled || consent !== "granted") return;
  analyticsWindow().gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!analyticsEnabled || consent !== "granted") return;
  analyticsWindow().gtag?.("event", name, params);
}
