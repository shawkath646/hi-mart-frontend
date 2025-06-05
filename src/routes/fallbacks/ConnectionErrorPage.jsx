import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "framer-motion";

export default function ConnectionErrorPage() {
    return (
        <>
            <Helmet>
                <title>Connection Error | HiMart</title>
            </Helmet>
            <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full text-center"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-5xl mb-4"
                    >
                        ❌
                    </motion.div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Failed to connect to backend
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please check your internet connection or try again later.
                    </p>
                </motion.div>
            </main>
        </>
    );
}
