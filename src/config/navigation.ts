export interface NavItem {
  label: string;
  to: string;
}

/** Primary navigation. Add future pages here (Careers, Blog, Case Studies, Portfolio...). */
export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Technologies", to: "/technologies" },
  { label: "Contact", to: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];
