import { motion } from 'framer-motion';

const CartSkeletionAnimation = () => (
    <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900 pt-24"
    >
        <div className="max-w-7xl mx-auto">
            {/* Skeleton for header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
            >
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </motion.div>

            {/* Skeleton for cart items */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart items skeleton */}
                <div className="lg:w-2/3">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                        {/* Table header skeleton */}
                        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="col-span-3 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                            ))}
                        </div>

                        {/* Cart items skeleton */}
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                    {/* Product info skeleton */}
                                    <div className="flex sm:col-span-5 items-center">
                                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md mr-4 animate-pulse"></div>
                                        <div>
                                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                                            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Price skeleton */}
                                    <div className="sm:col-span-2">
                                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
                                    </div>

                                    {/* Quantity skeleton */}
                                    <div className="sm:col-span-3">
                                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto animate-pulse"></div>
                                    </div>

                                    {/* Total skeleton */}
                                    <div className="sm:col-span-2">
                                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded ml-auto animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons skeleton */}
                    <div className="mt-4 flex justify-between">
                        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    </div>
                </div>

                {/* Order summary skeleton */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

                        {/* Summary items skeleton */}
                        <div className="space-y-3 mb-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex justify-between">
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>

                        {/* Promo code skeleton */}
                        <div className="mb-6">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
                            <div className="flex">
                                <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-l-md animate-pulse"></div>
                                <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-r-md animate-pulse"></div>
                            </div>
                        </div>

                        {/* Checkout button skeleton */}
                        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>

                        {/* Terms skeleton */}
                        <div className="mt-4 space-y-2">
                            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Security badges skeleton */}
                    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 animate-pulse"></div>
                                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.main>
);

export default CartSkeletionAnimation;