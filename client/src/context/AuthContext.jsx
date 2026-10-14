import { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/auth.service.js";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]                   = useState(null);
  const [isLoading, setIsLoading]         = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data.data ?? response.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { checkSession(); }, [checkSession]);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    const userData = response.data?.data?.user ?? response.data?.user ?? response.data;
    if (response.data?.data?.token) {
      localStorage.setItem("authToken", response.data.data.token);
    } else if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    setUser(userData);
    setIsAuthenticated(true);
    toast.success(`مرحباً، ${userData?.name || ""}!`);
    return response;
  };

  const register = async (data) => {
    const response = await authService.register(data);
    const userData = response.data?.data?.user ?? response.data?.user ?? response.data;
    if (response.data?.data?.token) {
      localStorage.setItem("authToken", response.data.data.token);
    } else if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    setUser(userData);
    setIsAuthenticated(true);
    toast.success(`مرحباً، ${userData?.name || ""}! تم إنشاء حسابك بنجاح`);
    return response;
  };

  const logout = async () => {
    try { await authService.logout(); } catch {}
    finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
      toast.success("تم تسجيل الخروج بنجاح");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
