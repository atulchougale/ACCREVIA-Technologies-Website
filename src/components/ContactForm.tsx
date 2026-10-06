import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "../config/site";

/**
 * Frontend-only enquiry form. It does NOT send data to any server: submitting opens the visitor's
 * email app with a prepared message addressed to ACCREVIA.
 * Future: replace handleSubmit with a Netlify Forms post or an API call (see README, "Contact form").
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = topic.trim() || "Enquiry for ACCREVIA Technologies";
    const body = `${message.trim()}\n\n--\n${name.trim()}\n${email.trim()}`;
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form__field">
        <label htmlFor="contact-email">Your email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form__field">
        <label htmlFor="contact-topic">What do you need help with?</label>
        <input
          id="contact-topic"
          name="topic"
          type="text"
          placeholder="e.g. SaaS product, automation, web application"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <div className="form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button type="submit" className="btn btn--primary">
        <span className="btn__icon">
          <Send size={18} aria-hidden="true" />
        </span>
        <span>Prepare email</span>
      </button>
      <p className="form__note" role="status">
        {opened
          ? "Your email app should now be open with the message ready to send. If nothing opened, email us directly at the address on this page."
          : "This form does not store or transmit anything on this website. It opens your email app with your message ready to send."}
      </p>
    </form>
  );
}
