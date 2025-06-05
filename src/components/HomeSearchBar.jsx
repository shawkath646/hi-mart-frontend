import { useState, useCallback, useEffect } from "react";
import { Menu, MenuItem } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const HomeSearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const MIN_CHARS = 3;
    const MAX_CHARS = 50;

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get("/products/minisearch", {
                params: { q: query },
                baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
            });

            setSearchResults(response.data);
        } catch (error) {
            const message = error?.response?.data?.error || error.message || "Failed to fetch search results";
            toast.error(message);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            fetchSearchResults(query);
        }, 400),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) {
            setSearchText(value);
            if (value.trim() !== "" && value.length >= MIN_CHARS) {
                debouncedSearch(value.trim().toLowerCase());
            }
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
                    type="text"
                    placeholder="Search for products..."
                    value={searchText}
                    onChange={handleSearchChange}
                    className="w-full p-4 pl-12 bg-white/75 dark:bg-gray-800/75 text-gray-900 dark:text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-colors duration-300"
                    maxLength={MAX_CHARS}
                />
                <FaSearch aria-hidden className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                {searchText.length > 0 && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
                        {searchText.length}/{MAX_CHARS}
                    </div>
                )}

                {/* Dropdown menu */}
                <AnimatePresence>
                    {searchText.length >= MIN_CHARS && searchResults.length > 0 && (
                        <Menu as="div" className="absolute z-10 mt-2 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden"
                            >
                                {searchResults.map((result) => {
                                    // Highlight matching part in title
                                    const regex = new RegExp(`(${searchText})`, "i");
                                    const parts = result.title.split(regex);

                                    return (
                                        <MenuItem key={result.id}>
                                            {({ focus }) => (
                                                <a
                                                    href={`/products/${result.id}`}
                                                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${focus
                                                        ? "bg-gray-100 dark:bg-gray-700"
                                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        } text-gray-800 dark:text-gray-200`}
                                                >
                                                    <img
                                                        src={result.image}
                                                        alt={result.title}
                                                        className="w-10 h-10 object-cover rounded-md"
                                                    />
                                                    <span className="truncate">
                                                        {parts.map((part, idx) =>
                                                            regex.test(part) ? (
                                                                <mark key={idx} className="bg-transparent text-pink-500 font-semibold">
                                                                    {part}
                                                                </mark>
                                                            ) : (
                                                                <span key={idx}>{part}</span>
                                                            )
                                                        )}
                                                    </span>
                                                </a>
                                            )}
                                        </MenuItem>
                                    );
                                })}
                            </motion.div>
                        </Menu>
                    )}
                </AnimatePresence>

            </motion.div >

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
