import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { getPageMeta } from "../config/pages";
import { technologyGroups } from "../data/technologies";
import { useSeo } from "../hooks/useSeo";
import CtaBand from "../sections/CtaBand";

export default function Technologies() {
  const meta = getPageMeta("/technologies");
  useSeo(meta);

  return (
    <>
      <PageHero
        title="Technologies and capabilities"
        intro="The languages, frameworks, platforms and practices we use to build and run software."
      />

      <div className="section--grid">
        <div className="container tech-groups">
          {technologyGroups.map((group) => (
            <Reveal key={group.id} as="section" className="tech-group">
              <div>
                <h2 className="tech-group__title">{group.title}</h2>
                <p className="tech-group__text">{group.description}</p>
              </div>
              <ul className="chip-list" aria-label={group.title}>
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <p className="muted-note">
            These are technologies and capabilities we work with. Listing a technology does not imply certification, partnership or
            endorsement by its vendor or maintainers.
          </p>
        </div>
      </div>

      <CtaBand
        title="Not sure which technology fits?"
        text="Describe the problem and we will recommend an approach that suits your team and budget."
      />
    </>
  );
}
