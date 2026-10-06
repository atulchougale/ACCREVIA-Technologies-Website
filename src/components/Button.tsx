import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { isExternalUrl } from "../utils/links";

interface ButtonLinkProps {
  /** Internal route (React Router) or any absolute / mailto: / tel: URL. */
  to: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/** Link styled as a button. External https links open in a new tab with safe rel attributes. */
export default function ButtonLink({ to, variant = "primary", icon, children, className = "", ariaLabel }: ButtonLinkProps) {
  const classes = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (isExternalUrl(to)) {
    return (
      <a href={to} className={classes} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (/^(mailto|tel):/i.test(to)) {
    return (
      <a href={to} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
