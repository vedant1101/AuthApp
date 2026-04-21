const BASE = import.meta.env.VITE_API_URL;

async function request(
  endpoint: string,
  body?: object,
  method: "POST" | "GET" = "POST",
  token?: string
) {
  const res = await fetch(`${BASE}/api/auth${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: method === "POST" ? JSON.stringify(body) : undefined,
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

  me: (token: string | null) =>
    request("/me", undefined, "GET", token),  
};