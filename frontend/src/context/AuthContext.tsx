import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id:    number;
  email: string;
}

interface AuthCtx {
  user:   User | null;
  token:  string | null;
  login:  (user: User, token: string) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({
  user:   null,
  token:  null,
  login:  () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user,  setUser]  = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch {}
    }
  }, []);

  function login(u: User, t: string) {
    setUser(u);
    setToken(t);
    localStorage.setItem("auth", JSON.stringify({ user: u, token: t }));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  }

  return (
    <Ctx.Provider value={{ user, token, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

function useAuth() {
  return useContext(Ctx);
}

export { AuthProvider, useAuth };