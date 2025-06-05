import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title>Unauthorized | HiMart</title>
      </Helmet>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6 transition-colors duration-300">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-gray-900 dark:text-white"
        >
          401
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 mt-2"
        >
          You don't have permission to view this page.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <a href="/">
            <button className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
              Go Back Home
            </button>
          </a>
        </motion.div>
      </main>
    </>
  );
}