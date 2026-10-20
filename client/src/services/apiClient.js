import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "حدث خطأ ما. يرجى المحاولة مرة أخرى.";

    // Prevent any infinite refresh loop on 401
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");

      const skipRedirect = error.config?.skipAuthRedirect || error.config?.url?.includes("/auth/me");
      const currentPath = window.location.pathname;
      const isPublicPath = ["/", "/properties", "/projects", "/about", "/contact", "/auth", "/login"].includes(currentPath);

      // Only redirect if specifically on a protected route (e.g. /admin, /my-reservations, /employee)
      if (!skipRedirect && !isPublicPath) {
        window.location.href = "/auth";
      }
    }

    const customError = new Error(message);
    customError.response = error.response;
    customError.status = error.response?.status;
    return Promise.reject(customError);
  }
);

export default apiClient;
