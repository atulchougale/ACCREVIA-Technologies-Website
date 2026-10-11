import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ButtonLink from "../components/Button";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { getPageMeta } from "../config/pages";
import { services } from "../data/services";
import { faqs } from "../data/faq";
import { useSeo } from "../hooks/useSeo";
import CtaBand from "../sections/CtaBand";
import DevelopmentApproach from "../sections/DevelopmentApproach";
import FaqSection from "../sections/FaqSection";

export default function Services() {
  const meta = getPageMeta("/services");
  useSeo(meta);

  return (
    <>
      <PageHero
        title="Software development services"
        intro="Eight areas where ACCREVIA can design, build and maintain software for your business."
        breadcrumb={meta.breadcrumb}
      >
        <ButtonLink to="/start-project">Start your project</ButtonLink>
      </PageHero>

      <Section tone="base" labelledBy="services-list-title">
        <SectionHeading
          id="services-list-title"
          title="What we do"
          intro="Choose a service to see what is included, the technologies we use and how a project runs."
        />
        <Reveal>
          <ul className="service-cards">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.slug} className="service-card">
                  <span className="service-row__icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <h3>
                    <Link to={`/services/${service.slug}`}>{service.title}</Link>
                  </h3>
                  <p>{service.summary}</p>
                  <ul className="check-list">
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.slug}`} className="text-link">
                    Explore {service.title} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Section>

      <DevelopmentApproach />
      <FaqSection items={faqs.slice(0, 6)} />
      <CtaBand />
    </>
  );
}
