import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "../config/site";
import ExternalLink from "./ExternalLink";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

/** Full list of ACCREVIA contact details, driven by site config. */
export default function ContactDetails() {
  const { contact, social } = siteConfig;
  return (
    <dl className="details">
      <div className="details__row">
        <dt>
          <Mail size={18} aria-hidden="true" /> Email
        </dt>
        <dd>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </dd>
      </div>
      <div className="details__row">
        <dt>
          <Phone size={18} aria-hidden="true" /> Primary phone
        </dt>
        <dd>
          <a href={`tel:${contact.primaryPhone.tel}`}>{contact.primaryPhone.display}</a>
        </dd>
      </div>
      <div className="details__row">
        <dt>
          <Phone size={18} aria-hidden="true" /> Secondary phone
        </dt>
        <dd>
          <a href={`tel:${contact.secondaryPhone.tel}`}>{contact.secondaryPhone.display}</a>
        </dd>
      </div>
      <div className="details__row">
        <dt>
          <MessageCircle size={18} aria-hidden="true" /> WhatsApp
        </dt>
        <dd>
          <ExternalLink href={whatsappLink()}>{contact.whatsappDisplay}</ExternalLink>
        </dd>
      </div>
      <div className="details__row">
        <dt>
          <LinkedinIcon width={18} height={18} /> LinkedIn
        </dt>
        <dd>
          <ExternalLink href={social.linkedin}>linkedin.com/in/atulchougale07</ExternalLink>
        </dd>
      </div>
      <div className="details__row">
        <dt>
          <GithubIcon width={18} height={18} /> GitHub
        </dt>
        <dd>
          <ExternalLink href={social.github}>github.com/atulchougale</ExternalLink>
        </dd>
      </div>
      <div className="details__row">
        <dt>
          <MapPin size={18} aria-hidden="true" /> Address
        </dt>
        <dd>
          <address>
            {contact.address.lines.map((line) => (
              <span key={line} className="details__line">
                {line}
              </span>
            ))}
          </address>
        </dd>
      </div>
    </dl>
  );
}
