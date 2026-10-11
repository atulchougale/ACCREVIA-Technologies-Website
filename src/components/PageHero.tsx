import type { ReactNode } from "react";
import type { Crumb } from "../config/pages";
import Breadcrumbs from "./Breadcrumbs";

interface PageHeroProps {
  title: string;
  intro: ReactNode;
  breadcrumb?: Crumb[];
  children?: ReactNode;
}

/** Full-width header block for inner pages: optional breadcrumb band, then the page's single h1. */
export default function PageHero({ title, intro, breadcrumb, children }: PageHeroProps) {
  return (
    <>
      {breadcrumb && breadcrumb.length > 1 && <Breadcrumbs items={breadcrumb} />}
      <header className="page-hero">
        <div className="container page-hero__inner">
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__intro">{intro}</p>
          {children && <div className="page-hero__actions">{children}</div>}
        </div>
      </header>
    </>
  );
}
