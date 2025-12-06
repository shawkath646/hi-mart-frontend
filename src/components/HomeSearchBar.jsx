import { useState, useCallback, useEffect, useRef } from "react";
import { Menu, MenuItem } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const HomeSearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null);

    const MIN_CHARS = 2; // Reduced from 3 to 2 for better UX
    const MAX_CHARS = 50;

    const fetchSearchResults = async (query) => {
        setIsSearching(true);
        try {
            const response = await axios.get("/products/minisearch", {
                params: { q: query },
                baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
            });

            setSearchResults(response.data);
        } catch (error) {
            const message = error?.response?.data?.error || error.message || "Failed to fetch search results";
            toast.error(message);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            fetchSearchResults(query);
        }, 300), // Reduced from 400ms to 300ms for faster response
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) {
            setSearchText(value);
            if (value.trim() !== "" && value.length >= MIN_CHARS) {
                debouncedSearch(value.trim().toLowerCase());
            } else {
                setSearchResults([]);
            }
        }
    };

    const clearSearch = () => {
        setSearchText("");
        setSearchResults([]);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && isSearchValid) {
            window.location.href = `/products/search?q=${encodeURIComponent(searchText)}`;
        } else if (e.key === 'Escape') {
            clearSearch();
        }
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const isSearchValid = searchText.length >= MIN_CHARS && searchText.length <= MAX_CHARS;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative mt-8 w-full max-w-lg"
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="w-full p-4 pl-12 pr-24 bg-white/75 dark:bg-gray-800/75 text-gray-900 dark:text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-colors duration-300"
                    maxLength={MAX_CHARS}
                    autoComplete="off"
                    aria-label="Search products"
                />
                <FaSearch aria-hidden className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {isSearching && (
                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                    )}
                    {searchText.length > 0 && (
                        <>
                            <button
                                onClick={clearSearch}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                aria-label="Clear search"
                            >
                                <FaTimes size={16} />
                            </button>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {searchText.length}/{MAX_CHARS}
                            </span>
                        </>
                    )}
                </div>

                {/* Dropdown menu */}
                <AnimatePresence>
                    {searchText.length >= MIN_CHARS && searchResults.length > 0 && (
                        <Menu as="div" className="absolute z-10 mt-2 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden max-h-96 overflow-y-auto"
                            >
                                {searchResults.slice(0, 8).map((result) => {
                                    // Highlight matching part in title (case-insensitive)
                                    const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
                                    const parts = result.title.split(regex);

                                    return (
                                        <MenuItem key={result.id}>
                                            {({ focus }) => (
                                                <a
                                                    href={`/products/${result.id}`}
                                                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${focus
                                                        ? "bg-pink-50 dark:bg-gray-700"
                                                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                                                        } text-gray-800 dark:text-gray-200`}
                                                >
                                                    <img
                                                        src={result.image}
                                                        alt={result.title}
                                                        className="w-12 h-12 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="truncate font-medium">
                                                            {parts.map((part, idx) =>
                                                                regex.test(part) ? (
                                                                    <mark key={idx} className="bg-yellow-200 dark:bg-yellow-700 text-gray-900 dark:text-white rounded px-0.5">
                                                                        {part}
                                                                    </mark>
                                                                ) : (
                                                                    <span key={idx}>{part}</span>
                                                                )
                                                            )}
                                                        </p>
                                                        {result.discountPrice && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                                <span className="line-through mr-2">${result.price}</span>
                                                                <span className="text-red-500 font-semibold">${result.discountPrice}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <IoIosArrowForward className="text-gray-400" size={16} />
                                                </a>
                                            )}
                                        </MenuItem>
                                    );
                                })}
                                {searchResults.length > 8 && (
                                    <div className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
                                        {searchResults.length - 8} more results. Press Enter to see all.
                                    </div>
                                )}
                            </motion.div>
                        </Menu>
                    )}
                    {searchText.length >= MIN_CHARS && searchResults.length === 0 && !isSearching && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 p-4 text-center"
                        >
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                No products found for "{searchText}"
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-6 flex gap-4"
            >
                <a
                    href={`/products/search?q=${encodeURIComponent(searchText)}`}
                    className={`px-6 py-3 font-bold text-lg rounded-full shadow-md transition ${isSearchValid
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
                    <IoIosArrowForward aria-hidden size={16} />
                </a>
            </motion.div>
        </>
    );
};

export default HomeSearchBar;
