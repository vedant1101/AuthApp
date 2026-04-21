const BASE = import.meta.env.VITE_API_URL;

async function request(endpoint: string, body: object) {
  const res = await fetch(`${BASE}/api/auth${endpoint}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Something went wrong");
  return data;
}

export const api = {
  register: (email: string, password: string) =>
    request("/register", { email, password }),

  login: (email: string, password: string) =>
    request("/login", { email, password }),
};