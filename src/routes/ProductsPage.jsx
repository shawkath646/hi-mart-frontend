import { useState } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import ProductContainer from "../components/products/ProductContainer";
import ProductItem from "../components/products/ProductItem";
import categories from "../data/categories";
import { FaFire, FaStar, FaShoppingBasket, FaListUl } from "react-icons/fa";

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

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
};

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") || "all";
  const [displayCount, setDisplayCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  return (
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
                className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
              >
                {/* Current Muslim Mart Button */}
                <motion.a
                  href="/muslim-mart"
                  className="p-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 rounded-lg hover:opacity-90 transition-all duration-300 flex flex-col items-center justify-center text-center text-white"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <FaShoppingBasket className="text-3xl mb-3" />
                  <h3 className="font-semibold text-lg">Current Muslim Mart</h3>
                  <p className="text-sm opacity-90 mt-1">Explore our featured collection</p>
                </motion.a>

                {/* View Categories Button */}
                <motion.a
                  href="/categories"
                  className="p-6 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 rounded-lg hover:opacity-90 transition-all duration-300 flex flex-col items-center justify-center text-center text-white"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <FaListUl className="text-3xl mb-3" />
                  <h3 className="font-semibold text-lg">View Categories</h3>
                  <p className="text-sm opacity-90 mt-1">Browse products by category</p>
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

        {/* All Products Section */}
        {/* <motion.section
          className="mt-12"
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            variants={itemVariants}
          >
            {categoryId === "all" ? "All Products" : `Products in ${categories.find(c => c.categoryId == categoryId)?.name}`}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.1 }}
              >
                <ProductItem product={product} />
              </motion.div>
            ))}
          </motion.div>

          {hasMoreProducts && (
            <motion.div
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={loadMoreProducts}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-all duration-300 disabled:opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block mr-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                      </svg>
                    </motion.span>
                    Loading...
                  </span>
                ) : 'Show More'}
              </motion.button>
            </motion.div>
          )}
        </motion.section> */}
      </div>
    </motion.main>
  );
}