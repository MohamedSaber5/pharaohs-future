import { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/auth.service.js";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

/**
 * AuthProvider - wraps the app and provides auth state to all children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading initial session
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Try to restore session on app load
  const checkSession = useCallback(async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data);
      setIsAuthenticated(true);
    } catch {
      // Not authenticated — that's okay
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    setIsAuthenticated(true);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    toast.success(`Welcome back, ${response.data.user.name}!`);
    return response;
  };

  const register = async (data) => {
    const response = await authService.register(data);
    setUser(response.data.user);
    setIsAuthenticated(true);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    toast.success(`Welcome to Pharaohs Future, ${response.data.user.name}!`);
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Proceed with local logout even if API call fails
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
      toast.success("You have been logged out.");
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth - custom hook to consume AuthContext
 * @returns {object} Auth state and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
