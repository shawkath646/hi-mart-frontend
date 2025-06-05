import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiGlobe, FiUsers, FiCode, FiAward } from 'react-icons/fi';
import marufImage from '@/assets/maruf.jpg';
import mahadiImage from '@/assets/mahadi.jpg';
import mahyouImage from '@/assets/mahyou.jpg';
import raisaImage from '@/assets/raisa.jpg';


const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "MARUF SHAWKAT HOSSAIN",
      id: "25013492",
      role: "Full stack developer (4 year experienced)",
      location: "Narsingdi, Bangladesh",
      image: marufImage
    },
    {
      name: "MD. MAHADI HASAN",
      id: "25013422",
      role: "Assistant Developer",
      location: "Faridpur, Bangladesh",
      image: mahadiImage
    },
    {
      name: "MAHYOU SARRA",
      id: "25040026",
      role: "Assistant Developer",
      location: "Lille, Hauts-de-France, France",
      image: mahyouImage
    },
    {
      name: "RAISA LEUZA AFNAN",
      id: "25013403",
      role: "Assistant Developer",
      location: "Cumilla, Bangladesh",
      image: raisaImage
    }
  ];

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

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 text-center">Meet Our Team</h2>
            <div className="w-48 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md dark:shadow-gray-700 overflow-hidden transition-colors duration-300"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ID: {member.id}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {member.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-500/70 dark:bg-blue-600/80 rounded-xl p-8 md:p-12 text-white transition-colors duration-300"
          >
            <div className="max-w-4xl mx-auto text-center">
              <FiCode aria-hidden size={48} className="mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Our Technical Excellence</h2>
              <p className="text-lg mb-6">
                Built with cutting-edge technologies by our skilled development team,
                HiMart offers a robust, secure, and scalable platform for international e-commerce.
              </p>
              <p>
                We're committed to continuous improvement and innovation to deliver the best
                shopping experience for our users worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default AboutUsPage;