import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import { IoIosArrowForward } from "react-icons/io";

function ProductSkeleton() {
  return (
    <div className="snap-start flex-shrink-0 w-64 animate-pulse bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    </div>
  );
}

export default function ProductContainer({ label, Icon, fetchUrl }) {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(fetchUrl, {
        baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
      });
      setProducts(response.data);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.error || error.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderedProducts = useMemo(() => {
    return products.map((product) => (
      <div key={product.id} className="snap-start flex-shrink-0 w-64">
        <ProductItem product={product} />
      </div>
    ));
  }, [products]);

  return (
    <section className="my-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          {label}
        </h2>
        <a
          href="/products/query"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          Show more <IoIosArrowForward className="w-4 h-4" />
        </a>
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 px-4 mb-2">Error: {error}</p>
      )}

      <div className="flex gap-4 px-4 pb-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        {isLoading ? (
          Array.from({ length: 5 }, (_, i) => <ProductSkeleton key={i} />)
        ) : products.length === 0 ? (
          <div className="w-full text-center p-6 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-inner">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              No products found in this section.
            </p>
          </div>
        ) : (
          renderedProducts
        )}
      </div>
    </section>
  );
}
