import ButtonLink from "../components/Button";
import PageHero from "../components/PageHero";
import { notFoundMeta } from "../config/pages";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({ ...notFoundMeta, path: "/404", noindex: true });
  return (
    <PageHero title="Page not found" intro="The page you are looking for does not exist or has moved.">
      <ButtonLink to="/">Back to home</ButtonLink>
      <ButtonLink to="/contact" variant="secondary">
        Contact us
      </ButtonLink>
    </PageHero>
  );
}
