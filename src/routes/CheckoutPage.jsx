import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCreditCard,
    FaPaypal,
    FaGoogle,
    FaRegCreditCard
} from 'react-icons/fa';
import {
    SiSamsungpay,
    SiNaver,
    SiKakaotalk
} from 'react-icons/si';
import { RiTruckLine } from 'react-icons/ri';

const CheckoutPage = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const paymentMethods = [
        {
            id: 'credit',
            name: 'Credit/Debit Card',
            icon: <FaCreditCard className="text-blue-500" size={24} />,
            description: 'Pay with Visa, Mastercard, or other cards'
        },
        {
            id: 'google',
            name: 'Google Pay',
            icon: <FaGoogle className="text-red-500" size={24} />,
            description: 'Fast checkout with Google'
        },
        {
            id: 'kakao',
            name: 'KakaoPay',
            icon: <SiKakaotalk className="text-yellow-400" size={24} />,
            description: 'Fast payment with KakaoPay'
        },
        {
            id: 'naver',
            name: 'Naver Pay',
            icon: <SiNaver className="text-green-500" size={24} />,
            description: 'Pay with your Naver account'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: <FaPaypal className="text-blue-700" size={24} />,
            description: 'Pay with your PayPal account'
        },
        {
            id: 'samsung',
            name: 'Samsung Pay',
            icon: <SiSamsungpay className="text-blue-800" size={24} />,
            description: 'Pay with your Samsung device'
        },
        {
            id: 'toss',
            name: 'Toss Pay',
            icon: <FaRegCreditCard className="text-blue-400" size={24} />,
            description: 'Simple payment with Toss'
        }
    ];

    useEffect(() => {

    }, []);

    const handleContinue = () => {
        if (!selectedPayment) return;

        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            // Here you would typically redirect to payment gateway or next step
            alert(`Redirecting to ${selectedPayment} payment...`);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <RiTruckLine className="mr-2 text-lg" />
                            <span>Free shipping on all orders</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold">Select Payment Method</h2>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-10 mt-6">
                        {/* Payment Methods */}
                        <div className="lg:w-2/3 space-y-6">
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ staggerChildren: 0.1 }}
                            >
                                {paymentMethods.map((method) => (
                                    <motion.div
                                        key={method.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-4 border rounded-xl shadow-sm transition-colors duration-200 cursor-pointer ${selectedPayment === method.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                        onClick={() => setSelectedPayment(method.id)}
                                    >
                                        <div className="flex items-center">
                                            <div className="mr-4">{method.icon}</div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{method.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {method.description}
                                                </p>
                                            </div>
                                            <div
                                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === method.id
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                                    }`}
                                            >
                                                {selectedPayment === method.id && (
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                            >
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                        <span>$129.99</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                                        <span className="text-green-500 font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>$129.99</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Continue Button */}
                            <AnimatePresence>
                                {selectedPayment && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button
                                            onClick={handleContinue}
                                            disabled={isProcessing}
                                            className={`w-full py-3 px-4 mt-4 rounded-lg font-semibold transition-colors duration-300 ${isProcessing
                                                ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                                                } text-white`}
                                        >
                                            {isProcessing ? (
                                                <div className="flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                                    ></motion.div>
                                                    Processing...
                                                </div>
                                            ) : (
                                                `Continue with ${paymentMethods.find(m => m.id === selectedPayment)?.name}`
                                            )}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default CheckoutPage;