import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { getPageMeta } from "../config/pages";
import { siteConfig } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import { differentiators } from "../data/content";
import CtaBand from "../sections/CtaBand";

const focusAreas = [
  "Software engineering",
  "SaaS products",
  "Intelligent automation",
  "Cloud solutions",
  "Modern web applications",
  "Scalable backend systems",
  "AI-enabled solutions",
];

export default function About() {
  const meta = getPageMeta("/about");
  useSeo({ title: meta.title, description: meta.description, path: meta.path });

  return (
    <>
      <PageHero
        title="About ACCREVIA Technologies"
        intro="ACCREVIA is an emerging software technology company building software products, SaaS platforms and intelligent digital solutions."
      />

      <section className="section" aria-labelledby="who-title">
        <div className="container prose-layout">
          <SectionHeading id="who-title" title="Who we are" />
          <Reveal className="prose">
            <p>
              ACCREVIA Technologies is a newly established software company based in Kolhapur, Maharashtra, India. We design and build our
              own software products and develop custom solutions for businesses that need reliable, maintainable systems.
            </p>
            <p>
              Our first product is <strong>FarmStay</strong>, a multi-tenant SaaS platform that helps farmhouse businesses manage their
              operations in one place. Building a real product has shaped how we work: we care about architecture, security basics,
              maintainability and the people who use the software every day.
            </p>
            <p>
              We are at the start of our journey, and we would rather show you what we build than make claims about what we have achieved.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--raised" aria-labelledby="name-title">
        <div className="container prose-layout">
          <SectionHeading id="name-title" title="What the name means" />
          <Reveal className="prose">
            <p>
              ACCREVIA combines <em>accretion</em> and <em>evolution</em>. In astrophysics, accretion is the process by which matter is
              drawn together and grows into something larger. We apply the same idea to technology: bring ideas, data and capabilities
              together, then keep evolving them into useful digital products and solutions.
            </p>
            <p>
              That is why our tagline is <strong>{siteConfig.tagline}</strong> and why our identity is built around a singularity surrounded
              by an accretion disk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="focus-title">
        <div className="container">
          <SectionHeading id="focus-title" title="What we focus on" intro="The areas where we put our engineering effort." />
          <Reveal>
            <ul className="chip-list" aria-label="Focus areas">
              {focusAreas.map((area) => (
                <li key={area} className="chip">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--raised" aria-labelledby="principles-title">
        <div className="container">
          <SectionHeading id="principles-title" title="How we work" intro="Principles we apply to every project." />
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

      <CtaBand
        title="Let's talk about what you want to build"
        text="Whether it is a new product or an existing system that needs attention, we are happy to discuss it."
      />
    </>
  );
}
