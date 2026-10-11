import { Mail, MessageCircle } from "lucide-react";
import ExternalLink from "../components/ExternalLink";
import Breadcrumbs from "../components/Breadcrumbs";
import StartProjectForm from "../components/StartProjectForm";
import Section from "../components/Section";
import { getPageMeta } from "../config/pages";
import { siteConfig, whatsappLink } from "../config/site";
import { faqs } from "../data/faq";
import { useSeo } from "../hooks/useSeo";
import FaqSection from "../sections/FaqSection";

const steps = [
  { title: "You share the brief", description: "Tell us what you want to build, who will use it and the outcome that matters." },
  { title: "We review it", description: "We read your enquiry and consider scope, approach and the right technology." },
  { title: "We reply", description: "We get back to you by your preferred contact method with practical next steps." },
];

/**
 * Dedicated project intake page (replaces a modal). Indexable on purpose: it is a public lead-generation landing page
 * that people may search for, and it contains no personal data. Only /thank-you is noindex.
 */
export default function StartProject() {
  const meta = getPageMeta("/start-project");
  useSeo(meta);

  return (
    <>
      <Breadcrumbs items={meta.breadcrumb ?? []} />
      <header className="start-hero">
        <div className="container">
          <h1 className="page-hero__title">Start your project</h1>
          <p className="page-hero__intro">
            Tell us about your business goal, users, project requirements and expected outcome. The more we know, the more useful our reply
            will be.
          </p>
        </div>
      </header>

      <Section tone="base" className="start-section" labelledBy="form-heading">
        <div className="start-layout">
          <aside className="start-aside" aria-label="What happens next">
            <h2 id="form-heading" className="start-aside__title">
              Tell ACCREVIA what you want to build
            </h2>
            <ol className="start-steps">
              {steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="start-aside__alt">
              <p>Prefer to talk first?</p>
              <ul>
                <li>
                  <Mail size={16} aria-hidden="true" /> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </li>
                <li>
                  <MessageCircle size={16} aria-hidden="true" />{" "}
                  <ExternalLink href={whatsappLink()}>WhatsApp {siteConfig.contact.whatsappDisplay}</ExternalLink>
                </li>
              </ul>
            </div>
          </aside>
          <div className="form-panel">
            <StartProjectForm />
          </div>
        </div>
      </Section>

      <FaqSection tone="raised" items={[faqs[7], faqs[0], faqs[4]]} />
    </>
  );
}
