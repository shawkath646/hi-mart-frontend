import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCart } from "./useCart";


const AuthContext = createContext();

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [hasInitialSyncCompleted, setHasInitialSyncCompleted] = useState(false);

  const navigate = useNavigate();
  const cart = useCart();

  const fetchSession = useCallback(async (shouldSyncCart = false) => {
    try {
      const res = await api.get("/auth/session");
      const wasLoggedOut = !session;
      setSession(res.data);
      
      // Only sync guest cart when user actually logs in (session changes from null to user)
      // AND we haven't already done the initial sync
      if (wasLoggedOut && res.data && shouldSyncCart && cart?.syncGuestCart && !hasInitialSyncCompleted) {
        await cart.syncGuestCart();
        setHasInitialSyncCompleted(true);
      }
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  }, [session, cart, hasInitialSyncCompleted]);

  useEffect(() => {
    if (isFirstLoad) {
      fetchSession(false); // Don't sync cart on page refresh, only on actual login
    }
    const interval = setInterval(() => fetchSession(false), 60000);
    return () => clearInterval(interval);
  }, [fetchSession, isFirstLoad]);

  const logout = useCallback(async ({ redirect } = {}) => {
    const response = await api.post("/auth/logout");
    setSession(null);
    setHasInitialSyncCompleted(false); // Reset sync flag for next login
    
    // Clear guest cart on logout
    if (cart?.clearGuestCart) {
      cart.clearGuestCart();
    }
    
    // Clear navigation history by replacing current entry
    navigate(redirect || "/", { replace: true });
    return response;
  }, [navigate, cart]);

  const refreshSessionWithSync = useCallback(async () => {
    await fetchSession(true);
  }, [fetchSession]);

  const authContextValue = useMemo(() => ({
    session,
    loading,
    logout,
    fetchSession,
    refreshSessionWithSync,
  }), [session, loading, logout, fetchSession, refreshSessionWithSync]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
