import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = useCallback(async () => {
        try {
            const response = await axios.get("/cart/count", {
                baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                withCredentials: true,
            });

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
                        toast.error("Invalid guest cart format in local storage.");
                    }
                } catch {
                    setCartCount(0);
                    toast.error("Failed to load guest cart from local storage.");
                }
            } else {
                toast.error(errorMessage);
            }
        }
    }, []);

    useEffect(() => {
        fetchCartCount();
    }, [fetchCartCount]);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
