import ButtonLink from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ServiceRow from "../components/ServiceRow";
import { services } from "../data/services";

export default function ServicesOverview() {
  return (
    <section className="section section--raised" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          title="Software services for products, platforms and processes"
          intro="From a first working version to long-term maintenance, we cover the full engineering path."
        />
        <Reveal>
          <ul className="service-grid">
            {services.map((service) => (
              <ServiceRow key={service.slug} service={service} />
            ))}
          </ul>
          <div className="section__footer">
            <ButtonLink to="/services" variant="secondary">
              Explore our software development services
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
