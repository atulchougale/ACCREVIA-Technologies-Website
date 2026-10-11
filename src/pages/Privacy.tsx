import { Link } from "react-router-dom";
import LegalDocument, { type LegalSection } from "../components/LegalDocument";
import { getPageMeta } from "../config/pages";
import { siteConfig } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import { analyticsEnabled } from "../utils/analytics";

const { contact, name } = siteConfig;

/**
 * Written from an inspection of what the site actually does: static site on Netlify, two forms submitted through
 * Netlify Forms (with a honeypot field), optional consent-gated Google Analytics 4 (only when a Measurement ID is configured),
 * no CAPTCHA, no embedded third-party widgets, no advertising, self-hosted fonts.
 * Review this text with the business / legal requirements before relying on it.
 */
const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <p>
        This policy explains what information {name} handles in connection with this website. The website is a static informational site. It
        has no user accounts, no payments and no advertising.
      </p>
    ),
  },
  {
    id: "forms",
    title: "Information you submit through our forms",
    content: (
      <>
        <p>
          The <Link to="/start-project">Start Your Project</Link> and <Link to="/contact">Contact</Link> forms collect the details you type
          in: for example your name, email address, company, phone number, country, city, project description, timeline, budget range and
          preferred contact method. Optional fields are only sent if you fill them in.
        </p>
        <p>
          Form submissions are sent to Netlify Forms, a service provided by our hosting provider. They are stored there, can be viewed by
          ACCREVIA, and may be forwarded to ACCREVIA by email notification. The form service also uses spam filtering, which may process the
          content of a submission. Forms include a hidden honeypot field to detect automated spam; it is not used to identify you.
        </p>
        <p>We use this information only to reply to your enquiry and discuss possible work with you.</p>
      </>
    ),
  },
  {
    id: "direct-contact",
    title: "Contacting us directly",
    content: (
      <p>
        If you email, call or message us on WhatsApp, we receive the information you provide, such as your name, contact details and
        message. These services have their own privacy practices.
      </p>
    ),
  },
  {
    id: "analytics",
    title: "Analytics and cookies",
    content: analyticsEnabled ? (
      <>
        <p>
          This website can use Google Analytics 4 to understand how it is used (for example which pages are viewed). Analytics is optional:
          nothing is loaded or sent to Google unless you choose <em>Accept analytics</em> in the consent banner. You can change your choice
          at any time using &ldquo;Analytics preferences&rdquo; in the footer.
        </p>
        <p>
          If you accept, Google may set its own cookies and receives data such as pages viewed, approximate location and device information.
          Advertising signals are kept off. Your choice is stored in your browser&rsquo;s local storage on your device.
        </p>
        <p>The website itself does not set any other cookies.</p>
      </>
    ) : (
      <p>
        This website does not currently use analytics, advertising or tracking cookies, and does not set cookies of its own. If we add
        analytics in future we will ask for your consent first and update this policy.
      </p>
    ),
  },
  {
    id: "browser-storage",
    title: "Browser storage",
    content: (
      <p>
        After you send a form, a short note containing only the form name (not your details) is kept in your browser&rsquo;s session storage
        so the thank-you page can confirm your submission. It is cleared when you close the tab.
      </p>
    ),
  },
  {
    id: "hosting",
    title: "Hosting and technical data",
    content: (
      <p>
        The website is delivered by a third-party hosting provider. Like most hosting services, it may process standard technical data such
        as IP addresses and request logs to deliver and secure the service. Fonts and images are served from the website itself.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External links",
    content: (
      <p>
        This website links to external services such as LinkedIn, GitHub and WhatsApp. They have their own privacy practices and we are not
        responsible for them.
      </p>
    ),
  },
  {
    id: "retention-rights",
    title: "Retention and your choices",
    content: (
      <p>
        We keep enquiries for as long as needed to respond to you and manage any resulting work. You can ask us to correct or delete your
        correspondence by emailing <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    ),
  },
  {
    id: "review",
    title: "About this policy",
    content: (
      <p>
        This is a plain-language summary of how this website works today, written for a small software company. It is general information,
        has not been reviewed by legal counsel, and should be checked against the legal requirements that apply to the business. We will
        update it when the website changes, for example when new tools are added.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about this policy can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a> or posted to{" "}
        {contact.address.oneLine}.
      </p>
    ),
  },
];

export default function Privacy() {
  const meta = getPageMeta("/privacy");
  useSeo(meta);
  return (
    <LegalDocument
      title="Privacy Policy"
      intro={`How ${name} handles information related to this website.`}
      sections={sections}
      breadcrumb={meta.breadcrumb}
    />
  );
}
