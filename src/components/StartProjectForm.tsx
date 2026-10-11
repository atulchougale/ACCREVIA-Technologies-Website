import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Send } from "lucide-react";
import { budgets, contactMethods, HONEYPOT_FIELD, projectTypes, timelines } from "../config/forms";
import { mailtoLink } from "../config/site";
import { getService } from "../data/services";
import { SUBMITTED_FLAG, submitNetlifyForm } from "../utils/submitForm";
import { isValidEmail } from "../utils/validation";
import FormField from "./FormField";

type Values = Record<
  | "fullName"
  | "company"
  | "email"
  | "phone"
  | "country"
  | "city"
  | "projectType"
  | "timeline"
  | "budget"
  | "contactMethod"
  | "description"
  | "currentSystem"
  | "existingTechnology"
  | "launchDate"
  | "keyFeatures",
  string
>;
type Errors = Partial<Record<keyof Values | "consent", string>>;

const emptyValues: Values = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  projectType: "",
  timeline: "",
  budget: "",
  contactMethod: "Email",
  description: "",
  currentSystem: "",
  existingTechnology: "",
  launchDate: "",
  keyFeatures: "",
};

function validate(values: Values, consent: boolean): Errors {
  const errors: Errors = {};
  if (!values.projectType) errors.projectType = "Choose the type of project you need.";
  if (values.description.trim().length < 20) errors.description = "Please describe your project in at least 20 characters.";
  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Enter your business email address.";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address, for example name@company.com.";
  if ((values.contactMethod === "Phone" || values.contactMethod === "WhatsApp") && !values.phone.trim()) {
    errors.phone = `Enter a phone number so we can reach you by ${values.contactMethod}.`;
  }
  if (!consent) errors.consent = "Please confirm that we may contact you about this enquiry.";
  return errors;
}

/** Order used to move focus to the first invalid control. */
const focusOrder: Array<keyof Values | "consent"> = ["projectType", "description", "fullName", "email", "phone", "consent"];

/**
 * Project intake form. Submitted to Netlify Forms (see utils/submitForm.ts); on success the visitor is sent to /thank-you.
 * Validation here improves usability only: spam filtering and storage happen on the Netlify side.
 */
