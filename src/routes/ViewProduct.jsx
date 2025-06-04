import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import ViewProductSkeleton from '../components/products/ViewProductSkeletion';
import ProductNotFound from '../components/products/ProductNotFound';
import { useCart } from '../libs/useCartContext';
import categories from '../data/categories';
import { FaStar } from 'react-icons/fa';

const ViewProductPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchCartCount } = useCart();

    const fetchProduct = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/product?id=${id}`, {
                baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                withCredentials: true,
            });

            setProduct(response.data);
        } catch (error) {
            const status = error.response?.status;
            const errorMessage = error.response?.data?.error || error.messages || "Error fetching product";

            if (status !== 404) {
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleQuantityChange = (newQuantity) => {
        if (!product) return;
        if (newQuantity < 1 || newQuantity > product.stock) return;
        setQuantity(newQuantity);
    };

    // Unified conditional rendering block
    if (!id) return <ProductNotFound />;
    if (isLoading) return <ViewProductSkeleton />;
    if (!product) return <ProductNotFound />;


    const handleAddToCart = async () => {
        try {
            await axios.post(
                "/cart",
                { productId: id, quantity },
                {
                    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
                    withCredentials: true,
                }
            );
            toast.success(`${quantity} ${product.title} added to cart!`);
        } catch (error) {
            const status = error.response?.status;
            const errorMessage = error.response?.data?.error || error.message || "Error adding to cart";

            if (status === 401) {
                try {
                    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
                    const existingIndex = guestCart.findIndex(item => item.productId === id);

                    if (existingIndex !== -1) {
                        guestCart[existingIndex].quantity += quantity;
                    } else {
                        guestCart.push({ productId: id, quantity });
                    }

                    localStorage.setItem("guest_cart", JSON.stringify(guestCart));
                    toast.success(`${quantity} ${product.title} saved in guest cart.`);
                } catch (storageError) {
                    toast.error("Failed to save cart locally.");
                }
            } else {
                toast.error(errorMessage);
            }
        } finally {
            await fetchCartCount();
        }
    };


    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Product Images and Info Card */}
                    <div className="lg:w-1/2 space-y-6">
                        <div className="w-full h-[400px] overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-100 dark:bg-gray-800">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-300"
                            />
                        </div>

                        {/* Additional Info */}
                        <div className="rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
                            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Brand</h3>
                                    <p>{product.brandName}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Category</h3>
                                    <p>{categories.find((cat) => cat.categoryId == product.category).name}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Availability</h3>
                                    <p>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Popularity</h3>
                                    <p>{product.totalSold} sold</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 space-y-6">
                        <div className="rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
                            {/* Title */}
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{product.title}</h1>

                            {/* Ratings */}
                            <div className="flex items-center mb-4">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <FaStar
                                        key={rating}
                                        className={`h-5 w-5 ${rating < product.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    {product.rating} ({product.reviewCount} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6 space-x-2">
                                {product.discountPrice ? (
                                    <>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            ${product.discountPrice.toFixed(2)}
                                        </span>
                                        <span className="text-lg line-through text-gray-500 dark:text-gray-400">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm font-semibold px-3 py-1 rounded-full">
                                            {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stock > 10 ? (
                                    <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
                                ) : product.stock > 0 ? (
                                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                                        Only {product.stock} left - hurry!
                                    </span>
                                ) : (
                                    <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                                )}
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">• {product.totalSold} sold</span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-base font-medium mb-2">Description</h2>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>
                            </div>

                            {/* Quantity Selector and Actions */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="flex items-center justify-between mb-6">
                                    {/* Quantity */}
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            className="w-10 h-10 flex items-center justify-center border border-r-0 rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                            disabled={quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <div className="w-12 h-10 flex items-center justify-center border-t border-b">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center border border-l-0 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{product.stock} available</div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        disabled={product.stock < 1}
                                        onClick={handleAddToCart}
                                        className="flex-1 py-3 rounded-lg font-semibold transition text-white bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed"
                                    >
                                        Add to Cart
                                    </button>

                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ViewProductPage;