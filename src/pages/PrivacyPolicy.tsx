import LegalDocument, { type LegalSection } from "../components/LegalDocument";
import { getPageMeta } from "../config/pages";
import { siteConfig } from "../config/site";
import { useSeo } from "../hooks/useSeo";

const { contact, name } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <p>
        This policy explains how {name} handles information in connection with this website. The website is currently a static informational
        site. It does not have user accounts, a database or a server-side contact form.
      </p>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information you provide voluntarily",
    content: (
      <>
        <p>
          We receive personal information only when you choose to contact us, for example by email, phone call or WhatsApp message. This may
          include your name, your contact details and whatever you tell us about your project.
        </p>
        <p>
          The enquiry form on the Contact page does not send anything to this website. It opens your own email application with a prepared
          message, which is then sent from your email account if you choose to send it.
        </p>
        <p>We use the information you send only to respond to your enquiry and to discuss potential work with you.</p>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    title: "Analytics and cookies",
    content: (
      <p>
        This website does not currently use analytics, advertising or tracking cookies, and it does not load third-party fonts or scripts.
        If we add analytics or similar tools in future, we will update this policy before doing so.
      </p>
    ),
  },
  {
    id: "hosting",
    title: "Hosting and technical data",
    content: (
      <p>
        The website is delivered by a third-party hosting provider. Like most hosting services, the provider may process standard technical
        data such as IP addresses and request logs to deliver and secure the service. We do not use this data to identify individual
        visitors.
      </p>
    ),
  },
  {
    id: "contact-information",
    title: "Contact information shown on this website",
    content: (
      <p>
        The business email address, phone numbers, WhatsApp number and address on this website are published so that you can contact {name}.
        Please use them for legitimate business communication.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External links",
    content: (
      <p>
        This website links to external services such as LinkedIn, GitHub and WhatsApp. Those services have their own privacy practices, and
        we are not responsible for them. Please review their policies before sharing information there.
      </p>
    ),
  },
  {
    id: "retention-rights",
    title: "Retention and your choices",
    content: (
      <p>
        We keep correspondence for as long as it is needed to respond to you and manage any resulting work. You can ask us to correct or
        delete your correspondence by emailing <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        This is a basic policy written for a small software company website and has not been reviewed by legal counsel. It can be updated as
        the website evolves, for example when forms, analytics or customer portals are added. The date above shows when it was last changed.
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

export default function PrivacyPolicy() {
  const meta = getPageMeta("/privacy-policy");
  useSeo({ title: meta.title, description: meta.description, path: meta.path });
  return <LegalDocument title="Privacy Policy" intro={`How ${name} handles information related to this website.`} sections={sections} />;
}
