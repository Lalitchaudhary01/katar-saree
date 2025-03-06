import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.length;
  const navigate = useNavigate();
  const [showCurrency, setShowCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
  });
  const currencyRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  ];

  const handleCurrencyClick = () => {
    setShowCurrency(!showCurrency);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setShowCurrency(false);
  };

  // Listen for scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrency(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currencyRef]);

  return (
    <>
      {/* Shipping Info Bar - Only visible when not scrolled */}
      {!scrolled && (
        <div className="w-full bg-[#5d4037] text-white py-2 px-4 flex justify-center items-center z-50 relative">
          <div className="flex items-center">
            <span>
              Free shipping within India | Free international shipping on orders
              over Rs. 25,000
            </span>
            <button className="absolute right-4 text-white">✕</button>
          </div>
        </div>
      )}

      {/* Brand and Icons Bar - Only visible when not scrolled */}
      {!scrolled && (
        <div className="w-full bg-white py-3 px-6 flex justify-between items-center">
          {/* Branding */}
          <div className="text-[#5d4037] font-serif italic">
            Made in Banaras. Made by KATAN.
          </div>

          {/* Right Side Icons */}
          <div className="flex space-x-6 text-gray-600">
            <Link to="/search" className="flex items-center">
              <FaSearch
                className="cursor-pointer hover:text-[#5d4037]"
                size={18}
              />
              <span className="ml-1">SEARCH</span>
            </Link>

            <div className="flex items-center relative" ref={currencyRef}>
              <button
                className="flex items-center"
                onClick={handleCurrencyClick}
              >
                <span className="flex items-center">
                  {selectedCurrency.symbol}
                  <span className="ml-1">▼</span>
                </span>
              </button>

              {showCurrency && (
                <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded p-2 z-50 w-40">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      className="block w-full text-left px-2 py-1.5 hover:bg-gray-100"
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      {currency.symbol} - {currency.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="flex items-center">
              <FaUser
                className="cursor-pointer hover:text-[#5d4037]"
                size={18}
              />
              <span className="ml-1">LOGIN</span>
            </Link>

            <Link to="/wishlist" className="flex items-center">
              <FaHeart
                className="cursor-pointer hover:text-[#5d4037]"
                size={18}
              />
              <span className="ml-1">WISHLIST</span>
            </Link>

            <Link to="/cart" className="flex items-center">
              <div className="relative">
                <FaShoppingCart
                  className="cursor-pointer hover:text-[#5d4037]"
                  size={18}
                />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#c98a5e] text-white text-xs font-bold px-1.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="ml-1">CART</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Navigation - Fixed on scroll */}
      <div
        className={`w-full bg-white border-t border-b border-gray-200 py-4 px-6 
                    ${
                      scrolled
                        ? "fixed top-0 left-0 shadow-md z-50 transition-all duration-300"
                        : ""
                    }`}
      >
        <div className="flex justify-between items-center">
          {/* Left Navigation */}
          <div className="flex space-x-6 text-gray-700 uppercase text-sm font-medium">
            <div className="relative group">
              <Link to="/" className="hover:text-[#5d4037] flex items-center">
                Home <span className="ml-1">▼</span>
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-48 z-50">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                  Homepage
                </Link>
                <Link
                  to="/featured"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Featured Products
                </Link>
                <Link
                  to="/new-arrivals"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  New Arrivals
                </Link>
              </div>
            </div>

            <div className="relative group">
              <Link
                to="/collections"
                className="hover:text-[#5d4037] flex items-center"
              >
                COLLECTIONS <span className="ml-1">▼</span>
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-48 z-50">
                <Link
                  to="/collections/wedding"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Wedding Collection
                </Link>
                <Link
                  to="/collections/festive"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Festive Collection
                </Link>
                <Link
                  to="/collections/casual"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Casual Collection
                </Link>
              </div>
            </div>

            <div className="relative group">
              <Link
                to="/campaigns"
                className="hover:text-[#5d4037] flex items-center"
              >
                CAMPAIGNS <span className="ml-1">▼</span>
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-48 z-50">
                <Link
                  to="/campaigns/summer"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Summer Campaign
                </Link>
                <Link
                  to="/campaigns/diwali"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Diwali Special
                </Link>
                <Link
                  to="/campaigns/sale"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sale Campaign
                </Link>
              </div>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex items-center">
            <Link to="/" className="hover:text-[#c98a5e]">
              <img
                src="/KatanBanarasp.png"
                alt="KATAN Logo"
                className="h-14 object-contain"
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex space-x-6 text-gray-700 uppercase text-sm font-medium">
            {/* Show these menu items when not scrolled */}
            {!scrolled ? (
              <>
                <div className="relative group">
                  <Link
                    to="/craft"
                    className="hover:text-[#5d4037] flex items-center"
                  >
                    CRAFT <span className="ml-1">▼</span>
                  </Link>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-48 z-50">
                    <Link
                      to="/craft/weaving"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Weaving Techniques
                    </Link>
                    <Link
                      to="/craft/materials"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Materials
                    </Link>
                    <Link
                      to="/craft/artisans"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Our Artisans
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <Link
                    to="/stories"
                    className="hover:text-[#5d4037] flex items-center"
                  >
                    STORIES <span className="ml-1">▼</span>
                  </Link>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-48 z-50">
                    <Link
                      to="/stories/heritage"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Heritage
                    </Link>
                    <Link
                      to="/stories/artisans"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Artisan Stories
                    </Link>
                    <Link
                      to="/stories/blog"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Blog
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <Link
                    to="/about"
                    className="hover:text-[#5d4037] flex items-center"
                  >
                    ABOUT US <span className="ml-1">▼</span>
                  </Link>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-48 z-50">
                    <Link
                      to="/about/history"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Our History
                    </Link>
                    <Link
                      to="/about/mission"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Mission & Values
                    </Link>
                    <Link
                      to="/about/team"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Our Team
                    </Link>
                    <Link
                      to="/about/contact"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              // Show icons when scrolled
              <div className="flex space-x-6 text-gray-600">
                <Link to="/search" className="flex items-center">
                  <FaSearch
                    className="cursor-pointer hover:text-[#5d4037]"
                    size={18}
                  />
                </Link>

                <div className="flex items-center relative" ref={currencyRef}>
                  <button
                    className="flex items-center"
                    onClick={handleCurrencyClick}
                  >
                    <span className="flex items-center">
                      {selectedCurrency.symbol}
                      <span className="ml-1">▼</span>
                    </span>
                  </button>

                  {showCurrency && (
                    <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded p-2 z-50 w-40">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          className="block w-full text-left px-2 py-1.5 hover:bg-gray-100"
                          onClick={() => handleCurrencySelect(currency)}
                        >
                          {currency.symbol} - {currency.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/login" className="flex items-center">
                  <FaUser
                    className="cursor-pointer hover:text-[#5d4037]"
                    size={18}
                  />
                </Link>

                <Link to="/wishlist" className="flex items-center">
                  <FaHeart
                    className="cursor-pointer hover:text-[#5d4037]"
                    size={18}
                  />
                </Link>

                <Link to="/cart" className="flex items-center">
                  <div className="relative">
                    <FaShoppingCart
                      className="cursor-pointer hover:text-[#5d4037]"
                      size={18}
                    />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#c98a5e] text-white text-xs font-bold px-1.5 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add a spacer div when navbar is fixed to prevent content jump */}
      {scrolled && <div className="h-24"></div>}
    </>
  );
};

export default Navbar;
