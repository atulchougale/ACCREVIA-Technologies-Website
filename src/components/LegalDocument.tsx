import type { ReactNode } from "react";
import PageHero from "./PageHero";
import { siteConfig } from "../config/site";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalDocumentProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared layout for legal pages. Edit the `sections` arrays in the page files to change the text. */
export default function LegalDocument({ title, intro, sections }: LegalDocumentProps) {
  return (
    <>
      <PageHero title={title} intro={intro} />
      <div className="container legal">
        <p className="muted-note">Last updated: {siteConfig.legalLastUpdated}</p>
        {sections.map((section) => (
          <section key={section.id} className="legal__section" aria-labelledby={`legal-${section.id}`}>
            <h2 id={`legal-${section.id}`}>{section.title}</h2>
            <div className="prose">{section.content}</div>
          </section>
        ))}
      </div>
    </>
  );
}
