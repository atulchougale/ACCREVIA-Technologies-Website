import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  intro: ReactNode;
  children?: ReactNode;
}

/** Header block for inner pages (About, Services, ...). Renders the page's single h1. */
export default function PageHero({ title, intro, children }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="container page-hero__inner">
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__intro">{intro}</p>
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </header>
  );
}