export default function StartProjectForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const serviceFromLink = getService(searchParams.get("service") ?? "");
  const [values, setValues] = useState<Values>({ ...emptyValues, projectType: serviceFromLink?.projectType ?? "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const update = (key: keyof Values) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const emailFallback = () => {
    const lines = [
      `Project type: ${values.projectType}`,
      `Timeline: ${values.timeline || "-"}`,
      `Budget: ${values.budget || "-"}`,
      `Preferred contact: ${values.contactMethod}`,
      "",
      values.description,
      "",
      `${values.fullName} | ${values.company || "-"} | ${values.email} | ${values.phone || "-"}`,
    ];
    return mailtoLink(`Project enquiry: ${values.projectType || "General"}`).concat(`&body=${encodeURIComponent(lines.join("\n"))}`);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitFailed(false);
    const found = validate(values, consent);
    setErrors(found);
    const firstInvalid = focusOrder.find((key) => found[key]);
    if (firstInvalid) {
      const target =
        firstInvalid === "projectType"
          ? formRef.current?.querySelector<HTMLElement>('input[name="projectType"]')
          : formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      target?.focus();
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)?.value ?? "";
    setSubmitting(true);
    try {
      await submitNetlifyForm("start-project", { ...values, consent: "yes", [HONEYPOT_FIELD]: honeypot });
      try {
        window.sessionStorage.setItem(SUBMITTED_FLAG, "start-project");
      } catch {
        /* sessionStorage unavailable: the thank-you page simply will not record a conversion */
      }
      navigate("/thank-you");
    } catch {
      setSubmitFailed(true);
      setSubmitting(false);
    }
  }

  const errorList = (Object.entries(errors) as Array<[string, string | undefined]>).filter(([, message]) => message);

  return (
    <form ref={formRef} className="project-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: hidden from people, visible to simple bots. Netlify discards submissions that fill it. */}
      <p className="visually-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {errorList.length > 0 && (
        <div className="form-summary" role="alert">
          <p className="form-summary__title">Please fix the following before sending:</p>
          <ul>
            {errorList.map(([key, message]) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="form-section">
        <legend>
          <span className="form-section__number">1</span> What do you want to build?{" "}
          <span className="field__required" aria-hidden="true">
            *
          </span>
        </legend>
        <div
          className="choice-grid"
          role="radiogroup"
          aria-required="true"
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
        >
          {projectTypes.map((type) => (
            <label key={type} className="choice">
              <input
                type="radio"
                name="projectType"
                value={type}
                checked={values.projectType === type}
                onChange={update("projectType")}
                aria-invalid={errors.projectType ? true : undefined}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {errors.projectType && (
          <p id="projectType-error" className="field__error">
            {errors.projectType}
          </p>
        )}
      </fieldset>

      <fieldset className="form-section">
        <legend>
          <span className="form-section__number">2</span> Tell us about the project
        </legend>
        <FormField
          id="description"
          label="What do you want to build, who will use it, and what business outcome matters?"
          required
          error={errors.description}
        >
          {(aria) => <textarea {...aria} name="description" rows={6} value={values.description} onChange={update("description")} />}
        </FormField>
        <details className="form-more">
          <summary>Add more detail (optional)</summary>
          <div className="form-grid">
            <FormField id="currentSystem" label="Current website or system">
              {(aria) => (
                <input {...aria} name="currentSystem" type="text" value={values.currentSystem} onChange={update("currentSystem")} />
              )}
            </FormField>
            <FormField id="existingTechnology" label="Existing technology">
              {(aria) => (
                <input
                  {...aria}
                  name="existingTechnology"
                  type="text"
                  value={values.existingTechnology}
                  onChange={update("existingTechnology")}
                />
              )}
            </FormField>
            <FormField id="launchDate" label="Expected launch date">
              {(aria) => (
                <input
                  {...aria}
                  name="launchDate"
                  type="text"
                  placeholder="e.g. March 2027"
                  value={values.launchDate}
                  onChange={update("launchDate")}
                />
              )}
            </FormField>
          </div>
          <FormField id="keyFeatures" label="Key features">
            {(aria) => <textarea {...aria} name="keyFeatures" rows={3} value={values.keyFeatures} onChange={update("keyFeatures")} />}
          </FormField>
        </details>
      </fieldset>

      <fieldset className="form-section">
        <legend>
          <span className="form-section__number">3</span> About you
        </legend>
        <div className="form-grid">
          <FormField id="fullName" label="Full name" required error={errors.fullName}>
            {(aria) => (
              <input {...aria} name="fullName" type="text" autoComplete="name" value={values.fullName} onChange={update("fullName")} />
            )}
          </FormField>
          <FormField id="company" label="Business / company name">
            {(aria) => (
              <input {...aria} name="company" type="text" autoComplete="organization" value={values.company} onChange={update("company")} />
            )}
          </FormField>
          <FormField id="email" label="Business email" required error={errors.email}>
            {(aria) => <input {...aria} name="email" type="email" autoComplete="email" value={values.email} onChange={update("email")} />}
          </FormField>
          <FormField
            id="phone"
            label="Phone / WhatsApp"
            required={values.contactMethod === "Phone" || values.contactMethod === "WhatsApp"}
            error={errors.phone}
          >
            {(aria) => <input {...aria} name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update("phone")} />}
          </FormField>
          <FormField id="country" label="Country">
            {(aria) => (
              <input {...aria} name="country" type="text" autoComplete="country-name" value={values.country} onChange={update("country")} />
            )}
          </FormField>
          <FormField id="city" label="City">
            {(aria) => (
              <input {...aria} name="city" type="text" autoComplete="address-level2" value={values.city} onChange={update("city")} />
            )}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>
          <span className="form-section__number">4</span> Timeline and budget
        </legend>
        <div className="form-grid">
          <FormField id="timeline" label="Project timeline">
            {(aria) => (
              <select {...aria} name="timeline" value={values.timeline} onChange={update("timeline")}>
                <option value="">Select a timeline</option>
                {timelines.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </FormField>
          <FormField id="budget" label="Budget range (INR)">
            {(aria) => (
              <select {...aria} name="budget" value={values.budget} onChange={update("budget")}>
                <option value="">Select a budget range</option>
                {budgets.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>
          <span className="form-section__number">5</span> How should we reach you?
        </legend>
        <div className="choice-grid choice-grid--compact" role="radiogroup">
          {contactMethods.map((method) => (
            <label key={method} className="choice">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={values.contactMethod === method}
                onChange={update("contactMethod")}
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-consent">
        <label className="check">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (errors.consent) setErrors((current) => ({ ...current, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree that ACCREVIA Technologies may contact me about this enquiry and process the information I submit as described in the{" "}
            <Link to="/privacy">Privacy Policy</Link>.{" "}
            <span className="field__required" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="field__error">
            {errors.consent}
          </p>
        )}
      </div>

      {submitFailed && (
        <div className="form-summary" role="alert">
          <p className="form-summary__title">We could not send your enquiry right now.</p>
          <p>
            Please try again in a moment, or <a href={emailFallback()}>send it by email instead</a>. Nothing has been lost: your answers are
            still in the form.
          </p>
        </div>
      )}

      <div className="form-submit">
        <button type="submit" className="btn btn--primary btn--large" disabled={submitting}>
          <span className="btn__icon">
            <Send size={18} aria-hidden="true" />
          </span>
          <span>{submitting ? "Sending..." : "Send my project enquiry"}</span>
        </button>
        <p className="field__hint">Fields marked * are required. We use your details only to reply to this enquiry.</p>
      </div>
    </form>
  );
}
