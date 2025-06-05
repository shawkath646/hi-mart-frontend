import { Fragment } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { useSellerAuth } from '@/contexts/useSellerAuth';
import {
    FiBell,
    FiMessageSquare,
    FiChevronDown
} from 'react-icons/fi';
import { FaRegSmile } from 'react-icons/fa';


export default function DashboardNavbar() {

    const { sellerSession, sellerLoading } = useSellerAuth();

    if (sellerLoading) return;

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-white shadow-sm p-4 z-50">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
                <button aria-label="View Messages" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <FiMessageSquare aria-hidden size={20} />
                </button>

                <Menu as="div" className="relative">
                    <MenuButton aria-label="View Notifications" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
                        <FiBell aria-hidden size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                        <MenuItems className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-md shadow-lg py-1 z-50 focus:outline-none">
                            <div className="px-4 py-2 border-b border-gray-200">
                                <p className="text-sm font-medium text-gray-700">Notifications</p>
                            </div>
                            <MenuItem>
                                {({ focus }) => (
                                    <div className={`px-4 py-3 text-sm text-gray-600 ${focus ? 'bg-gray-100' : ''}`}>
                                        New order received (#ORD-006)
                                    </div>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <div className={`px-4 py-3 text-sm text-gray-600 ${focus ? 'bg-gray-100' : ''}`}>
                                        Product low in stock (Wireless Headphones)
                                    </div>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </Transition>
                </Menu>

                {/* Profile dropdown using Headless UI */}
                <Menu as="div" className="relative">
                    <MenuButton className="flex items-center space-x-2 focus:outline-none">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FaRegSmile aria-hidden size={16} />
                        </div>
                        <span className="text-sm font-medium">{sellerSession.businessName}</span>
                        <FiChevronDown aria-hidden className="text-gray-500" />
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
                        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg py-1 z-50 focus:outline-none">
                            <MenuItem>
                                {({ focus }) => (
                                    <a
                                        href="#"
                                        className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
                                    >
                                        Your Profile
                                    </a>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <a
                                        href="#"
                                        className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
                                    >
                                        Settings
                                    </a>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <a
                                        href="#"
                                        className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
                                    >
                                        Sign out
                                    </a>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </nav>
    )
};
