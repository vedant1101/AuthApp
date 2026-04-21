import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Alert } from "../components/Alert";
import { PasswordStrength } from "../components/PasswordStrength";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import { api } from "../api";

export function Register() {
  const navigate     = useNavigate();

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showRules, setShowRules] = useState(false);
  const [errors,    setErrors]    = useState<{ email?: string; password?: string }>({});
  const [alert,     setAlert]     = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading,   setLoading]   = useState(false);

  const { rules, score, isStrong } = usePasswordStrength(password);

  function validate() {
    const e: typeof errors = {};
    if (!email)    e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password)  e.password = "Password is required";
    else if (!isStrong) e.password = "Password doesn't meet all requirements";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
        await api.register(email, password);
        setAlert({ type: "success", msg: "Account created! Please sign in." });
        setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setAlert({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="logo">
        <div className="logo-mark">A</div>
        <div className="logo-text">AuthApp</div>
      </div>

      <h1 className="heading">Create account</h1>
      <p className="subheading">Get started — it only takes a moment</p>

      {alert && <Alert type={alert.type} message={alert.msg} />}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Min 8 chars, mixed case + number"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
          onFocus={() => setShowRules(true)}
          error={errors.password}
          autoComplete="new-password"
        />

        <PasswordStrength
          score={score}
          rules={rules}
          visible={showRules && password.length > 0}
        />

        <button type="submit" className={`btn ${loading ? "btn--loading" : ""}`} disabled={loading}>
          {!loading && "Create account"}
        </button>
      </form>

      <div className="divider">or</div>
      <p className="toggle">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}