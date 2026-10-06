import { ArrowRight } from "lucide-react";
import ButtonLink from "../components/Button";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { getPageMeta } from "../config/pages";
import { mailtoLink } from "../config/site";
import { services } from "../data/services";
import { useSeo } from "../hooks/useSeo";
import CtaBand from "../sections/CtaBand";

export default function Services() {
  const meta = getPageMeta("/services");
  useSeo({ title: meta.title, description: meta.description, path: meta.path });

  return (
    <>
      <PageHero
        title="Software development services"
        intro="Eight areas where ACCREVIA can design, build and maintain software for your business."
      />

      <div className="container service-sections">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.id} as="section" className="service-section">
              <div className="service-section__head" id={service.id}>
                <span className="service-row__icon" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <h2>{service.title}</h2>
              </div>
              <div className="service-section__body">
                <p>{service.summary}</p>
                <ul className="check-list">
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <ButtonLink
                  to={mailtoLink(`Enquiry: ${service.title}`)}
                  variant="secondary"
                  icon={<ArrowRight size={18} aria-hidden="true" />}
                  ariaLabel={`${service.ctaLabel} (opens email)`}
                >
                  {service.ctaLabel}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </div>

      <CtaBand />
    </>
  );
}
