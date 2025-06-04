import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaDollarSign, FaBoxOpen, FaTruck, FaMapMarkerAlt, FaClock, FaUtensils, FaShoppingBag, FaMosque } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const MIN_CHARS = 3;
  const MAX_CHARS = 50;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setSearchText(value);
    }
  };

  const isSearchValid = searchText.length >= MIN_CHARS && searchText.length <= MAX_CHARS;

  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-screen bg-gradient-to-r from-teal-600 via-sky-600 to-blue-600 dark:from-teal-800 dark:via-sky-800 dark:to-blue-800 flex flex-col items-center justify-center text-white dark:text-gray-100 transition-colors duration-300">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg"
        >
          Discover Your Style
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg md:text-2xl text-center px-6"
        >
          Shop the latest fashion trends and accessories now!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-8 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full p-4 pl-12 bg-white/75 dark:bg-gray-800/75 text-gray-900 dark:text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-colors duration-300"
            maxLength={MAX_CHARS}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
          {searchText.length > 0 && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
              {searchText.length}/{MAX_CHARS}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex gap-4"
        >
          <a
            href={`/products/search?q=${encodeURIComponent(searchText)}`}
            className={`px-6 py-3 font-bold text-lg rounded-full shadow-md transition ${
              isSearchValid
                ? 'bg-white dark:bg-gray-100 text-pink-600 dark:text-pink-700 hover:bg-pink-100 dark:hover:bg-pink-200 cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            onClick={(e) => !isSearchValid && e.preventDefault()}
          >
            Search
          </a>
          <a 
            href="/products" 
            className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100 font-bold text-lg rounded-full shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition flex items-center gap-2"
          >
            Explore
            <IoIosArrowForward size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [1, 0.3, 1],
            y: 0
          }}
          transition={{
            opacity: {
              duration: 1,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut"
            },
            y: {
              duration: 1,
              ease: "easeOut"
            }
          }}
          className="absolute bottom-25 text-center text-white dark:text-gray-200 text-sm flex items-center gap-2"
        >
          <p>Swipe Down</p>
          <IoIosArrowDown size={16} />
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="bg-white dark:bg-gray-900 py-40 px-6 md:px-12 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Achievements</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">We take pride in delivering the best shopping experience.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaShoppingCart className="text-5xl text-pink-500 dark:text-pink-400 mb-3" />
              <h3 className="text-2xl font-bold dark:text-white">1,250+</h3>
              <p className="text-gray-600 dark:text-gray-300">Active Orders</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaDollarSign className="text-5xl text-green-500 dark:text-green-400 mb-3" />
              <h3 className="text-2xl font-bold dark:text-white">$500K+</h3>
              <p className="text-gray-600 dark:text-gray-300">Total Sales</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaBoxOpen className="text-5xl text-blue-500 dark:text-blue-400 mb-3" />
              <h3 className="text-2xl font-bold dark:text-white">10,000+</h3>
              <p className="text-gray-600 dark:text-gray-300">Products Delivered</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-40 px-6 md:px-12 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Fast & Affordable Delivery in Seoul
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">We deliver all over Seoul with the best prices and fastest transport.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaTruck className="text-5xl text-blue-500 dark:text-blue-400 mb-3" />
              <h3 className="text-xl font-semibold dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your order within 24 hours.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaMapMarkerAlt className="text-5xl text-red-500 dark:text-red-400 mb-3" />
              <h3 className="text-xl font-semibold dark:text-white">City-wide Coverage</h3>
              <p className="text-gray-600 dark:text-gray-300">We reach every corner of Seoul.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaClock className="text-5xl text-green-500 dark:text-green-400 mb-3" />
              <h3 className="text-xl font-semibold dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">We're always here to help.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Muslim Section */}
      <section className="bg-white dark:bg-gray-900 py-40 px-6 md:px-12 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Exclusive Section for Muslims
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Explore a variety of halal-certified products, Islamic attire, and more.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaUtensils className="text-5xl text-green-500 dark:text-green-400 mb-3" />
              <h3 className="text-xl font-semibold dark:text-white">Halal Food</h3>
              <p className="text-gray-600 dark:text-gray-300">100% authentic and certified halal products.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaShoppingBag className="text-5xl text-blue-500 dark:text-blue-400 mb-3" />
              <h3 className="text-xl font-semibold dark:text-white">Islamic Dress</h3>
              <p className="text-gray-600 dark:text-gray-300">Modest clothing options for men and women.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaMosque className="text-5xl text-purple-500 dark:text-purple-400 mb-3" />
              <h3 className="text-xl font-semibold dark:text-white">Islamic Essentials</h3>
              <p className="text-gray-600 dark:text-gray-300">Prayer mats, Qurans, and more.</p>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <a 
            href="/muslim-mart" 
            className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100 font-bold text-lg rounded-full shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition flex items-center gap-2"
          >
            Visit
            <IoIosArrowForward size={16} />
          </a>
        </div>
      </section>
    </>
  );
}