import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
    withCredentials: true,
});

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchCartCount = useCallback(async () => {
        try {
            const response = await api.get("/cart/count");
            setCartCount(response.data.count);
        } catch (error) {
            const status = error?.response?.status;
            const errorMessage = error?.response?.data?.error || error.message || "Failed to fetch cart count";

            if (status === 401) {
                try {
                    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
                    if (Array.isArray(guestCart)) {
                        setCartCount(guestCart.length);
                    } else {
                        setCartCount(0);
                        localStorage.setItem("guest_cart", JSON.stringify([]));
                    }
                } catch {
                    setCartCount(0);
                    localStorage.setItem("guest_cart", JSON.stringify([]));
                }
            }
        }
    }, []);

    const syncGuestCart = useCallback(async () => {
        if (isSyncing) return { success: false, message: "Sync already in progress" };
        
        setIsSyncing(true);
        try {
            const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
            
            if (!Array.isArray(guestCart) || guestCart.length === 0) {
                setIsSyncing(false);
                return { success: true, message: "No items to sync" };
            }

            const response = await api.post("/cart/sync", { guestCart });
            
            // Clear guest cart after successful sync
            localStorage.setItem("guest_cart", JSON.stringify([]));
            
            // Refresh cart count
            await fetchCartCount();
            
            const { synced, errors } = response.data;
            
            if (synced > 0) {
                toast.success(`${synced} item${synced > 1 ? 's' : ''} synced to your cart!`);
            }
            
            if (errors > 0) {
                toast.warning(`${errors} item${errors > 1 ? 's' : ''} could not be synced`);
            }
            
            setIsSyncing(false);
            return { success: true, synced, errors };
        } catch (error) {
            const status = error?.response?.status;
            const errorMessage = error?.response?.data?.error || error.message || "Failed to sync cart";
            
            // Don't log expected auth errors to console
            if (status !== 401 && status !== 403) {
                console.error("Cart sync error:", errorMessage);
            }
            
            setIsSyncing(false);
            return { success: false, message: errorMessage };
        }
    }, [isSyncing, fetchCartCount]);

    const clearGuestCart = useCallback(() => {
        localStorage.setItem("guest_cart", JSON.stringify([]));
        setCartCount(0);
    }, []);

    useEffect(() => {
        fetchCartCount();
    }, [fetchCartCount]);

    return (
        <CartContext.Provider value={{ 
            cartCount, 
            fetchCartCount, 
            syncGuestCart,
            clearGuestCart,
            isSyncing 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
