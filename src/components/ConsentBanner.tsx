import { Link } from "react-router-dom";
import { analyticsEnabled, setConsent, useConsent } from "../utils/analytics";

/** Analytics consent prompt. Renders nothing unless GA4 is configured and no choice has been made yet. */
export default function ConsentBanner() {
  const consent = useConsent();
  if (!analyticsEnabled || consent !== "unset") return null;

  return (
    <section className="consent" aria-label="Analytics consent">
      <p className="consent__text">
        We would like to use Google Analytics to understand how this website is used. It only runs if you accept, and you can change your
        choice at any time. See our <Link to="/privacy">privacy policy</Link>.
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--secondary" onClick={() => setConsent("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn--primary" onClick={() => setConsent("granted")}>
          Accept analytics
        </button>
      </div>
    </section>
  );
}
