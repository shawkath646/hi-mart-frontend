import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaArrowLeft, FaTag } from "react-icons/fa";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = useCallback(async () => {
        try {
            const response = await axios.get("/cart", {
                baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                withCredentials: true,
            });
            setCartItems(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

                    // Fetch detailed product info for all guest cart items in parallel
                    const detailedItems = await Promise.all(
                        guestCart.map(async (item) => {
                            try {
                                const res = await axios.get(`/product?id=${item.productId}`, {
                                    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                                });
                                const product = res.data;

                                return {
                                    id: item.productId,
                                    quantity: item.quantity,
                                    title: product.title,
                                    image: product.image,
                                    price: product.discountPrice || product.price,
                                    stock: product.stock,
                                };
                            } catch {
                                // If fetching product info fails, skip that item
                                return null;
                            }
                        })
                    );

                    setCartItems(detailedItems.filter(Boolean));
                } catch (storageError) {
                    console.error("Failed to load guest cart from localStorage", storageError);
                }
                return;
            }

            const errorMessage =
                error.response?.data?.error || error.message || "Failed to fetch cart items";
            toast.error(errorMessage);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await axios.put(
                "/cart",
                { productId: id, quantity: newQuantity },
                {
                    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                    withCredentials: true,
                }
            );

            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            if (error.response?.status === 401) {
                // Update localStorage guest cart quantity
                const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

                const updatedCart = guestCart.map((item) =>
                    item.productId === id ? { ...item, quantity: newQuantity } : item
                );

                localStorage.setItem("guest_cart", JSON.stringify(updatedCart));

                // Refetch detailed data for updated guest cart
                try {
                    const detailedItems = await Promise.all(
                        updatedCart.map(async (item) => {
                            try {
                                const res = await axios.get(`/product?id=${item.productId}`, {
                                    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                                });
                                const product = res.data;

                                return {
                                    id: item.productId,
                                    quantity: item.quantity,
                                    title: product.title,
                                    image: product.image,
                                    price: product.discountPrice || product.price,
                                    stock: product.stock,
                                };
                            } catch {
                                return null;
                            }
                        })
                    );

                    setCartItems(detailedItems.filter(Boolean));
                } catch (fetchError) {
                    console.error("Failed to update guest cart items", fetchError);
                }
                return;
            }

            const errorMessage = error.response?.data?.error || error.message || "Failed to update quantity";
            toast.error(errorMessage);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`/cart/${id}`, {
                baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                withCredentials: true,
            });

            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            if (error.response?.status === 401) {
                // Remove item from localStorage guest cart
                const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

                const updatedCart = guestCart.filter((item) => item.productId !== id);

                localStorage.setItem("guest_cart", JSON.stringify(updatedCart));

                // Refetch detailed data for updated guest cart
                try {
                    const detailedItems = await Promise.all(
                        updatedCart.map(async (item) => {
                            try {
                                const res = await axios.get(`/product?id=${item.productId}`, {
                                    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                                });
                                const product = res.data;

                                return {
                                    id: item.productId,
                                    quantity: item.quantity,
                                    title: product.title,
                                    image: product.image,
                                    price: product.discountPrice || product.price,
                                    stock: product.stock,
                                };
                            } catch {
                                return null;
                            }
                        })
                    );

                    setCartItems(detailedItems.filter(Boolean));
                } catch (fetchError) {
                    console.error("Failed to update guest cart items after removal", fetchError);
                }
                return;
            }

            const errorMessage = error.response?.data?.error || error.message || "Failed to remove item";
            toast.error(errorMessage);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 29.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: {
                duration: 0.3,
            },
        },
    };

    const summaryVariants = {
        hidden: { opacity: 0, x: 50 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900 pt-24"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                    </p>
                </motion.div>

                <AnimatePresence>
                    {cartItems.length === 0 ? (
                        <motion.div
                            key="empty-cart"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="text-center py-12"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                                <p className="mb-6 text-gray-600 dark:text-gray-300">
                                    Looks like you haven't added anything to your cart yet
                                </p>
                                <motion.a
                                    href="/products"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center mx-auto"
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Continue Shopping
                                </motion.a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="cart-with-items"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col lg:flex-row gap-8"
                        >
                            {/* Cart Items */}
                            <motion.div
                                variants={itemVariants}
                                className="lg:w-2/3"
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                                    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="col-span-5">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-3 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    <AnimatePresence>
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="show"
                                                exit="exit"
                                                layout
                                                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                                    {/* Product Info */}
                                                    <div className="flex sm:col-span-5 items-center">
                                                        <motion.div
                                                            whileHover={{ scale: 1.05 }}
                                                            className="relative"
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-600 mr-4"
                                                            />
                                                            {!item.stock && (
                                                                <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tl-md rounded-br-md">
                                                                    Out of Stock
                                                                </span>
                                                            )}
                                                        </motion.div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-800 dark:text-gray-100">
                                                                {item.name}
                                                            </h3>
                                                            <motion.button
                                                                whileHover={{ x: 2 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeItem(item.id)}
                                                                className="flex items-center text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mt-1"
                                                            >
                                                                <FaTrash className="mr-1" />
                                                                Remove
                                                            </motion.button>
                                                        </div>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="sm:col-span-2 text-center text-gray-700 dark:text-gray-300 font-medium">
                                                        ${item.price.toFixed(2)}
                                                        {item.originalPrice && (
                                                            <span className="block text-xs text-gray-500 dark:text-gray-400 line-through">
                                                                ${item.originalPrice.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Quantity Control */}
                                                    <div className="sm:col-span-3 flex justify-center">
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden"
                                                        >
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="px-3 py-1 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition disabled:opacity-50"
                                                            >
                                                                −
                                                            </motion.button>
                                                            <span className="px-4 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                                                {item.quantity}
                                                            </span>
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                disabled={item.quantity >= 10}
                                                                className="px-3 py-1 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition disabled:opacity-50"
                                                            >
                                                                +
                                                            </motion.button>
                                                        </motion.div>
                                                    </div>

                                                    {/* Total */}
                                                    <div className="sm:col-span-2 text-right">
                                                        <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                        {item.originalPrice && (
                                                            <span className="block text-xs text-green-600 dark:text-green-400">
                                                                Saved ${(
                                                                    (item.originalPrice - item.price) *
                                                                    item.quantity
                                                                ).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <motion.a
                                        href="/products"
                                        whileHover={{ x: -3 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center"
                                    >
                                        <FaArrowLeft className="mr-2" />
                                        Continue Shopping
                                    </motion.a>
                                    <motion.button
                                        whileHover={{ x: 3 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setCartItems([])}
                                        className="px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition flex items-center"
                                    >
                                        <FaTrash className="mr-2" />
                                        Clear Cart
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Order Summary */}
                            <motion.div
                                variants={summaryVariants}
                                className="lg:w-1/3"
                            >
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 top-6"
                                >
                                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>
                                                {shipping === 0 ? (
                                                    <span className="text-green-600 dark:text-green-400">Free</span>
                                                ) : (
                                                    `$${shipping.toFixed(2)}`
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax (8%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t dark:border-gray-700 pt-3 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Promo Code */}
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="mb-6"
                                    >
                                        <div className="flex items-center mb-2">
                                            <FaTag className="text-gray-500 dark:text-gray-400 mr-2" />
                                            <h3 className="font-medium">Promo Code</h3>
                                        </div>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                placeholder="Enter promo code"
                                                className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                            />
                                            <motion.button
                                                whileHover={{ backgroundColor: "#1e40af" }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md transition"
                                            >
                                                Apply
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    <motion.a
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        href="/cart/checkout"
                                        className="w-full py-3 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-medium shadow-md"
                                    >
                                        Proceed to Checkout
                                    </motion.a>

                                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                        <p>
                                            By placing your order, you agree to our{" "}
                                            <a
                                                href="#"
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="#"
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Privacy Policy
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Security Badges */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
                                >
                                    <div className="grid grid-cols-3 gap-4">
                                        {["Secure Checkout", "SSL Encryption", "Money Back"].map(
                                            (item, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ y: -3 }}
                                                    className="flex flex-col items-center text-center"
                                                >
                                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                                                        <svg
                                                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        {item}
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.main>
    );
};

export default CartPage;