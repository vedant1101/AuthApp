import type { Rule } from "../types";

const COLORS = ["", "#f43f5e", "#f97316", "#eab308", "#10b981", "#6366f1"];
const LABELS = ["", "Weak", "Fair", "Good", "Strong", "Perfect"];

interface Props {
  score:    number;
  rules:    Rule[];
  visible:  boolean;
}

export function PasswordStrength({ score, rules, visible }: Props) {
  if (!visible) return null;
  const color = COLORS[score];

  return (
    <div className="strength-wrapper">
      {/* Bar */}
      <div className="strength-bar">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="strength-segment"
            style={{ background: i <= score ? color : undefined }}
          />
        ))}
      </div>
      <p className="strength-label" style={{ color }}>{LABELS[score]}</p>

      {/* Rules */}
      <div className="rules">
        {rules.map((r, i) => (
          <div key={i} className={`rule ${r.pass ? "rule--pass" : ""}`}>
            <span className="rule-dot" />
            {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}