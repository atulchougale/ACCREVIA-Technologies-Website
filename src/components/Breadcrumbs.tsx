import { Link } from "react-router-dom";
import { ChevronRight, House } from "lucide-react";
import type { Crumb } from "../config/pages";

/** Full-width breadcrumb band. The last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            {items.map((item, index) => {
              const last = index === items.length - 1;
              return (
                <li key={item.path} className="breadcrumbs__item">
                  {index === 0 && <House size={15} aria-hidden="true" />}
                  {last ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <>
                      <Link to={item.path}>{item.name}</Link>
                      <ChevronRight size={14} aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
