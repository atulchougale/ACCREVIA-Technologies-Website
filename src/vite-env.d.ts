/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FARMSTAY_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

declare const __SITE_URL__: string;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
