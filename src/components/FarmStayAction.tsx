import { ExternalLink as ExternalIcon } from "lucide-react";
import { siteConfig } from "../config/site";
import ButtonLink from "./Button";

/**
 * "Explore FarmStay" call to action.
 * Always links to the on-site product page; when VITE_FARMSTAY_URL is configured it also offers a link to the live product.
 */
export default function FarmStayAction({ variant = "secondary" }: { variant?: "primary" | "secondary" }) {
  return (
    <>
      <ButtonLink to="/products/farmstay" variant={variant}>
        Explore FarmStay
      </ButtonLink>
      {siteConfig.farmstayUrl && (
        <ButtonLink to={siteConfig.farmstayUrl} variant="ghost" icon={<ExternalIcon size={18} aria-hidden="true" />}>
          Open FarmStay
        </ButtonLink>
      )}
    </>
  );
}
