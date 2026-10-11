import ProcessList from "../components/ProcessList";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { processSteps } from "../data/content";

export default function DevelopmentApproach() {
  return (
    <section className="section section--raised" aria-labelledby="approach-title">
      <div className="container">
        <SectionHeading
          id="approach-title"
          title="Our development approach"
          intro="Accrete what a product needs, build it carefully, then keep evolving it. Seven steps, repeated for every release."
        />
        <Reveal>
          <ProcessList steps={processSteps} />
        </Reveal>
      </div>
    </section>
  );
}
