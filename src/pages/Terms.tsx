import LegalDocument, { type LegalSection } from "../components/LegalDocument";
import { getPageMeta } from "../config/pages";
import { siteConfig } from "../config/site";
import { useSeo } from "../hooks/useSeo";

const { contact, name } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Using this website",
    content: (
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the website. The website is provided by{" "}
        {name} to share information about our company, services and products.
      </p>
    ),
  },
  {
    id: "information",
    title: "Information on the website",
    content: (
      <p>
        We try to keep the content accurate and current, but it is provided for general information only. It may change without notice, and
        nothing on the website is an offer, quotation or guarantee of availability of any service or product.
      </p>
    ),
  },
  {
    id: "services",
    title: "Services and projects",
    content: (
      <p>
        Software development and related services are provided under a separate written agreement or proposal that sets out scope,
        timelines, fees and responsibilities. Enquiries made through this website do not create a client relationship until such an
        agreement is accepted by both parties.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        The ACCREVIA name, logo, website design, text and graphics belong to {name} unless stated otherwise. You may view the website for
        your own use, but you may not copy, modify or redistribute its content or branding without written permission. Third-party names and
        technologies mentioned remain the property of their owners.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <p>
        You agree not to misuse the website, attempt to disrupt or gain unauthorised access to it, or use the contact details published here
        for spam or unlawful purposes.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External links",
    content: <p>The website links to third-party sites. We do not control them and are not responsible for their content or practices.</p>,
  },
  {
    id: "liability",
    title: "Disclaimer and limitation of liability",
    content: (
      <p>
        The website is provided &ldquo;as is&rdquo; without warranties of any kind. To the extent permitted by law, {name} is not liable for
        any loss arising from your use of, or inability to use, this website or from reliance on its content.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    content: <p>These terms are governed by the laws of India.</p>,
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        These are basic terms for a small software company website and have not been reviewed by legal counsel. We may update them as the
        website and our offerings evolve. Continued use of the website after an update means you accept the revised terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about these terms can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    ),
  },
];

export default function Terms() {
  const meta = getPageMeta("/terms");
  useSeo(meta);
  return (
    <LegalDocument
      title="Terms & Conditions"
      intro={`The terms that apply when you use the ${name} website.`}
      sections={sections}
      breadcrumb={meta.breadcrumb}
    />
  );
}
