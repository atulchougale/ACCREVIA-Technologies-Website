import { useSeo } from "../hooks/useSeo";
import { getPageMeta } from "../config/pages";
import Hero from "../sections/Hero";
import WhatWeBuild from "../sections/WhatWeBuild";
import ServicesOverview from "../sections/ServicesOverview";
import FeaturedProduct from "../sections/FeaturedProduct";
import TechCapabilities from "../sections/TechCapabilities";
import WhyAccrevia from "../sections/WhyAccrevia";
import DevelopmentApproach from "../sections/DevelopmentApproach";
import CtaBand from "../sections/CtaBand";
import HomeContact from "../sections/HomeContact";

export default function Home() {
  const meta = getPageMeta("/");
  useSeo({ title: meta.title, description: meta.description, path: meta.path });
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <ServicesOverview />
      <FeaturedProduct />
      <TechCapabilities />
      <WhyAccrevia />
      <DevelopmentApproach />
      <CtaBand />
      <HomeContact />
    </>
  );
}
