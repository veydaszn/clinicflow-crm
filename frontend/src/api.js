export async function api(url, options = {}) {
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  return fetch(url, { ...options, headers });
}
