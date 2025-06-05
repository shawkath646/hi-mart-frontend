import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PriceInput from "../../../../components/ui/PriceInput";
import FileUploader from "../../../../components/ui/FileUploader";
import { staggerContainer, fadeIn } from "../../../../libs/motion";
import categories from "../../../../data/categories";
import { FaPlus, FaTag } from "react-icons/fa";


const PRICE_VALIDATION = {
  required: "Price is required",
  min: {
    value: 0.01,
    message: "Price must be at least $0.01"
  },
  max: {
    value: 999999.99,
    message: "Price must be less than $1,000,000"
  }
};


export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm();

  const navigate = useNavigate();

  const price = watch("price");
  const discountPrice = watch("discountPrice");

  const maxDiscount = useMemo(() => {
    const parsedPrice = parseFloat(price);
    return !isNaN(parsedPrice) ? parsedPrice - 0.01 : 999999.98;
  }, [price]);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "/product",
        data,
        {
          baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
          withCredentials: true
        }
      );

      reset();
      return navigate("/seller/inventory", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Failed to create product. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6 md:px-10 xl:px-24 transition-colors duration-300"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-screen-xl"
      >

        <motion.div
          variants={fadeIn('up', 'tween', 0.1, 0.5)}
          className="text-center mb-14 mt-8"
        >
          <div className="flex items-center justify-center mb-2 gap-4">
            <FaPlus aria-hidden className="text-blue-500 dark:text-blue-400 text-4xl" />
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Add New Product
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Fill in the details below to list your product in our marketplace
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
              Product Title *
            </label>
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "Product title is required",
                minLength: {
                  value: 5,
                  message: "Title should be at least 5 characters"
                },
                maxLength: {
                  value: 120,
                  message: "Title should not exceed 120 characters"
                }
              })}
              className={`w-full px-3 py-2.5 rounded-lg text-sm border ${errors.title ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
              placeholder="Enter product title (5-120 characters)"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Brand Name */}
          <div>
            <label htmlFor="brandName" className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
              Brand Name / Manufacturer *
            </label>
            <input
              id="brandName"
              type="text"
              {...register("brandName", {
                required: "Brand name is required",
                minLength: {
                  value: 2,
                  message: "Brand name should be at least 2 characters"
                },
                maxLength: {
                  value: 50,
                  message: "Brand name should not exceed 50 characters"
                }
              })}
              className={`w-full px-3 py-2.5 rounded-lg text-sm border ${errors.brandName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
              placeholder="Enter brand or manufacturer name"
            />
            {errors.brandName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.brandName.message}
              </p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
              Product Description *
            </label>
            <textarea
              id="description"
              rows={5}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Description should be at least 50 characters"
                },
                maxLength: {
                  value: 2000,
                  message: "Description should not exceed 2000 characters"
                }
              })}
              className={`w-full px-3 py-2.5 rounded-lg text-sm border ${errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
              placeholder="Describe your product in detail (50-2000 characters)..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div className="space-y-8">
              {/* Image Upload */}
              {/* Image Upload */}
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                  Product Images * (Max 5MB each)
                </label>
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    required: "At least one product image is required",
                  }}
                  render={({ field }) => (
                    <FileUploader
                      label=""
                      accept={{
                        "image/jpeg": [],
                        "image/png": [],
                        "image/webp": []
                      }}
                      onChange={(base64) => field.onChange(base64)}
                      value={field.value}
                    />
                  )}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Keywords */}
              <Controller
                name="keywords"
                control={control}
                defaultValue={[]}
                rules={{
                  validate: (value) => value.length <= 10 || "Maximum 10 keywords allowed",
                }}
                render={({ field }) => {
                  const { value, onChange } = field;
                  const [input, setInput] = useState("");

                  const addKeyword = () => {
                    const trimmed = input.trim();
                    if (!trimmed || value.includes(trimmed) || trimmed.length > 20 || value.length >= 10) return;
                    onChange([...value, trimmed]);
                    setInput("");
                  };

                  const removeKeyword = (index) => {
                    const updated = value.filter((_, i) => i !== index);
                    onChange(updated);
                  };

                  return (
                    <div>
                      <label htmlFor="keywords" className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                        Keywords (Tags) {value.length > 0 && `(${value.length}/10)`}
                      </label>

                      <div className="flex">
                        <input
                          id="keywords"
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                          maxLength={20}
                          placeholder="Add keywords (max 20 chars each, max 10 tags)"
                          className="flex-1 px-3 py-2.5 rounded-l-lg text-sm border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={addKeyword}
                          disabled={value.length >= 10}
                          aria-label="Add keyword"
                          className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-r-lg transition-colors disabled:opacity-50"
                        >
                          <FaPlus aria-hidden />
                        </button>
                      </div>

                      {errors.keywords && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.keywords.message}</p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-2">
                        {value.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          >
                            <FaTag aria-hidden className="mr-1" size={10} />
                            {keyword}
                            <button
                              type="button"
                              onClick={() => removeKeyword(index)}
                              className="ml-1 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
            </div>

            {/* Price and Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Regular Price */}
              <PriceInput
                id="price"
                label="Price *"
                register={register}
                error={errors.price}
                validation={PRICE_VALIDATION}
              />

              {/* Discount Price */}
              <PriceInput
                id="discountPrice"
                label="Discount Price"
                register={register}
                error={errors.discountPrice}
                disabled={!price}
                validation={{
                  validate: (value) => {
                    if (value && parseFloat(value) >= parseFloat(price)) {
                      return "Discount price must be less than regular price";
                    }
                    return true;
                  },
                  min: {
                    value: 0.01,
                    message: "Discount must be at least $0.01"
                  },
                  max: {
                    value: maxDiscount,
                    message: `Discount must be less than $${price}`
                  }
                }}
              />

              {price && discountPrice && (
                <p className="col-span-1 md:col-span-2 mt-1 text-sm text-green-600 dark:text-green-400">
                  {Math.round((1 - parseFloat(discountPrice) / parseFloat(price)) * 100)}% discount
                </p>
              )}

              {/* Category */}
              <div>
                <label htmlFor="category" className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                  Category *
                </label>
                <select
                  id="category"
                  defaultValue="" // Use empty string as default
                  {...register("category", {
                    required: "Category is required",
                    validate: (value) => value !== "" || "Category is required",
                  })}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm border ${errors.category ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                >
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Stock Quantity */}
              <div>
                <label htmlFor="stock" className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  max="999999"
                  {...register("stock", {
                    required: "Stock quantity is required",
                    min: {
                      value: 0,
                      message: "Stock cannot be negative"
                    },
                    max: {
                      value: 999999,
                      message: "Stock cannot exceed 999,999"
                    }
                  })}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm border ${errors.stock ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                  placeholder="Enter available quantity (0-999,999)"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <motion.div
            variants={fadeIn('up', 'tween', 1, 0.5)}
            className="flex flex-col sm:flex-row justify-end gap-5 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={reset}
              className="px-6 py-2.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 shadow-sm"
            >
              Reset Form
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${isSubmitting ? 'opacity-80' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Add Product'
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.main>
  );
}