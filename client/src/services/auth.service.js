import apiClient from "./apiClient.js";

/**
 * Authentication service - handles all auth-related API calls
 */
const authService = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  logout: () => apiClient.post("/auth/logout"),
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
  verifyOTP: (email, otp) => apiClient.post("/auth/verify-otp", { email, otp }),
  resetPassword: (data) => apiClient.post("/auth/reset-password", data),
  resetPasswordByPhone: (data) => apiClient.post("/auth/reset-password-phone", data),
  getMe: () => apiClient.get("/auth/me", { skipAuthRedirect: true }),
};

export default authService;
