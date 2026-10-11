import { Mail, MessageCircle, Phone } from "lucide-react";
import { mailtoLink, siteConfig, whatsappLink } from "../config/site";
import ButtonLink from "./Button";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

interface ContactActionsProps {
  /** Show LinkedIn / GitHub buttons as well. */
  includeSocial?: boolean;
}

/** Email / call / WhatsApp (and optionally LinkedIn / GitHub) call-to-action buttons. */
export default function ContactActions({ includeSocial = false }: ContactActionsProps) {
  const { contact, social } = siteConfig;
  return (
    <div className="action-row">
      <ButtonLink to={mailtoLink()} icon={<Mail size={18} aria-hidden="true" />}>
        Email us
      </ButtonLink>
      <ButtonLink to={`tel:${contact.primaryPhone.tel}`} variant="secondary" icon={<Phone size={18} aria-hidden="true" />}>
        Call us
      </ButtonLink>
      <ButtonLink to={whatsappLink()} variant="secondary" icon={<MessageCircle size={18} aria-hidden="true" />}>
        WhatsApp
      </ButtonLink>
      {includeSocial && (
        <>
          <ButtonLink to={social.linkedin} variant="ghost" icon={<LinkedinIcon width={18} height={18} />}>
            LinkedIn
          </ButtonLink>
          <ButtonLink to={social.github} variant="ghost" icon={<GithubIcon width={18} height={18} />}>
            GitHub
          </ButtonLink>
        </>
      )}
    </div>
  );
}
