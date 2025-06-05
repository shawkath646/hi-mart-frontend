import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "framer-motion";
import { BiError } from "react-icons/bi";

const ProductNotFound = () => (
    <>
        <Helmet>
            <title>Product Not Found | HiMart</title>
        </Helmet>
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-6"
            >
                <div className="flex justify-center text-red-500">
                    <BiError aria-hidden size={64} />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold">
                    Product Not Found
                </h1>

                <p className="text-gray-600 dark:text-gray-400">
                    Sorry, we couldn't find any product. Please check the URL or select a product from our catalog.
                </p>

                <a
                    href="/products"
                    className="inline-block mt-4 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                    Browse Products
                </a>
            </motion.div>
        </main>
    </>
);

export default ProductNotFound;