import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../components/Logo";
import ButtonLink from "../components/Button";
import { primaryNav } from "../config/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => `nav__link${isActive ? " is-active" : ""}`;

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo size={38} />

          <nav className="nav nav--desktop" aria-label="Primary">
            <ul className="nav__list">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__cta">
            <ButtonLink to="/contact" variant="secondary">
              Start a project
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Rendered outside <header>: backdrop-filter on the header would otherwise trap this fixed panel. */}
      <div id="mobile-menu" ref={panelRef} className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="mobile-menu__list">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"} className={navLinkClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink to="/contact" className="mobile-menu__cta">
          Start a project
        </ButtonLink>
      </div>
    </>
  );
}
