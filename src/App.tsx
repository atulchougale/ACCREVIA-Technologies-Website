import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Products = lazy(() => import("./pages/Products"));
const FarmStay = lazy(() => import("./pages/FarmStay"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Contact = lazy(() => import("./pages/Contact"));
const StartProject = lazy(() => import("./pages/StartProject"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Route table. Every indexable route must also be listed in src/config/pages.ts: that file drives page titles,
 * descriptions, canonical URLs, the sitemap, the static per-route HTML and the Netlify redirects.
 * To add a page: create it in src/pages, add a <Route> here, add its metadata in src/config/pages.ts and a link in src/config/navigation.ts.
 */
export default function App() {
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page" />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="products/farmstay" element={<FarmStay />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="contact" element={<Contact />} />
          <Route path="start-project" element={<StartProject />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          {/* Old URLs: Netlify answers these with a 301 (see _redirects); this keeps them working in dev too. */}
          <Route path="privacy-policy" element={<Navigate to="/privacy" replace />} />
          <Route path="terms-and-conditions" element={<Navigate to="/terms" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
