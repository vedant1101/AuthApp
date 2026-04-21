import { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label:   string;
  error?:  string;
}

export function Input({ label, error, ...rest }: Props) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <input className={`input ${error ? "input--error" : ""}`} {...rest} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}