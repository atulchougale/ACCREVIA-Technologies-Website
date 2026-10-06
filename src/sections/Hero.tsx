import AccretionCanvas from "../components/AccretionCanvas";
import ButtonLink from "../components/Button";
import FarmStayAction from "../components/FarmStayAction";
import { siteConfig } from "../config/site";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__visual" aria-hidden="true">
        <AccretionCanvas className="hero__canvas" />
      </div>
      <div className="container hero__content">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__brand">ACCREVIA</span> <span className="hero__brand-suffix">Technologies</span>
        </h1>
        <p className="hero__tagline">{siteConfig.tagline}</p>
        <p className="hero__positioning">{siteConfig.positioning}</p>
        <p className="hero__support">{siteConfig.heroSupport}</p>
        <div className="action-row hero__actions">
          <ButtonLink to="/services">Explore Our Services</ButtonLink>
          <FarmStayAction />
        </div>
      </div>
    </section>
  );
}
