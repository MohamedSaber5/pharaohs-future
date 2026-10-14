import apiClient from "./apiClient.js";

/**
 * Authentication service - handles all auth-related API calls
 */
const authService = {
  /**
   * Register a new user
   * @param {{ name: string, email: string, password: string, phone?: string }} data
   */
  register: (data) => apiClient.post("/auth/register", data),

  /**
   * Login with email and password
   * @param {{ email: string, password: string }} credentials
   */
  login: (credentials) => apiClient.post("/auth/login", credentials),

  /**
   * Logout current user
   */
  logout: () => apiClient.post("/auth/logout"),

  /**
   * Get the currently authenticated user profile
   */
  getMe: () => apiClient.get("/auth/me"),
};

export default authService;
