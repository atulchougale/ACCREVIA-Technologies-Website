import ButtonLink from "../components/Button";
import Reveal from "../components/Reveal";

interface CtaBandProps {
  title?: string;
  text?: string;
}

export default function CtaBand({
  title = "Have a product, process or system in mind?",
  text = "Tell us what you want to build or improve. We will reply with practical next steps.",
}: CtaBandProps) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta-band">
          <h2 id="cta-title" className="cta-band__title">
            {title}
          </h2>
          <p className="cta-band__text">{text}</p>
          <div className="action-row">
            <ButtonLink to="/contact">Start a conversation</ButtonLink>
            <ButtonLink to="/services" variant="secondary">
              Explore services
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
