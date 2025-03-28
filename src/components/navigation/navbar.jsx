import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiUser, FiMenu, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";

export default function Navbar() {

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.location.pathname !== "/" || window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav className={`${isSticky ? "bg-sky-600 shadow-md" : ""} text-white fixed top-0 w-full z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isSticky ? "h-14" : "h-16"} flex justify-between items-center`}>
          <div className="text-2xl font-bold">HiMart</div>

          <ul className="hidden lg:flex space-x-6">
            <li>
              <a href="/products" className="hover:text-teal-200">Products</a>
            </li>
            <li>
              <a href="/muslim-mart" className="hover:text-teal-200">Muslim Mart</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-teal-200">Contact</a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <a href="/cart">
              <FaShoppingCart size={22} className="cursor-pointer hover:text-gray-200 transition -mt-1.5" />
            </a>
            <Menu as="menu" className="relative">
              <MenuButton title="Nav user menu" className="focus:outline-none hover:text-gray-200 transition">
                <FiUser size={24} className="cursor-pointer" />
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
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-md py-2">
                  <MenuItem as="a" href="/signin" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition">
                    <FiLogIn /> Sign In
                  </MenuItem>
                  <MenuItem as="a" href="/signup" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition">
                    <FiUserPlus /> Sign Up
                  </MenuItem>
                  <MenuItem as="a" href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition">
                    <FiUser /> Profile
                  </MenuItem>
                  <MenuItem as="a" href="/signout" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition">
                    <FiLogOut /> Sign Out
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>

            <Menu as="menu" className="relative lg:hidden">
              <MenuButton title="Nav user menu" className="focus:outline-none hover:text-gray-200 transition">
                <FiMenu size={24} className="cursor-pointer" />
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
                <MenuItems as="ul" className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-md py-2">
                  <MenuItem as="li">
                    <a href="/products" className="block px-4 py-2 hover:bg-gray-200 transition">Products</a>
                  </MenuItem>
                  <MenuItem as="li">
                    <a href="/muslim-mart" className="block px-4 py-2 hover:bg-gray-200 transition">Muslim Mart</a>
                  </MenuItem>
                  <MenuItem as="li">
                    <a href="/contact" className="block px-4 py-2 hover:bg-gray-200 transition">Contact</a>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
