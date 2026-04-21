import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/Input";
import { Alert } from "../components/Alert";

export function Login() {
  const { login }     = useAuth();
  const navigate      = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState<{ email?: string; password?: string }>({});
  const [alert,    setAlert]    = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading,  setLoading]  = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!email)    e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
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
      const data = await api.login(email, password);
      login(data.user, data.token);
      setAlert({ type: "success", msg: data.message });
      setTimeout(() => navigate("/dashboard"), 600);
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

      <h1 className="heading">Sign in</h1>
      <p className="subheading">Welcome back — enter your credentials</p>

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
          placeholder="Your password"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
          error={errors.password}
          autoComplete="current-password"
        />

        <button type="submit" className={`btn ${loading ? "btn--loading" : ""}`} disabled={loading}>
          {!loading && "Sign in"}
        </button>
      </form>

      <div className="divider">or</div>
      <p className="toggle">
        Don't have an account?{" "}
        <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}