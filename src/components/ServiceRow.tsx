import { Link } from "react-router-dom";
import type { Service } from "../data/services";

/** Compact service entry used on the home page. Links to the matching section on the Services page. */
export default function ServiceRow({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <li className="service-row">
      <span className="service-row__icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <div>
        <h3 className="service-row__title">
          <Link to={`/services#${service.id}`}>{service.title}</Link>
        </h3>
        <p className="service-row__summary">{service.summary}</p>
      </div>
    </li>
  );
}
