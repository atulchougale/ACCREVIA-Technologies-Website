import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "../components/Logo";
import ExternalLink from "../components/ExternalLink";
import { GithubIcon, LinkedinIcon } from "../components/icons/BrandIcons";
import { legalNav, primaryNav } from "../config/navigation";
import { siteConfig, whatsappLink } from "../config/site";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo size={44} />
          <p className="site-footer__tagline">{siteConfig.tagline}</p>
          <p className="site-footer__text">{siteConfig.positioning}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="site-footer__heading">Explore</h2>
          <ul className="site-footer__list">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="site-footer__heading">Legal</h2>
          <ul className="site-footer__list">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list site-footer__list--icons">
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${contact.primaryPhone.tel}`}>{contact.primaryPhone.display}</a>
            </li>
            <li>
              <MessageCircle size={16} aria-hidden="true" />
              <ExternalLink href={whatsappLink()}>WhatsApp {contact.whatsappDisplay}</ExternalLink>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <address>{contact.address.oneLine}</address>
            </li>
          </ul>
          <div className="site-footer__social">
            <ExternalLink href={social.linkedin} aria-label="ACCREVIA on LinkedIn" className="icon-link">
              <LinkedinIcon />
            </ExternalLink>
            <ExternalLink href={social.github} aria-label="ACCREVIA on GitHub" className="icon-link">
              <GithubIcon />
            </ExternalLink>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
