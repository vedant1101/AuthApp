import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api"; // adjust path if needed


export function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  type User = {
    id: number;
    email: string;
  };

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function loadUser() {
      try {
        const data: User = await api.me(token);
        setUser(data);
      } catch (err) {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loading) return <p>Loading...</p>;
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
          <p className="subheading">Verified from backend</p>
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

      <button className="btn-outline" onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
}