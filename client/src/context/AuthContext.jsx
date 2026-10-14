import { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/auth.service.js";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,            setUser]            = useState(null);
  const [isLoading,       setIsLoading]       = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      // apiClient interceptor returns response.data, so this IS the server JSON body
      // Server sends: { success, data: { token?, user? } } OR { success, data: <user> }
      const res = await authService.getMe();
      const userData = res?.data ?? res;
      if (userData && userData._id) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { checkSession(); }, [checkSession]);

  // Helper: extract user + token from API response
  const extractAuth = (res) => {
    // apiClient already returns response.data
    // Server sends: { success:true, data: { token, user } }
    const data = res?.data ?? res;
    const token = data?.token;
    const user  = data?.user ?? data;
    return { token, user };
  };

  const login = async (email, password) => {
    const res  = await authService.login({ email, password });
    const { token, user: userData } = extractAuth(res);
    if (token) localStorage.setItem("authToken", token);
    setUser(userData);
    setIsAuthenticated(true);
    toast.success(`مرحباً ${userData?.name || ""}!`);
    return res;
  };

  const register = async (data) => {
    const res  = await authService.register(data);
    const { token, user: userData } = extractAuth(res);
    if (token) localStorage.setItem("authToken", token);
    setUser(userData);
    setIsAuthenticated(true);
    toast.success(`أهلاً ${userData?.name || ""}! تم إنشاء حسابك بنجاح 🎉`);
    return res;
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
