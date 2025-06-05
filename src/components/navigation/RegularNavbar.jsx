import { useState, useEffect, Fragment } from "react";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import useDarkMode from "@/hooks/useDarkMode";
import { useAuth } from "@/contexts/useAuth";
import { useCart } from "@/contexts/useCart";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBell,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { FiUser, FiMenu, FiLogIn, FiUserPlus, FiLogOut, FiTruck } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { PiGearSix } from "react-icons/pi";


export default function RegularNavbar({ showSearchBox = false }) {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isSticky, setIsSticky] = useState(false);
  const { session } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.location.pathname !== "/" || window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isSticky ? "text-gray-700 dark:text-gray-300" : "text-white dark:text-gray-300";
  const iconColor = isSticky ? "text-gray-700 dark:text-gray-300" : "text-white dark:text-gray-300";
  const hoverColor = isSticky ? "hover:text-blue-600 dark:hover:text-blue-400" : "hover:text-blue-200 dark:hover:text-blue-400";
  const bgColor = isSticky ? "bg-white/80 dark:bg-gray-800/80" : "bg-transparent";
  const shadow = isSticky ? "shadow-md dark:shadow-gray-900" : "";

  // const notifications = [
  //   { id: 1, text: "Your order #12345 has been shipped", time: "2 hours ago", read: false },
  //   { id: 2, text: "New discount available on electronics", time: "1 day ago", read: true },
  //   { id: 3, text: "Your review was helpful to others", time: "3 days ago", read: true }
  // ];

  //const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className={`${bgColor} ${shadow} backdrop-blur-lg fixed top-0 w-full z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isSticky ? "h-16" : "h-18"} flex items-center justify-between`}>
          <div className="flex items-center">
            <a href="/" className={`text-2xl font-bold ${isSticky ? "text-blue-600 dark:text-blue-400" : "text-white dark:text-blue-400"}`}>
              Hi<span className={isSticky ? "text-red-500 dark:text-red-400" : "text-red-400 dark:text-red-300"}>Mart</span>
            </a>
          </div>

          {showSearchBox && (
            <div className="hidden md:flex flex-1 mx-4 lg:mx-8 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className={`w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isSticky
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    : "border-white/30 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-300 placeholder-white/70 dark:placeholder-gray-400 backdrop-blur-sm"
                    }`}
                />
                <button
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isSticky
                    ? "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-white dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400"
                    }`}
                >
                  <FaSearch aria-hidden />
                </button>
              </div>
            </div>
          )}

          <div className="hidden lg:flex items-center space-x-6">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex flex-col items-center ${textColor} ${hoverColor} transition`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <FaSun aria-hidden className={`mb-1 ${iconColor}`} />
              ) : (
                <FaMoon aria-hidden className={`mb-1 ${iconColor}`} />
              )}
              <span className="text-xs">{isDarkMode ? "Light" : "Dark"}</span>
            </button>

            {/* Notification dropdown */}
            {/* {session && (
              <Menu as="div" className="relative">
                <MenuButton className={`flex flex-col items-center ${textColor} ${hoverColor} transition`}>
                  <div className="relative">
                    <FaBell aria-hidden className={`mb-1 ${iconColor}`} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Notifications</span>
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50 divide-y divide-gray-100 dark:divide-gray-700">
                    <div className="px-4 py-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <MenuItem key={notification.id}>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={`flex px-4 py-2 text-sm ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } ${!notification.read ? 'bg-blue-50 dark:bg-gray-700' : ''
                                }`}
                            >
                              <div className="flex-1">
                                <p className="text-gray-700 dark:text-gray-300">{notification.text}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                              )}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                    <div className="py-1 grid grid-cols-2 gap-1">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/notifications"
                            className={`px-4 py-2 text-sm text-center ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } text-blue-600 dark:text-blue-400`}
                          >
                            View all notifications
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/messages"
                            className={`px-4 py-2 text-sm text-center ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } text-blue-600 dark:text-blue-400`}
                          >
                            View all messages
                          </a>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            )} */}

            {/* Cart */}
            <div className="relative">
              <a href="/cart" aria-label="View Cart Items" className={`flex flex-col items-center ${textColor} ${hoverColor} transition`}>
                <FaShoppingCart aria-hidden className={`mb-1 ${iconColor}`} />
                <span className="text-xs">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </div>

            {/* Account dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className={`flex flex-col items-center ${textColor} ${hoverColor} transition`}>
                <FaUser aria-hidden className={`mb-1 ${iconColor}`} />
                <span className="text-xs">Account</span>
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50">
                  {session ? (
                    <>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/profile"
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } transition-colors duration-200`}
                          >
                            <FiUser aria-hidden className="mr-2" /> Profile
                          </a>
                        )}
                      </MenuItem>
                      {session.user.isSeller ? (
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/seller/dashboard"
                              className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200`}
                            >
                              <MdDashboard aria-hidden className="mr-2" /> Dashboard
                            </a>
                          )}
                        </MenuItem>
                      ) : (
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/become-seller"
                              className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200`}
                            >
                              <MdDashboard aria-hidden className="mr-2" /> Become a Seller
                            </a>
                          )}
                        </MenuItem>
                      )}
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            disabled
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 transition-colors duration-200
        ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} disabled:cursor-not-allowed opacity-60`}
                          >
                            <FiTruck aria-hidden className="mr-2" /> Track Orders
                          </button>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ focus }) => (
                          <button
                            disabled
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 transition-colors duration-200
        ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''}
        disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            <PiGearSix aria-hidden className="mr-2" /> Settings
                          </button>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/auth/logout"
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } transition-colors duration-200`}
                          >
                            <FiLogOut aria-hidden className="mr-2" /> Log Out
                          </a>
                        )}
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/auth/signin"
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } transition-colors duration-200`}
                          >
                            <FiLogIn aria-hidden className="mr-2" /> Sign In
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/auth/signup"
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } transition-colors duration-200`}
                          >
                            <FiUserPlus aria-hidden className="mr-2" /> Sign Up
                          </a>
                        )}
                      </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Transition>
            </Menu>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`${iconColor} ${hoverColor} transition`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun aria-hidden size={20} /> : <FaMoon aria-hidden size={20} />}
            </button>

            {/* <a href="/notifications" aria-label="View Notifications" className={`relative ${iconColor} ${hoverColor} transition`}>
              <FaBell aria-hidden size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </a> */}

            {/* Mobile menu */}
            <Menu as="div" className="relative">
              <MenuButton className={`${iconColor} ${hoverColor} transition`}>
                <FiMenu size={24} />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50 divide-y divide-gray-100 dark:divide-gray-700">
                  {showSearchBox && (
                    <div className="px-4 py-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        />
                        <FaSearch aria-hidden className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                  )}

                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="/cart"
                          aria-label="View Cart Items"
                          className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                        >
                          <FaShoppingCart aria-hidden /> <p>Cart</p>
                          {cartCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {cartCount}
                            </span>
                          )}
                        </a>
                      )}
                    </MenuItem>
                    {/* <MenuItem>
                      {({ focus }) => (
                        <a
                          href="/cart"
                          className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                        >
                          <FiTruck /> <p>Track Orders</p>
                        </a>
                      )}
                    </MenuItem> */}
                  </div>

                  <div className="py-1">
                    {session ? (
                      <>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/profile"
                              className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                            >
                              <FiUser /> <p>Profile</p>
                            </a>
                          )}
                        </MenuItem>
                        {session.user.isSeller ? (
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/seller/dashboard"
                                className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                  } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                              >
                                <MdDashboard /> <p>Dashboard</p>
                              </a>
                            )}
                          </MenuItem>
                        ) : (
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/become-seller"
                                className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                  } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                              >
                                <MdDashboard /> <p>Become a Seller</p>
                              </a>
                            )}
                          </MenuItem>
                        )}
                        {/* <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/profile"
                              className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                            >
                              <PiGearSix /> <p>Settings</p>
                            </a>
                          )}
                        </MenuItem> */}
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/signout"
                              className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                            >
                              <FiLogOut /> <p>Sign Out</p>
                            </a>
                          )}
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/auth/signin"
                              className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                            >
                              <FiLogIn /> <p>Sign In</p>
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/auth/signup"
                              className={`flex items-center px-4 py-2 ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } transition-colors duration-200 text-gray-700 dark:text-gray-300 space-x-2`}
                            >
                              <FiUserPlus /> <p>Sign Up</p>
                            </a>
                          )}
                        </MenuItem>
                      </>
                    )}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}