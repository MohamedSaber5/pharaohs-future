import axios from "axios";

/**
 * Axios instance pre-configured with base URL and credentials.
 * All API calls should use this instance instead of raw axios.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true, // Required for HTTP-only cookie auth
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 second timeout
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // Attach token from localStorage if available (fallback for non-cookie setups)
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    // Handle global 401 (unauthorized) - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // Avoid redirect loops on the login page itself
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
