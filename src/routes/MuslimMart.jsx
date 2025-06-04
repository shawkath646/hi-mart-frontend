import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaUtensils, FaHeart, FaEye, FaExchangeAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";

export default function MuslimMart() {
    const islamicProductCategories = [
        {
            name: "Islamic Clothing",
            description: "Modest wear for men and women including hijabs, thobes, and abayas",
            thumbnail: "https://images.unsplash.com/photo-1623031251275-b5603cfada6b?q=80&w=2105&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Prayer Mats",
            description: "Beautiful and comfortable prayer rugs in various designs",
            thumbnail: "https://images.unsplash.com/photo-1693147119746-381a5c1917fe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Tasbih & Misbaha",
            description: "Quality dhikr beads in various materials and colors",
            thumbnail: "https://plus.unsplash.com/premium_photo-1677959893806-c0fa862f8397?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Halal Cosmetics",
            description: "Beauty products compliant with Islamic principles",
            thumbnail: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Qurans & Books",
            description: "Holy Qurans, Islamic literature, and educational materials",
            thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Eid & Ramadan",
            description: "Special items for Islamic holidays and blessed month",
            thumbnail: "https://plus.unsplash.com/premium_photo-1676208757124-65a7e57e02cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    ];

    return (
        <main className="text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 pt-[60px]">
            {/* Hero Section */}
            <section className="bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center text-white text-center py-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-5 text-white drop-shadow">Your Trusted Source for Islamic Products</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-200">Discover authentic halal products, Islamic clothing, prayer essentials, and connect with your local Muslim community</p>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white dark:bg-gray-800" id="categories">
                <div className="container mx-auto px-5 max-w-6xl">
                    <div className="text-center mb-10 relative">
                        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-5 inline-block bg-white dark:bg-gray-800 px-5 relative z-10">Islamic Product Categories</h2>
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600 z-0"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {islamicProductCategories.map((category, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-600 hover:-translate-y-1">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={category.thumbnail}
                                        alt={category.name}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{category.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                                    <a href="#" className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block">Browse</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Restaurants Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900" id="restaurants">
                <div className="container mx-auto px-5 max-w-6xl">
                    <div className="text-center mb-10 relative">
                        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-5 inline-block bg-gray-50 dark:bg-gray-900 px-5 relative z-10">Halal Restaurants Nearby</h2>
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600 z-0"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                    alt="Sultan's Kitchen"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Sultan's Kitchen</h3>
                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>123 Islamic Street, Green Valley</span>
                                </div>
                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaUtensils className="mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>Middle Eastern, Turkish</span>
                                </div>
                                <div className="flex items-center mb-4 text-orange-500 font-bold">
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStarHalfAlt className="mr-1" />
                                    <span className="text-gray-600 dark:text-gray-300 ml-1">4.5 (128)</span>
                                </div>
                                <a href="#" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block mt-1">View Details</a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                                    alt="Al-Madinah Grill"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Al-Madinah Grill</h3>
                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>456 Crescent Avenue, Downtown</span>
                                </div>
                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaUtensils className="mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>Arabic, Lebanese</span>
                                </div>
                                <div className="flex items-center mb-4 text-orange-500 font-bold">
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaRegStar className="mr-1" />
                                    <span className="text-gray-600 dark:text-gray-300 ml-1">4.0 (95)</span>
                                </div>
                                <a href="#" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block mt-1">View Details</a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80"
                                    alt="Istanbul Kebabs"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Istanbul Kebabs</h3>
                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>789 Ottoman Road, West District</span>
                                </div>
                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaUtensils className="mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>Turkish, Mediterranean</span>
                                </div>
                                <div className="flex items-center mb-4 text-orange-500 font-bold">
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <FaStar className="mr-1" />
                                    <span className="text-gray-600 dark:text-gray-300 ml-1">4.9 (210)</span>
                                </div>
                                <a href="#" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block mt-1">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mosques Section */}
            <section className="py-16 bg-white dark:bg-gray-800" id="mosques">
                <div className="container mx-auto px-5 max-w-6xl">
                    <div className="text-center mb-10 relative">
                        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-5 inline-block bg-white dark:bg-gray-800 px-5 relative z-10">Nearby Mosques (Masjids)</h2>
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600 z-0"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-600 hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1515091943-9d5c0ad475af?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Masjid Al-Rahman"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Masjid Al-Rahman</h3>
                                <div className="mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>321 Peace Street, Central District</span>
                                </div>
                                <div className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaClock className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>Open 24 hours</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-3">Prayer Times Today</h4>
                                    <ul className="grid grid-cols-2 gap-3 text-sm">
                                        <li className="flex justify-between"><span>Fajr</span> <span>5:15 AM</span></li>
                                        <li className="flex justify-between"><span>Dhuhr</span> <span>1:30 PM</span></li>
                                        <li className="flex justify-between"><span>Asr</span> <span>4:45 PM</span></li>
                                        <li className="flex justify-between"><span>Maghrib</span> <span>Sunset</span></li>
                                        <li className="flex justify-between"><span>Isha</span> <span>9:00 PM</span></li>
                                        <li className="flex justify-between"><span>Jumu'ah</span> <span>1:30 PM</span></li>
                                    </ul>
                                </div>
                                <a href="#" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block mt-4">Get Directions</a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-600 hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1564407727371-3eece6c58961?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Islamic Center of Green Valley"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Islamic Center of Green Valley</h3>
                                <div className="mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>555 Crescent Boulevard, Green Valley</span>
                                </div>
                                <div className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaClock className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>Open 24 hours</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-3">Prayer Times Today</h4>
                                    <ul className="grid grid-cols-2 gap-3 text-sm">
                                        <li className="flex justify-between"><span>Fajr</span> <span>5:20 AM</span></li>
                                        <li className="flex justify-between"><span>Dhuhr</span> <span>1:35 PM</span></li>
                                        <li className="flex justify-between"><span>Asr</span> <span>4:50 PM</span></li>
                                        <li className="flex justify-between"><span>Maghrib</span> <span>Sunset</span></li>
                                        <li className="flex justify-between"><span>Isha</span> <span>9:05 PM</span></li>
                                        <li className="flex justify-between"><span>Jumu'ah</span> <span>1:30 PM</span></li>
                                    </ul>
                                </div>
                                <a href="#" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block mt-4">Get Directions</a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-600 hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Masjid Al-Noor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Masjid Al-Noor</h3>
                                <div className="mb-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>888 Faith Avenue, North District</span>
                                </div>
                                <div className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                                    <FaClock className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                    <span>Open 24 hours</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-3">Prayer Times Today</h4>
                                    <ul className="grid grid-cols-2 gap-3 text-sm">
                                        <li className="flex justify-between"><span>Fajr</span> <span>5:10 AM</span></li>
                                        <li className="flex justify-between"><span>Dhuhr</span> <span>1:25 PM</span></li>
                                        <li className="flex justify-between"><span>Asr</span> <span>4:40 PM</span></li>
                                        <li className="flex justify-between"><span>Maghrib</span> <span>Sunset</span></li>
                                        <li className="flex justify-between"><span>Isha</span> <span>8:55 PM</span></li>
                                        <li className="flex justify-between"><span>Jumu'ah</span> <span>1:15 PM</span></li>
                                    </ul>
                                </div>
                                <a href="#" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block mt-4">Get Directions</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900" id="products">
                <div className="container mx-auto px-5 max-w-6xl">
                    <div className="text-center mb-10 relative">
                        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-5 inline-block bg-gray-50 dark:bg-gray-900 px-5 relative z-10">Featured Islamic Products</h2>
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600 z-0"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 relative hover:-translate-y-1">
                            <span className="absolute top-3 left-3 bg-red-500 text-white py-1 px-2 rounded text-xs font-bold z-10">Bestseller</span>
                            <div className="h-60 overflow-hidden relative">
                                <img
                                    src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
                                    alt="Deluxe Quran Set"
                                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                />
                                <div className="absolute bottom-3 right-3 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300">
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-300 flex items-center justify-center" title="Add to Wishlist">
                                        <FaHeart />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-300 flex items-center justify-center" title="Quick View">
                                        <FaEye />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-300 flex items-center justify-center" title="Compare">
                                        <FaExchangeAlt />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Deluxe Quran Set with Case</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">$49.99</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">$59.99</span>
                                </div>
                                <div className="flex items-center text-orange-500 mb-3">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">(128)</span>
                                </div>
                                <button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300">Add to Cart</button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 relative hover:-translate-y-1">
                            <div className="h-60 overflow-hidden relative">
                                <img
                                    src="https://images.unsplash.com/photo-1645067373059-7e557cb79538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Premium Hijab"
                                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                />
                                <div className="absolute bottom-3 right-3 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300">
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-300 flex items-center justify-center" title="Add to Wishlist">
                                        <FaHeart />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-300 flex items-center justify-center" title="Quick View">
                                        <FaEye />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-300 flex items-center justify-center" title="Compare">
                                        <FaExchangeAlt />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Premium Hijab Collection</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">$19.99</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">$24.99</span>
                                </div>
                                <div className="flex items-center text-orange-500 mb-3">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfAlt />
                                    <FaRegStar />
                                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">(95)</span>
                                </div>
                                <button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-300">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
};