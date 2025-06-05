import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "framer-motion";
import ProductContainer from "./ProductContainer";
import {
  FaFire,
  FaStar,
  FaShoppingBasket,
  FaListUl,
  FaTshirt,
  FaFemale,
  FaMobileAlt,
  FaLaptop,
  FaUtensils,
  FaCouch,
  FaPaintBrush,
  FaSpa
} from 'react-icons/fa';
import samsungLogo from '@/assets/pngwing.com.png';
import sonyLogo from '@/assets/pngwing.com (1).png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const categories = [
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: "128 Products",
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: "96 Products",
  },
  {
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: "75 Products",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: "64 Products",
  },
  {
    name: "Food & Grocery",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    count: "112 Products",
  },
  {
    name: "Health",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    count: "58 Products",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: "82 Products",
  },
  {
    name: "Toys",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: "47 Products",
  }
];

const subcategories = [
  { icon: <FaTshirt aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Men's Clothing" },
  { icon: <FaFemale aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Women's Clothing" },
  { icon: <FaMobileAlt aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Smartphones" },
  { icon: <FaLaptop aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Laptops" },
  { icon: <FaUtensils aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Kitchenware" },
  { icon: <FaCouch aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Furniture" },
  { icon: <FaPaintBrush aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Makeup" },
  { icon: <FaSpa aria-hidden className="text-blue-600 dark:text-blue-400" />, name: "Skincare" }
];

const brands = [
  { logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple" },
  { logo: "https://www.gstatic.com/marketing-cms/assets/images/c5/3a/200414104c669203c62270f7884f/google-wordmarks-2x.webp=n-w200-h64-fcrop64=1,00000000ffffffff-rw", alt: "Google" },
  { logo: samsungLogo, alt: "Samsung" },
  { logo: sonyLogo, alt: "Sony" },
  { logo: "https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/001-nike-logos-swoosh-black.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjE5MjB9fX0%3D&s=4617fc4ca48a0336d90d25001a63e65147c95885bad727aa1b5473cf672dc459", alt: "Nike" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", alt: "Adidas" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/450px-Dell_Logo.svg.png", alt: "Dell" }
];

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Explore Products | HiMart</title>
      </Helmet>
      <motion.main
        initial="hidden"
        animate="show"
        className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300"
      >
        <div className="container mx-auto p-6 pt-[75px]">
          {/* Muslim Mart Promo Section */}
          <motion.section
            className="mb-12 transition-colors duration-300"
            variants={containerVariants}
          >
            <motion.div
              className="p-6 md:p-8"
              variants={itemVariants}
            >
              <motion.div
                className="flex flex-col md:flex-row items-center justify-between gap-6"
                variants={containerVariants}
              >
                <motion.div
                  className="md:w-1/2"
                  variants={itemVariants}
                >
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4 transition-colors duration-300"
                    variants={itemVariants}
                  >
                    Discover Muslim Mart
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300"
                    variants={itemVariants}
                  >
                    Explore our exclusive collection of Islamic products, halal food, and prayer essentials tailored for the Muslim community.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="md:w-1/2 flex items-center justify-center"
                  variants={itemVariants}
                >
                  <motion.a
                    href="/muslim-mart"
                    className="inline-flex items-center text-sm font-medium text-black dark:text-white border border-black dark:border-white px-4 py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                    whileHover={{ x: 3 }}
                  >
                    Visit →
                  </motion.a>
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.section>

          {/* Product Sections */}
          <motion.div variants={containerVariants}>
            {/* Trending Products */}
            <motion.div variants={itemVariants}>
              <ProductContainer
                Icon={FaFire}
                label="Trending"
                fetchUrl="/products/trending?limit=10"
              />
            </motion.div>

            {/* Other Product Sections */}
            <motion.div variants={itemVariants}>
              <ProductContainer
                Icon={FaStar}
                label="Latest"
                fetchUrl="/products/latest?limit=10"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ProductContainer
                Icon={FaFire}
                label="Discounts"
                fetchUrl="/products/discounts?limit=10"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ProductContainer
                Icon={FaStar}
                label="Your Choices"
                fetchUrl="/products/user-choices?limit=10"
              />
            </motion.div>
          </motion.div>
        </div>
        <section className="bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 py-16 text-center pt-28 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Browse Our Categories</h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
              Discover products organized by category for easy shopping
            </p>
          </div>
        </section>

        {/* Main Categories */}
        <section className="py-16 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="relative mb-10 text-center">
              <h2 className="text-3xl font-bold inline-block bg-gray-50 dark:bg-gray-800 px-5 relative z-10 dark:text-white transition-colors duration-300">
                Shop by Category
              </h2>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700 z-0"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-gray-700 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{category.name}</h3>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">{category.count}</div>
                    <a
                      href={`/categories/${category.name.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`}
                      className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300"
                    >
                      View All
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="py-10 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">Popular Subcategories</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-4 rounded shadow-sm hover:shadow-md dark:hover:shadow-gray-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <a
                    href={`/categories/${subcategory.name.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`}
                    className="flex items-center"
                  >
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                      {subcategory.icon}
                    </div>
                    <div className="font-medium dark:text-white">{subcategory.name}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="relative mb-10 text-center">
              <h2 className="text-3xl font-bold inline-block bg-gray-50 dark:bg-gray-800 px-5 relative z-10 dark:text-white transition-colors duration-300">
                Featured Brands
              </h2>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700 z-0"></div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-5 w-[170px] rounded shadow-sm hover:shadow-md dark:hover:shadow-gray-600 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center h-24"
                >
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="max-w-full max-h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
}