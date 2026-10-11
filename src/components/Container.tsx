import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** The single inner content container (max-width + responsive side padding). Use it inside every full-width section. */
export default function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return <Tag className={`container ${className}`.trim()}>{children}</Tag>;
}
