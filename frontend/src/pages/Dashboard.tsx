import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!user) return null;

  return (
    <div className="card">
      <div className="logo">
        <div className="logo-mark">A</div>
        <div className="logo-text">AuthApp</div>
      </div>

      <div className="dash-header">
        <div>
          <h1 className="heading">Welcome back</h1>
          <p className="subheading">You're authenticated</p>
        </div>
        <div className="badge">
          <span className="badge-dot" />
          Active
        </div>
      </div>

      <div className="info-box">
        <p className="info-label">User ID</p>
        <p className="info-value">#{user.id}</p>
      </div>

      <div className="info-box">
        <p className="info-label">Email</p>
        <p className="info-value">{user.email}</p>
      </div>

      <div className="token-box">
        <p className="info-label">JWT Token</p>
        <p className="token-value">{token}</p>
      </div>

      <button className="btn-outline" onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
}