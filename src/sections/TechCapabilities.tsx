import ButtonLink from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { featuredTechnologies } from "../data/technologies";

export default function TechCapabilities() {
  return (
    <section className="section section--raised section--grid" aria-labelledby="tech-title">
      <div className="container">
        <SectionHeading
          id="tech-title"
          title="Technology capabilities"
          intro="We choose tools for the problem in front of us. These are the technologies we work with most."
        />
        <Reveal>
          <ul className="chip-list" aria-label="Technologies">
            {featuredTechnologies.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          <div className="section__footer">
            <ButtonLink to="/technologies" variant="secondary">
              See all technologies
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
