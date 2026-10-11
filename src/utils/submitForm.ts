/**
 * Submits a form to Netlify Forms (the site is static: there is no custom server).
 * Netlify handles storage, its built-in spam filtering and the honeypot field; the browser only POSTs
 * url-encoded data to "/" with the matching `form-name`. No secrets or API keys are involved.
 * Client-side validation is for usability only and is NOT a security control.
 */
export async function submitNetlifyForm(formName: string, values: Record<string, string>): Promise<void> {
  const body = new URLSearchParams({ "form-name": formName, ...values }).toString();
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
}

/** sessionStorage key set right after a successful submission so /thank-you can record a single conversion. Holds only the form name. */
export const SUBMITTED_FLAG = "accrevia-submitted-form";
