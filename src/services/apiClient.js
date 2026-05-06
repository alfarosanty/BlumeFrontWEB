const BASE_URL = "http://localhost:8000";

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("blume_token");

  const headers = { ...options.headers };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    console.warn("Sesión expirada");
    localStorage.removeItem("blume_token");
    window.location.href = "/login";
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Error en la petición");
  }

  return response.json();
};