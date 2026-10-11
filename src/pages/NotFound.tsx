import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { notFoundMeta } from "../config/pages";
import { useSeo } from "../hooks/useSeo";

const destinations = [
  { to: "/", label: "ACCREVIA Technologies home", text: "Start from the beginning." },
  { to: "/services", label: "Software development services", text: "What we build and how we work." },
  { to: "/products/farmstay", label: "Explore FarmStay", text: "Our multi-tenant farmhouse management SaaS." },
  { to: "/technologies", label: "Technologies and capabilities", text: "The tools we work with." },
  { to: "/start-project", label: "Start your project", text: "Tell us what you want to build." },
  { to: "/contact", label: "Contact ACCREVIA Technologies", text: "Email, phone or WhatsApp." },
];

/**
 * Branded 404. On Netlify this same app shell is served from /404.html with a real HTTP 404 status for unknown URLs
 * (see vite.config.ts); inside the app it renders for any unmatched route.
 */
export default function NotFound() {
  useSeo(notFoundMeta);
  return (
    <>
      <PageHero title="404: page not found" intro="The page you are looking for does not exist or has moved. These pages may help." />
      <Section labelledBy="lost-title">
        <SectionHeading id="lost-title" title="Where would you like to go?" />
        <ul className="related-list">
          {destinations.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="related-link">
                <span>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
