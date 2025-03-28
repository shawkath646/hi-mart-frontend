import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold">HiMart</h2>
          <p className="mt-2 text-gray-400">Your one-stop destination for all fashion and accessories.</p>
        </div>

        {/* Quick as */}
        <div>
          <h3 className="text-xl font-semibold">Quick as</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/about" className="hover:text-gray-300 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300 transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-gray-300 transition">FAQ</a></li>
            <li><a href="/terms" className="hover:text-gray-300 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold">Stay Connected</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
          </div>
          <h3 className="text-xl font-semibold mt-4">Subscribe</h3>
          <div className="mt-2 flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 w-full text-gray-900 rounded-l-md focus:outline-none"
            />
            <button className="bg-pink-500 px-4 py-2 rounded-r-md hover:bg-pink-600 transition">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} HiMart. All rights reserved.
      </div>
    </footer>
  );
}
