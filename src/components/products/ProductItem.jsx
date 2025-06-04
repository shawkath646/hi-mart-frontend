import { motion } from "framer-motion";
import categories from "../../data/categories";
import { FaStar } from "react-icons/fa";

export default function ProductItem({ product }) {
  const category = categories.find((cat) => cat.categoryId == product.category);

  return (
    <motion.article
      key={product.id}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <a href={`/products/${product.id}`} className="block mb-3 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-xl"
        />
        {product.discountPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
            Sale
          </span>
        )}
      </a>

      <a
        href={`/products/${product.id}`}
        className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
      >
        {product.title}
      </a>

      <div className="flex justify-end mb-2 mt-1">
        <a
          href={`/category/${category.categoryId}`}
          className={`${category.color} text-white text-xs px-2 py-0.5 rounded-md font-medium`}
        >
          {category.name}
        </a>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-2">
        {product.description}
      </p>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        Seller:{" "}
        <span className="text-gray-700 dark:text-gray-300">
          {product.sellerName}
        </span>
      </p>

      <div className="flex items-center gap-1 mt-auto">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(product.rating)
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>

      <div className="mt-2">
        {product.discountPrice ? (
          <>
            <span className="text-sm line-through text-gray-400">
              ${product.price}
            </span>
            <span className="ml-2 text-lg font-bold text-green-600 dark:text-green-400">
              ${product.discountPrice}
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
        )}
      </div>
    </motion.article>
  );
}
