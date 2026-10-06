import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  id?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Heading level to keep a correct document outline. */
  level?: 1 | 2;
}

export default function SectionHeading({ id, title, intro, align = "left", level = 2 }: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <Heading id={id} className="section-heading__title">
        {title}
      </Heading>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </Reveal>
  );
}
