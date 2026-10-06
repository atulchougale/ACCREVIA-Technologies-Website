import ContactActions from "../components/ContactActions";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { siteConfig } from "../config/site";

export default function HomeContact() {
  return (
    <section className="section section--raised" aria-labelledby="home-contact-title">
      <div className="container">
        <SectionHeading
          id="home-contact-title"
          title="Talk to ACCREVIA"
          intro="Email, call or message us on WhatsApp. We are based in Kolhapur, Maharashtra, India."
        />
        <Reveal>
          <ContactActions includeSocial />
          <p className="muted-note">{siteConfig.contact.address.oneLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
