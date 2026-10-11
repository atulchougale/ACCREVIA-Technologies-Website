import { Link } from "react-router-dom";
import { brandAssets } from "../assets/branding";
import { siteConfig } from "../config/site";

interface LogoProps {
  className?: string;
  /** Render as a plain image (no link), e.g. when the surrounding element is already a link. */
  asLink?: boolean;
}

/**
 * Official ACCREVIA horizontal lockup (header / footer). The artwork is an image asset and is only ever
 * scaled via CSS height - never redrawn or recoloured. See src/assets/branding.
 */
export default function Logo({ className = "", asLink = true }: LogoProps) {
  const { src, width, height } = brandAssets.horizontal;
  const image = <img src={src} width={width} height={height} alt={siteConfig.name} className="logo__image" decoding="async" />;

  if (!asLink) return <span className={`logo ${className}`}>{image}</span>;

  return (
    <Link to="/" className={`logo ${className}`} aria-label={`${siteConfig.name} - home`}>
      {image}
    </Link>
  );
}
