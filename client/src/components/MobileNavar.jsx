import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaEnvelope, FaPhone } from "react-icons/fa";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";

const MobileNavbar = ({
  shopData,
  collectionsData,
  fabricData,
  totalItems,
  selectedCurrency,
  currencies,
  handleCurrencySelect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to detect scrolling for changing header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Fixed Header with Logo, Menu Button, Search and Cart */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3 
        ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"} 
        transition-all duration-300`}
      >
        {/* Menu button with elegant styling */}
        <button
          className="text-black hover:text-[#8b5e3c] transition-all duration-300"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 transform rotate-90"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Centered logo with subtle animation */}
        <div className="flex-1 flex justify-center">
          <Link
            to="/"
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/katan.png"
              alt="KATAN"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right side icons with luxury styling */}
        <div className="flex items-center space-x-5">
          <Link
            to="/search"
            className="text-black hover:text-[#8b5e3c] transition-all duration-300"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </Link>
          <Link
            to="/cart"
            className="text-black hover:text-[#8b5e3c] transition-all duration-300"
            aria-label="Cart"
          >
            <div className="relative">
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8b5e3c] text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Menu with luxury aesthetics */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden overflow-hidden flex flex-col`}
      >
        {/* Header with logo and close button */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/katan.png"
              alt="KATAN"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="text-black hover:text-[#8b5e3c] transition-all duration-300"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable menu content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Search Bar with premium styling */}
          <div className="px-5 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our collection..."
                className="w-full py-2.5 pl-10 pr-4 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5e3c] text-sm"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <FaSearch size={16} />
              </div>
            </div>
          </div>

          {/* Navigation Categories with luxury styling */}
          <div className="px-5 space-y-1">
            {/* SHOP */}
            <div className="py-3 border-b border-gray-100">
              <Link
                to="/"
                className="block text-black uppercase tracking-wider text-base font-semibold hover:text-[#8b5e3c] transition-colors mb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <div className="ml-2 space-y-3">
                {shopData.map(
                  (category, idx) =>
                    category.title && (
                      <div key={idx} className="mb-3">
                        <h3 className="font-cardo text-black text-sm font-medium tracking-wide mb-1.5">
                          {category.title}
                        </h3>
                        <ul className="space-y-1.5">
                          {category.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={item.link}
                                className="text-gray-600 text-sm block hover:text-[#8b5e3c] transition-colors py-1"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name.charAt(0).toUpperCase() +
                                  item.name.slice(1).toLowerCase()}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* COLLECTIONS */}
            <div className="py-3 border-b border-gray-100">
              <Link
                to="/collections"
                className="block text-black uppercase tracking-wider text-base font-semibold hover:text-[#8b5e3c] transition-colors mb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                COLLECTIONS
              </Link>
              <div className="ml-2 space-y-3">
                {collectionsData.map((category, idx) => (
                  <div key={idx} className="mb-3">
                    <h3 className="font-cardo text-black text-sm font-medium tracking-wide mb-1.5">
                      {category.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {category.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.link}
                            className="text-gray-600 text-sm block hover:text-[#8b5e3c] transition-colors py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1).toLowerCase()}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* FABRIC */}
            <div className="py-3 border-b border-gray-100">
              <Link
                to="/fabrics"
                className="block text-black uppercase tracking-wider text-base font-semibold hover:text-[#8b5e3c] transition-colors mb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FABRIC
              </Link>
              <div className="ml-2 space-y-3">
                {fabricData.map(
                  (category, idx) =>
                    category.title && (
                      <div key={idx} className="mb-3">
                        <h3 className="font-cardo text-black text-sm font-medium tracking-wide mb-1.5">
                          {category.title}
                        </h3>
                        <ul className="space-y-1.5">
                          {category.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={item.link}
                                className="text-gray-600 text-sm block hover:text-[#8b5e3c] transition-colors py-1"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name.charAt(0).toUpperCase() +
                                  item.name.slice(1).toLowerCase()}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* ABOUT US */}
            <div className="py-3 border-b border-gray-100">
              <Link
                to="/about"
                className="block text-black uppercase tracking-wider text-base font-semibold hover:text-[#8b5e3c] transition-colors mb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT US
              </Link>
              <div className="ml-2">
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      to="/about/story"
                      className="text-gray-600 text-sm block hover:text-[#8b5e3c] transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/heritage"
                      className="text-gray-600 text-sm block hover:text-[#8b5e3c] transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Heritage
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/craft"
                      className="text-gray-600 text-sm block hover:text-[#8b5e3c] transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Craftsmanship
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Currency Selector with elegant styling */}
            <div className="py-3 border-b border-gray-100">
              <h3 className="font-cardo text-black text-sm font-medium tracking-wide mb-2">
                Select Currency
              </h3>
              <div className="flex flex-wrap gap-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`px-3 py-1.5 text-xs rounded transition-all duration-300 ${
                      selectedCurrency.code === currency.code
                        ? "bg-black text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      handleCurrencySelect(currency);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {currency.symbol} {currency.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info with elegant styling */}
            <div className="py-3 border-b border-gray-100">
              <h3 className="font-cardo text-black text-sm font-medium tracking-wide mb-2">
                Contact Us
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5 text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center">
                    <FaEnvelope size={14} className="text-black" />
                  </div>
                  <a
                    href="mailto:katanbanarasofficial@gmail.com"
                    className="text-sm hover:text-black transition-colors"
                  >
                    katanbanarasofficial@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2.5 text-black">
                  <div className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center">
                    <FaPhone size={14} className="text-black" />
                  </div>
                  <a
                    href="tel:+917860783350"
                    className="text-sm hover:text-[#8b5e3c] transition-colors"
                  >
                    +91 7860783350
                  </a>
                </div>
              </div>
            </div>

            {/* Icons with labels */}
            <div className="flex justify-between py-5">
              <Link
                to="/login"
                className="flex flex-col items-center text-black hover:text-[#8b5e3c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-1">
                  <FiUser size={15} />
                </div>
                <span className="text-xs mt-1 font-medium">Account</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex flex-col items-center text-black hover:text-[#8b5e3c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-1">
                  <FiHeart size={15} />
                </div>
                <span className="text-xs mt-1 font-medium">Wishlist</span>
              </Link>
              <Link
                to="/cart"
                className="flex flex-col items-center text-black  transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-1 relative">
                  <FiShoppingCart size={15} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8b5e3c] text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer with Cart Button */}
        <div className="p-5 border-t border-gray-100">
          <Link
            to="/cart"
            className="flex items-center justify-center bg-black text-white py-3 px-4 rounded-md w-full hover:bg-[#7a4d2f] transition-all duration-300 font-medium shadow-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiShoppingCart size={16} className="mr-2" />
            View Cart
          </Link>
        </div>
      </div>

      {/* Add custom scrollbar style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4c3b0;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8b5e3c;
        }
      `}</style>
    </>
  );
};

export default MobileNavbar;
