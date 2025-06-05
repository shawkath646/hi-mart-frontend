import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterest,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock
} from 'react-icons/fa';

const RegularFooter = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white pt-16 pb-6 shadow-inner border-t border-gray-300 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              <span className="text-red-500 dark:text-red-400">Hi</span>
              <span className="text-blue-500 dark:text-blue-400">Mart</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              Your one-stop shop for all your needs. Quality products at affordable prices with excellent
              customer service.
            </p>
            <div className="social-links flex gap-4">
              {[
                <FaFacebookF aria-hidden />,
                <FaTwitter aria-hidden />,
                <FaInstagram aria-hidden />,
                <FaPinterest aria-hidden />
              ].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 text-gray-700 dark:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#" },
                { label: "About Us", href: "/about-us" },
                { label: "Products", href: "#" },
                { label: "Special Offers", href: "#" },
                { label: "Contact Us", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:pl-2 transition-all duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                "My Account",
                "Order Tracking",
                "Wishlist",
                "Shipping Policy",
                "Returns & Refunds"
              ].map((text) => (
                <li key={text}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:pl-2 transition-all duration-300">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold mb-5 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt aria-hidden className="mt-1 text-blue-500" />
                <span>123 Main St, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone aria-hidden className="text-blue-500" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope aria-hidden className="text-blue-500" />
                <span>info@HiMart.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaClock aria-hidden className="text-blue-500" />
                <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom pt-6 border-t border-gray-300 dark:border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; 2025 HiMart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default RegularFooter;
