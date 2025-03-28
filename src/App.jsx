import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaDollarSign, FaBoxOpen, FaTruck, FaMapMarkerAlt, FaClock, FaUtensils, FaShoppingBag, FaMosque } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function App() {

  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-r from-teal-400 via-sky-400 to-blue-400 flex flex-col items-center justify-center text-white">
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
            className="w-full p-4 pl-12 bg-white/75 text-gray-900 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex gap-4"
        >
          <button className="px-6 py-3 bg-white text-pink-600 font-bold text-lg rounded-full shadow-md hover:bg-pink-100 transition">Shop Now</button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold text-lg rounded-full shadow-md hover:bg-gray-700 transition flex items-center gap-2">
            Explore
            <IoIosArrowDown size={16} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-25 text-center text-white text-sm flex items-center gap-2"
        >
          <p>Swipe Down</p>
          <IoIosArrowDown size={16} />
        </motion.div>
      </section>
      <section className="bg-white py-40 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Achievements</h2>
          <p className="text-gray-600 mb-8">We take pride in delivering the best shopping experience.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaShoppingCart className="text-5xl text-pink-500 mb-3" />
              <h3 className="text-2xl font-bold">1,250+</h3>
              <p className="text-gray-600">Active Orders</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaDollarSign className="text-5xl text-green-500 mb-3" />
              <h3 className="text-2xl font-bold">$500K+</h3>
              <p className="text-gray-600">Total Sales</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaBoxOpen className="text-5xl text-blue-500 mb-3" />
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-gray-600">Products Delivered</p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-40 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Fast & Affordable Delivery in Seoul
          </motion.h2>
          <p className="text-gray-600 mb-8">We deliver all over Seoul with the best prices and fastest transport.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaTruck className="text-5xl text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">Get your order within 24 hours.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaMapMarkerAlt className="text-5xl text-red-500 mb-3" />
              <h3 className="text-xl font-semibold">City-wide Coverage</h3>
              <p className="text-gray-600">We reach every corner of Seoul.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaClock className="text-5xl text-green-500 mb-3" />
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-gray-600">We’re always here to help.</p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-white py-40 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Exclusive Section for Muslims
          </motion.h2>
          <p className="text-gray-600 mb-8">Explore a variety of halal-certified products, Islamic attire, and more.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaUtensils className="text-5xl text-green-500 mb-3" />
              <h3 className="text-xl font-semibold">Halal Food</h3>
              <p className="text-gray-600">100% authentic and certified halal products.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaShoppingBag className="text-5xl text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold">Islamic Dress</h3>
              <p className="text-gray-600">Modest clothing options for men and women.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <FaMosque className="text-5xl text-purple-500 mb-3" />
              <h3 className="text-xl font-semibold">Islamic Essentials</h3>
              <p className="text-gray-600">Prayer mats, Qurans, and more.</p>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button className="px-6 py-3 bg-gray-800 text-white font-bold text-lg rounded-full shadow-md hover:bg-gray-700 transition flex items-center gap-2">
            Visit
            <IoIosArrowForward size={16} />
          </button>
        </div>
      </section>
    </>
  );
}