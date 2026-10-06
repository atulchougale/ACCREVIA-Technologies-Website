import FarmStayAction from "../components/FarmStayAction";
import Reveal from "../components/Reveal";
import { farmstay } from "../data/farmstay";

export default function FeaturedProduct() {
  const highlights = farmstay.capabilities.slice(0, 6);
  return (
    <section className="section" aria-labelledby="farmstay-title">
      <div className="container">
        <Reveal className="featured">
          <div className="featured__body">
            <p className="featured__label">Featured product</p>
            <h2 id="farmstay-title" className="featured__title">
              FarmStay
            </h2>
            <p className="featured__text">{farmstay.summary}</p>
            <div className="action-row">
              <FarmStayAction variant="primary" />
            </div>
          </div>
          <ul className="featured__list" aria-label="FarmStay capabilities">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title}>
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
