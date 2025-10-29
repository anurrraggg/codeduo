import { BASE_URL } from "../constants/urls";

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const defaultHeaders = { "Content-Type": "application/json" };
  const init = {
    method: options.method || "GET",
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    body: options.body ? (typeof options.body === "string" ? options.body : JSON.stringify(options.body)) : undefined,
    credentials: "include",
  };

  const response = await fetch(url, init);

  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await response.json().catch(() => ({})) : await response.text();

  if (!response.ok) {
    const message = (data && data.message) || response.statusText || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function withAuth(token) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}
