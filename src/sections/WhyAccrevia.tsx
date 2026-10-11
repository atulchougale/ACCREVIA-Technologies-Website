import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { differentiators } from "../data/content";

export default function WhyAccrevia() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading id="why-title" title="Why ACCREVIA" intro="How we approach every piece of software we build." />
        <Reveal>
          <ul className="why-grid">
            {differentiators.map((item) => {
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
      </div>
    </section>
  );
}
