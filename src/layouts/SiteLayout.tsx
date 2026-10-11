import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ConsentBanner from "../components/ConsentBanner";
import { trackPageView, useConsent } from "../utils/analytics";
import Header from "./Header";
import Footer from "./Footer";

/** Shared page frame: skip link, header, routed content and footer. Resets scroll and focus on navigation. */
export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const consent = useConsent();

  useEffect(() => {
    if (consent === "granted") trackPageView(pathname, document.title);
  }, [pathname, consent]);

  useEffect(() => {
    if (hash) {
      // Deep link to a section (e.g. /services#ai-automation): retry briefly while the lazy page renders.
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      let timer = 0;
      const tryScroll = () => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ block: "start" });
        else if (attempts++ < 40) timer = window.setTimeout(tryScroll, 50);
      };
      tryScroll();
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ConsentBanner />
    </>
  );
}
