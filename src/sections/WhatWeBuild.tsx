import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { buildAreas } from "../data/content";

export default function WhatWeBuild() {
  return (
    <section className="section" aria-labelledby="build-title">
      <div className="container">
        <SectionHeading
          id="build-title"
          title="What we build"
          intro="ACCREVIA brings technology, ideas and data together and keeps evolving them into useful digital products."
        />
        <Reveal>
          <ul className="build-list">
            {buildAreas.map((area) => (
              <li key={area.title} className="build-list__item">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
