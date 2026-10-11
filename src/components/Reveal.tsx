import type { ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** Subtle one-time reveal as content scrolls into view. Disabled by prefers-reduced-motion in CSS. */
export default function Reveal({ children, as: Tag = "div", className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${inView ? "is-visible" : ""} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
