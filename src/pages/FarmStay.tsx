import { ExternalLink as ExternalIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ButtonLink from "../components/Button";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { getPageMeta } from "../config/pages";
import { mailtoLink, siteConfig } from "../config/site";
import { farmstay } from "../data/farmstay";
import { useSeo } from "../hooks/useSeo";
import CtaBand from "../sections/CtaBand";

export default function FarmStay() {
  const meta = getPageMeta("/products/farmstay");
  useSeo(meta);

  return (
    <>
      <PageHero title="FarmStay: farmhouse management SaaS" intro={farmstay.summary} breadcrumb={meta.breadcrumb}>
        {siteConfig.farmstayUrl ? (
          <ButtonLink to={siteConfig.farmstayUrl} icon={<ExternalIcon size={18} aria-hidden="true" />}>
            Open FarmStay
          </ButtonLink>
        ) : (
          <ButtonLink to={mailtoLink("FarmStay enquiry")}>Ask about FarmStay</ButtonLink>
        )}
        <ButtonLink to="/start-project" variant="secondary">
          Start your project
        </ButtonLink>
      </PageHero>

      <Section labelledBy="capabilities-title">
        <SectionHeading
          id="capabilities-title"
          title="What FarmStay covers"
          intro="One platform for the day-to-day running of a farmhouse business, with each business kept separate from the others."
        />
        <Reveal>
          <ul className="why-grid why-grid--wide">
            {farmstay.capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="why-grid__item">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Section>

      <Section tone="grid" labelledBy="foundation-title">
        <SectionHeading
          id="foundation-title"
          title="Technology foundation"
          intro="FarmStay is engineered for maintainability and growth."
        />
        <Reveal>
          <ul className="chip-list" aria-label="FarmStay technology">
            {farmstay.stack.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
          <p className="muted-note">
            FarmStay is an example of our <Link to="/services/saas-product-development">SaaS product development</Link> work.
          </p>
        </Reveal>
      </Section>

      <Section labelledBy="availability-title">
        <div className="split">
          <SectionHeading id="availability-title" title="Availability" />
          <Reveal className="split__body">
            <div className="prose">
              {siteConfig.farmstayUrl ? (
                <p>FarmStay is available online. Use the button at the top of this page to open it.</p>
              ) : (
                <p>
                  FarmStay does not have a public product link yet. When it does, it will appear on this page. If you run a farmhouse
                  business and would like to know more, <Link to="/contact">contact ACCREVIA Technologies</Link> and we will share what we
                  can.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Interested in FarmStay?" text="Tell us about your farmhouse business and what you need to manage." />
    </>
  );
}
