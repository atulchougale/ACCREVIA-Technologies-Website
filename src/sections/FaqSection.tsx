import FaqList from "../components/FaqList";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { faqs, type FaqItem } from "../data/faq";

interface FaqSectionProps {
  items?: FaqItem[];
  tone?: "base" | "raised";
}

export default function FaqSection({ items = faqs, tone = "base" }: FaqSectionProps) {
  return (
    <Section tone={tone} labelledBy="faq-title">
      <SectionHeading
        id="faq-title"
        title="Frequently asked questions"
        intro="Straight answers about what ACCREVIA builds and how to get started."
      />
      <FaqList items={items} />
    </Section>
  );
}
