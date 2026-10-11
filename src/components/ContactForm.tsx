import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { HONEYPOT_FIELD } from "../config/forms";
import { mailtoLink } from "../config/site";
import { SUBMITTED_FLAG, submitNetlifyForm } from "../utils/submitForm";
import { isValidEmail } from "../utils/validation";
import FormField from "./FormField";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

/**
 * General contact form. Submitted to Netlify Forms; on success the visitor is sent to /thank-you.
 * If the submission fails, an email fallback is offered. Client-side validation is for usability only.
 */
export default function ContactForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailed(false);
    const found: Errors = {};
    if (!name.trim()) found.name = "Enter your name.";
    if (!email.trim()) found.email = "Enter your email address.";
    else if (!isValidEmail(email)) found.email = "Enter a valid email address, for example name@company.com.";
    if (message.trim().length < 10) found.message = "Please write a short message (at least 10 characters).";
    if (!consent) found.consent = "Please confirm that we may contact you about this message.";
    setErrors(found);
    const first = (["name", "email", "message", "consent"] as const).find((key) => found[key]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)?.value ?? "";
    setSubmitting(true);
    try {
      await submitNetlifyForm("contact", { name, email, topic, message, consent: "yes", [HONEYPOT_FIELD]: honeypot });
      try {
        window.sessionStorage.setItem(SUBMITTED_FLAG, "contact");
      } catch {
        /* ignore: only affects conversion tracking */
      }
      navigate("/thank-you");
    } catch {
      setFailed(true);
      setSubmitting(false);
    }
  }

  const fallback = `${mailtoLink(topic || "Enquiry for ACCREVIA Technologies")}&body=${encodeURIComponent(`${message}\n\n--\n${name}\n${email}`)}`;

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
      <p className="visually-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <FormField id="contact-name" label="Your name" required error={errors.name}>
        {(aria) => <input {...aria} name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />}
      </FormField>
      <FormField id="contact-email" label="Your email" required error={errors.email}>
        {(aria) => (
          <input {...aria} name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        )}
      </FormField>
      <FormField id="contact-topic" label="What do you need help with?">
        {(aria) => (
          <input
            {...aria}
            name="topic"
            type="text"
            placeholder="e.g. SaaS product, automation, web application"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        )}
      </FormField>
      <FormField id="contact-message" label="Message" required error={errors.message}>
        {(aria) => <textarea {...aria} name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />}
      </FormField>
      <div className="form-consent">
        <label className="check">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
          />
          <span>
            I agree that ACCREVIA Technologies may contact me about this message and process my details as described in the{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && (
          <p id="contact-consent-error" className="field__error">
            {errors.consent}
          </p>
        )}
      </div>
      {failed && (
        <div className="form-summary" role="alert">
          <p className="form-summary__title">We could not send your message right now.</p>
          <p>
            Please try again, or <a href={fallback}>send it by email instead</a>.
          </p>
        </div>
      )}
      <button type="submit" className="btn btn--primary" disabled={submitting}>
        <span className="btn__icon">
          <Send size={18} aria-hidden="true" />
        </span>
        <span>{submitting ? "Sending..." : "Send message"}</span>
      </button>
    </form>
  );
}
