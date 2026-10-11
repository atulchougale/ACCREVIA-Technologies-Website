import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { getPageMeta } from "../config/pages";
import { useSeo } from "../hooks/useSeo";
import CtaBand from "../sections/CtaBand";
import FeaturedProduct from "../sections/FeaturedProduct";

export default function Products() {
  const meta = getPageMeta("/products");
  useSeo(meta);

  return (
    <>
      <PageHero
        title="Products by ACCREVIA"
        intro="Alongside client work, ACCREVIA builds its own software products. Our first product is FarmStay."
        breadcrumb={meta.breadcrumb}
      />
      <FeaturedProduct />
      <Section tone="raised" labelledBy="how-title">
        <div className="split">
          <SectionHeading id="how-title" title="How we build products" />
          <Reveal className="split__body">
            <div className="prose">
              <p>
                Building our own product shapes how we work for clients too: multi-tenant design, role-based access, reporting and
                maintainable architecture are part of everyday practice, not afterthoughts.
              </p>
              <p>
                If you want a product of your own, see our{" "}
                <Link to="/services/saas-product-development">SaaS product development service</Link> or{" "}
                <Link to="/start-project?service=saas-product-development">start your project</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
      <CtaBand
        title="Interested in FarmStay or a product of your own?"
        text="Tell us about your business and what you need to manage or build."
      />
    </>
  );
}
