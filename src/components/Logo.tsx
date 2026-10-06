import { Link } from "react-router-dom";
import logoMark from "../assets/branding/logo-mark.svg";
import { siteConfig } from "../config/site";

interface LogoProps {
  /** "full" shows mark + wordmark, "mark" shows only the symbol. */
  variant?: "full" | "mark";
  size?: number;
  className?: string;
  /** Render as a plain element (no link), e.g. inside the hero. */
  asLink?: boolean;
}

/**
 * Reusable ACCREVIA logo. To use the final artwork, replace
 * src/assets/branding/logo-mark.svg (keep the file name) - no code changes needed.
 */
export default function Logo({ variant = "full", size = 36, className = "", asLink = true }: LogoProps) {
  const content = (
    <>
      <img src={logoMark} width={size} height={size} alt="" className="logo__mark" decoding="async" />
      {variant === "full" && (
        <span className="logo__text">
          <span className="logo__name">{siteConfig.shortName}</span>
          <span className="logo__suffix">Technologies</span>
        </span>
      )}
    </>
  );

  if (!asLink) return <span className={`logo ${className}`}>{content}</span>;

  return (
    <Link to="/" className={`logo ${className}`} aria-label={`${siteConfig.name} - home`}>
      {content}
    </Link>
  );
}
