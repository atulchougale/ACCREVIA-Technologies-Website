import { Link } from "react-router-dom";
import ContactActions from "../components/ContactActions";
import ContactDetails from "../components/ContactDetails";
import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";
import { getPageMeta } from "../config/pages";
import { siteConfig } from "../config/site";
import { useSeo } from "../hooks/useSeo";

export default function Contact() {
  const meta = getPageMeta("/contact");
  useSeo(meta);

  return (
    <>
      <PageHero
        title="Contact ACCREVIA Technologies"
        intro="Tell us what you want to build, improve or automate. We will reply with practical next steps."
      >
        <ContactActions includeSocial />
      </PageHero>

      <section className="section section--ambient" aria-labelledby="details-title">
        <div className="container contact-grid">
          <div>
            <h2 id="details-title" className="contact-grid__title">
              {siteConfig.name}
            </h2>
            <ContactDetails />
          </div>
          <div>
            <h2 className="contact-grid__title">Send an enquiry</h2>
            <ContactForm />
            <p className="muted-note">
              Planning a larger project? Use our <Link to="/start-project">Start Your Project page</Link> to share a detailed brief.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
