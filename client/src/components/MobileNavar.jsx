import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";

const MobileNavbar = ({
  shopData,
  collectionsData,
  fabricData,
  totalItems,
  selectedCurrency,
  currencies,
  handleCurrencyClick,
  handleCurrencySelect,
  showCurrency,
  currencyRef,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Fixed Header with Logo, Menu Button, Search and Cart */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-40 flex items-center justify-between px-4 py-2 shadow-md">
        {/* Menu button on the left */}
        <button
          className="text-black hover:text-[#8b5e3c] transition-colors"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Centered logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/">
            <img
              src="/katan.png"
              alt="KATAN"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right side icons - Search and Cart */}
        <div className="flex items-center space-x-4">
          <Link
            to="/search"
            className="text-black hover:text-[#8b5e3c] transition-colors"
          >
            <FaSearch size={20} />
          </Link>
          <Link
            to="/cart"
            className="text-black hover:text-[#8b5e3c] transition-colors"
          >
            <div className="relative">
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8b5e3c] text-white text-xs font-bold px-1.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden pt-16`}
      >
        <div className="p-5 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <Link to="/">
              <img
                src="/katan.png"
                alt="KATAN"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-[#8b5e3c] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Search Bar for Mobile */}
          <div className="mb-6 border-b border-gray-200 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <FaSearch size={18} />
              </div>
            </div>
          </div>

          {/* Mobile Menu Items with Premium Styling */}
          <div className="space-y-6">
            {/* SHOP */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <Link
                  to="/"
                  className="text-black uppercase tracking-wide text-lg font-bold hover:text-[#8b5e3c] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SHOP
                </Link>
              </div>
              <div className="mt-3 ml-4 space-y-3">
                {shopData.map(
                  (category, idx) =>
                    category.title && (
                      <div key={idx} className="mb-4">
                        <h3 className="font-cardo text-black text-base mb-2 font-medium">
                          {category.title}
                        </h3>
                        <ul className="space-y-2">
                          {category.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={item.link}
                                className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
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
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <Link
                  to="/collections"
                  className="text-black uppercase tracking-wide text-lg font-bold hover:text-[#8b5e3c] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  COLLECTIONS
                </Link>
              </div>
              <div className="mt-3 ml-4 space-y-3">
                {collectionsData.map((category, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-cardo text-black text-base mb-2 font-medium">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.link}
                            className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
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
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <Link
                  to="/fabrics"
                  className="text-black uppercase tracking-wide text-lg font-bold hover:text-[#8b5e3c] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FABRIC
                </Link>
              </div>
              <div className="mt-3 ml-4 space-y-3">
                {fabricData.map(
                  (category, idx) =>
                    category.title && (
                      <div key={idx} className="mb-4">
                        <h3 className="font-cardo text-black text-base mb-2 font-medium">
                          {category.title}
                        </h3>
                        <ul className="space-y-2">
                          {category.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={item.link}
                                className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
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
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <Link
                  to="/about"
                  className="text-black uppercase tracking-wide text-lg font-bold hover:text-[#8b5e3c] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT US
                </Link>
              </div>
              <div className="mt-3 ml-4 space-y-3">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about/story"
                      className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/heritage"
                      className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Heritage
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/craft"
                      className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Craftmanship
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-700 block hover:text-[#8b5e3c] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Currency Selector for Mobile */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-cardo text-black text-base mb-2 font-medium">
                Currency
              </h3>
              <div className="flex flex-wrap gap-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`px-3 py-2 border rounded-md transition-all duration-200 ${
                      selectedCurrency.code === currency.code
                        ? "bg-[#8b5e3c] text-white border-[#8b5e3c]"
                        : "text-black border-gray-300 hover:border-[#8b5e3c] hover:text-[#8b5e3c]"
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

            {/* Contact Info for Mobile */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-cardo text-black text-base mb-2 font-medium">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaEnvelope size={18} className="text-[#8b5e3c]" />
                  <a
                    href="mailto:katanbanarasofficial@gmail.com"
                    className="hover:text-[#8b5e3c] transition-colors"
                  >
                    katanbanarasofficial@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaPhone size={18} className="text-[#8b5e3c]" />
                  <a
                    href="tel:+917860783350"
                    className="hover:text-[#8b5e3c] transition-colors"
                  >
                    +91 7860783350
                  </a>
                </div>
              </div>
            </div>

            {/* Icons Row in Mobile */}
            <div className="flex justify-around py-6 border-b border-gray-200">
              <Link
                to="/login"
                className="flex flex-col items-center text-gray-700 hover:text-[#8b5e3c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser size={22} />
                <span className="text-xs mt-1">Account</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex flex-col items-center text-gray-700 hover:text-[#8b5e3c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHeart size={22} />
                <span className="text-xs mt-1">Wishlist</span>
              </Link>
              <Link
                to="/cart"
                className="flex flex-col items-center text-gray-700 hover:text-[#8b5e3c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="relative">
                  <FaShoppingCart size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#8b5e3c] text-white text-xs font-bold px-1.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1">Cart</span>
              </Link>
            </div>

            {/* Add to Cart Button */}
            <div className="py-4">
              <Link
                to="/cart"
                className="flex items-center justify-center bg-[#8b5e3c] text-white py-3 px-4 rounded-lg w-full hover:bg-[#7a4d2f] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaShoppingCart size={18} className="mr-2" />
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
