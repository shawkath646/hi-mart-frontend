import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

const SellerAuthContext = createContext(null);

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

export const SellerAuthProvider = ({ children }) => {
  const [sellerSession, setSellerSession] = useState(null);
  const [sellerLoading, setSellerLoading] = useState(true);

  const fetchSellerSession = async () => {
    try {
      const res = await api.get("/seller/session");
      setSellerSession(res.data);
    } catch (error) {
      setSellerSession(null);
    } finally {
      setSellerLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerSession();
    const interval = setInterval(fetchSellerSession, 60000);
    return () => clearInterval(interval);
  }, []);

  const value = useMemo(() => ({
    sellerSession,
    sellerLoading,
    fetchSellerSession,
  }), [sellerSession, sellerLoading]);

  return (
    <SellerAuthContext.Provider value={value}>
      {children}
    </SellerAuthContext.Provider>
  );
};

export const useSellerAuth = () => useContext(SellerAuthContext);
