import { useRef } from "react";
import { brandAssets } from "../assets/branding";
import AccretionCanvas from "../components/AccretionCanvas";
import ButtonLink from "../components/Button";
import FarmStayAction from "../components/FarmStayAction";
import { siteConfig } from "../config/site";

/**
 * Hero: the official full logo emerges from a slow, warm accretion environment.
 * The logo image is the page's h1 (its alt text is the company name) and is placed first in the DOM so it stacks on top on mobile.
 */
export default function Hero() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const { src, srcSet, width, height, ringCenterY } = brandAssets.fullDark;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__stage">
          <AccretionCanvas anchorRef={logoRef} anchorCenterY={ringCenterY} className="hero__canvas" />
          <h1 id="hero-title" ref={logoRef} className="hero__logo">
            <img
              src={src}
              srcSet={srcSet}
              sizes="(min-width: 960px) 520px, 80vw"
              width={width}
              height={height}
              alt={siteConfig.name}
              fetchPriority="high"
              decoding="async"
            />
          </h1>
        </div>

        <div className="hero__copy">
          <p className="hero__tagline">{siteConfig.tagline}</p>
          <p className="hero__positioning">{siteConfig.positioning}</p>
          <p className="hero__support">{siteConfig.heroSupport}</p>
          <div className="action-row hero__actions">
            <ButtonLink to="/services">Explore Our Services</ButtonLink>
            <FarmStayAction />
          </div>
        </div>
      </div>
    </section>
  );
}
