import type { FaqItem } from "../data/faq";

/** Accessible FAQ using native <details>/<summary> (keyboard friendly, works without JavaScript). */
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} className="faq__item">
          <summary className="faq__question">{item.question}</summary>
          <p className="faq__answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
