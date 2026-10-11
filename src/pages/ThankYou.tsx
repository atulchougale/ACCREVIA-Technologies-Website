import { useEffect } from "react";
import ButtonLink from "../components/Button";
import PageHero from "../components/PageHero";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { getPageMeta } from "../config/pages";
import { useSeo } from "../hooks/useSeo";
import { trackEvent } from "../utils/analytics";
import { SUBMITTED_FLAG } from "../utils/submitForm";

/** Confirmation page (noindex, not in the sitemap). Records a conversion only right after a real submission. */
export default function ThankYou() {
  const meta = getPageMeta("/thank-you");
  useSeo(meta);

  useEffect(() => {
    try {
      const form = window.sessionStorage.getItem(SUBMITTED_FLAG);
      if (!form) return;
      window.sessionStorage.removeItem(SUBMITTED_FLAG);
      trackEvent("generate_lead", { form_name: form });
    } catch {
      /* sessionStorage unavailable: no conversion is recorded */
    }
  }, []);

  return (
    <>
      <PageHero title="Thank you, we have your enquiry" intro="Your message has been sent to ACCREVIA Technologies." />
      <Section labelledBy="next-title">
        <SectionHeading id="next-title" title="What happens next" />
        <ol className="start-steps start-steps--wide">
          <li>
            <h3>We review your enquiry</h3>
            <p>We read what you shared about your project, timeline and budget range.</p>
          </li>
          <li>
            <h3>We get back to you</h3>
            <p>We reply using the contact method you selected, with practical next steps.</p>
          </li>
        </ol>
        <p className="muted-note">If your enquiry is urgent, you can also email or WhatsApp us from the contact page.</p>
        <div className="action-row section__footer">
          <ButtonLink to="/">Back to home</ButtonLink>
          <ButtonLink to="/services" variant="secondary">
            Explore our software development services
          </ButtonLink>
          <ButtonLink to="/products/farmstay" variant="ghost">
            Explore FarmStay
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
