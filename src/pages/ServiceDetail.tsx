import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ButtonLink from "../components/Button";
import Breadcrumbs from "../components/Breadcrumbs";
import ProcessList from "../components/ProcessList";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { getPageMeta } from "../config/pages";
import { servicePhases } from "../data/serviceCatalog";
import { getService, services, type Service } from "../data/services";
import { useSeo } from "../hooks/useSeo";
import CtaBand from "../sections/CtaBand";
import NotFound from "./NotFound";

function ServiceDetailView({ service }: { service: Service }) {
  const meta = getPageMeta(`/services/${service.slug}`);
  useSeo(meta);
  const Icon = service.icon;
  const startTo = `/start-project?service=${service.slug}`;
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs items={meta.breadcrumb ?? []} />

      <header className="service-hero">
        <div className="container service-hero__inner">
          <div className="service-hero__copy">
            <p className="service-hero__category">
              <Icon size={18} aria-hidden="true" /> Software development service
            </p>
            <h1 className="service-hero__title">{service.title}</h1>
            <p className="service-hero__summary">{service.summary}</p>
            <div className="action-row">
              <ButtonLink to={startTo}>Start your project</ButtonLink>
              <ButtonLink to="/contact" variant="secondary">
                Contact ACCREVIA Technologies
              </ButtonLink>
            </div>
          </div>
          <div className="service-hero__orb" aria-hidden="true" />
        </div>
      </header>

      <Section labelledBy="overview-title">
        <div className="split">
          <SectionHeading id="overview-title" title={`What is ${service.title}?`} />
          <Reveal className="split__body">
            <div className="prose">
              {service.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="callout" aria-label="Who this service is for">
              <h3>Who it is for</h3>
              <p>{service.audience}</p>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised" labelledBy="capabilities-title">
        <SectionHeading
          id="capabilities-title"
          title="What we can build and deliver"
          intro={`Typical areas covered in ${service.title} projects.`}
        />
        <Reveal>
          <ul className="card-grid">
            {service.capabilities.map((item) => (
              <li key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section labelledBy="process-title">
        <SectionHeading
          id="process-title"
          title="How a project runs"
          intro="Seven phases, from the first conversation to long-term support."
        />
        <Reveal>
          <ProcessList steps={servicePhases} />
        </Reveal>
      </Section>

      <Section tone="grid" labelledBy="technology-title">
        <SectionHeading
          id="technology-title"
          title="Technologies we use"
          intro="Tools we work with for this kind of project. They are working tools, not vendor certifications."
        />
        <Reveal>
          <ul className="chip-list" aria-label={`Technologies for ${service.title}`}>
            {service.technologies.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          <p className="muted-note">
            See all <Link to="/technologies">technologies and capabilities</Link>.
          </p>
        </Reveal>
      </Section>

      <Section labelledBy="benefits-title">
        <SectionHeading id="benefits-title" title="What you gain" />
        <Reveal>
          <ul className="why-grid why-grid--three">
            {service.benefits.map((benefit) => (
              <li key={benefit.title} className="why-grid__item">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="raised" labelledBy="related-title">
        <SectionHeading id="related-title" title="Related services" />
        <Reveal>
          <ul className="related-list">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={`/services/${item.slug}`} className="related-link">
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.summary}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="section__footer">
            <ButtonLink to="/services" variant="secondary">
              Explore our software development services
            </ButtonLink>
            <ButtonLink to="/products/farmstay" variant="ghost">
              Explore FarmStay
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title={`Ready to start with ${service.title}?`}
        text="Share your goals and timeline and we will reply with practical next steps."
        startTo={startTo}
      />
    </>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug ?? "");
  return service ? <ServiceDetailView service={service} /> : <NotFound />;
}
