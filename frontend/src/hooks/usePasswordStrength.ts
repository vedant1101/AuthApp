import type { Rule } from "../types";
export type { Rule };

export function usePasswordStrength(password: string) {
  const rules: Rule[] = [
    { label: "8+ characters",       pass: password.length >= 8 },
    { label: "Uppercase letter",     pass: /[A-Z]/.test(password) },
    { label: "Lowercase letter",     pass: /[a-z]/.test(password) },
    { label: "Number",               pass: /\d/.test(password) },
    { label: "Special character",    pass: /[!@#$%^&*(),.?\":{}|<>]/.test(password) },
  ];
  const score = rules.filter(r => r.pass).length;
  const isStrong = score === 5;
  return { rules, score, isStrong };
}