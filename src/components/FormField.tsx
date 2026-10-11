import type { ReactNode } from "react";

interface FieldAria {
  id: string;
  "aria-invalid": boolean | undefined;
  "aria-describedby": string | undefined;
  "aria-required": boolean | undefined;
}

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (aria: FieldAria) => ReactNode;
}

/** Label + control + hint + error message, wired together with the correct ARIA attributes. */
export default function FormField({ id, label, required = false, hint, error, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`field${error ? " field--invalid" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className="field__required" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="field__optional"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, "aria-required": required || undefined })}
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
