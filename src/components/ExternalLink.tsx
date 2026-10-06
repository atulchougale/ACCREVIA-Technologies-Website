import type { AnchorHTMLAttributes } from "react";

/** Anchor for links leaving the site: opens in a new tab with noopener/noreferrer. */
export default function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
