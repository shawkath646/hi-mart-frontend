import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "framer-motion";
import { FiShoppingBag, FiGlobe, FiUsers, FiCode, FiAward, FiArrowRight } from 'react-icons/fi';


const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | HiMart</title>
      </Helmet>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto mt-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About HiMart</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are HiMart international shopping platform starting our business from 2025,
              for shopping from anywhere in the world.
            </p>
          </motion.div>

          {/* Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  HiMart was founded in 2025 with a vision to create a seamless international
                  shopping experience. We connect buyers and sellers across borders, offering
                  quality products at competitive prices.
                </p>
                <p>
                  Our platform is designed to empower both consumers and merchants, providing
                  tools and services that make global commerce accessible to everyone.
                </p>
                <p>
                  With a team of passionate developers and e-commerce experts, we're building
                  the future of online shopping.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: <FiGlobe aria-hidden size={32} />, title: "Global Reach", desc: "Serving customers worldwide" },
                { icon: <FiShoppingBag aria-hidden size={32} />, title: "100K+ Products", desc: "Wide variety of categories" },
                { icon: <FiUsers aria-hidden size={32} />, title: "10K+ Sellers", desc: "Growing merchant community" },
                { icon: <FiAward aria-hidden size={32} />, title: "Quality Assurance", desc: "Verified products & sellers" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-md dark:shadow-gray-700 text-center transition-colors duration-300"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">{item.icon}</div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Credits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Developer Credit */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col items-start"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Developed by</p>
                  <motion.a
                    href="https://shawkath646.pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 group"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Shawkat Hossain Maruf
                    </h3>
                    <FiArrowRight className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" size={24} />
                  </motion.a>
                </motion.div>

                {/* Powered By */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col items-start lg:items-end"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Powered by</p>
                  <motion.a
                    href="https://cloudburstlab.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <motion.img
                      src="https://cloudburstlab.vercel.app/api/branding/logo?variant=transparent"
                      alt="Cloudburst Lab"
                      className="h-8 w-8 object-contain"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="text-left">
                      <p className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Cloudburst Lab
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Innovation in Technology
                      </p>
                    </div>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default AboutUsPage;