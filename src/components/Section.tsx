import type { ReactNode } from "react";
import Container from "./Container";

export type SectionTone = "base" | "raised" | "grid" | "ambient";

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  /** id of the heading that labels this section (accessible name). */
  labelledBy?: string;
  className?: string;
  /** Smaller vertical spacing for compact bands. */
  compact?: boolean;
}

/**
 * Full-width page section: the background spans the viewport, the content sits in the shared Container.
 * Pages are built from a stack of these instead of one big wrapper.
 */
export default function Section({ children, tone = "base", id, labelledBy, className = "", compact = false }: SectionProps) {
  const toneClass =
    tone === "base" ? "" : tone === "raised" ? "section--raised" : tone === "grid" ? "section--raised section--grid" : "section--ambient";
  const classes = ["section", toneClass, compact ? "section--compact" : "", className].filter(Boolean).join(" ");
  return (
    <section id={id} className={classes} aria-labelledby={labelledBy}>
      <Container>{children}</Container>
    </section>
  );
}
