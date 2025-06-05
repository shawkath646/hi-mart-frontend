import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";


const AuthContext = createContext();

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchSession = useCallback(async () => {
    try {
      const res = await api.get("/auth/session");
      setSession(res.data);
    } catch (error) {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 60000);
    return () => clearInterval(interval);
  }, []);

  const logout = useCallback(async ({ redirect } = {}) => {
    const response = await api.post("/auth/logout");
    setSession(null);
    navigate(redirect || "/");
    return response;
  }, [navigate]);

  const authContextValue = useMemo(() => ({
    session,
    loading,
    logout,
    fetchSession,
  }), [session, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
