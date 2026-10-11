interface ProcessItem {
  title: string;
  description: string;
}

/** Numbered delivery steps (a real sequence, so an ordered list). Used on Home and the service pages. */
export default function ProcessList({ steps }: { steps: ReadonlyArray<ProcessItem> }) {
  return (
    <ol className="process">
      {steps.map((step) => (
        <li key={step.title} className="process__step">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
