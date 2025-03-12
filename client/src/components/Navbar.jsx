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
import { useCurrency } from "../context/currencyContext"; // Import the currency context
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";

// WhatsApp button component remains unchanged
export const WhatsAppButton = () => {
  const phoneNumber = "+917860783350";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white flex items-center px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
    >
      <FaWhatsapp size={24} className="mr-2" />
      <span className="font-semibold">Chat on WhatsApp</span>
    </a>
  );
};

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.length;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const currencyRef = useRef(null);

  // Use the currency context instead of local state
  const {
    selectedCurrency,
    currencies,
    showCurrency,
    handleCurrencyClick,
    handleCurrencySelect,
  } = useCurrency();

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
        // Use the context function to close the dropdown
        if (showCurrency) {
          handleCurrencyClick();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currencyRef, showCurrency, handleCurrencyClick]);

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Styled Components for Dropdown Menus
  const DropdownMenu = ({ children, align = "left" }) => (
    <div
      className={`absolute hidden group-hover:block top-full 
        ${align === "right" ? "right-0" : "left-0"}
        bg-white shadow-md z-50 w-full min-w-max pt-4 pb-6 
        max-w-screen-xl overflow-hidden`}
    >
      <div className="grid grid-cols-3 gap-8 px-6">{children}</div>
    </div>
  );

  const DropdownCategory = ({ title, items }) => (
    <div>
      <h3 className="font-cardo text-[#5d4037] text-lg border-b border-gray-200 pb-2 mb-3">
        {title}
      </h3>
      <ul>
        {items.map((item, index) => {
          // Transform the item name to have only first letter capitalized
          const formattedName =
            item.name.charAt(0).toUpperCase() +
            item.name.slice(1).toLowerCase();

          return (
            <li key={index} className="mb-2">
              <Link
                to={item.link}
                className="text-[#6d4c41] hover:text-[#8b5e3c] font-cardo text-sm transition-colors duration-200"
              >
                {formattedName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // All category data remains the same
  const shopData = [
    // ...existing data
  ];

  const collectionsData = [
    // ...existing data
  ];

  const fabricData = [
    // ...existing data
  ];

  const storiesData = [
    // ...existing data
  ];

  return (
    <>
      {/* Main container with Cardo font */}
      <div className="font-cardo text-sm antialiased">
        {/* Brand and Icons Bar - Only visible when not scrolled */}
        {!scrolled && (
          <div className="w-full bg-white py-3 px-6 flex justify-between items-center border-b border-gray-100">
            {/* Branding */}
            <div className="text-black flex space-x-3.5 italic space-y-2">
              <div className="flex items-center space-x-2">
                <FaEnvelope size={18} />
                <a
                  href="mailto:katanbanarasofficial@gmail.com"
                  className="hover:underline"
                >
                  katanbanarasofficial@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 space-y-2">
                <FaPhone size={18} />
                <a
                  href="tel:+917860783350"
                  className="hover:underline space-y-2"
                >
                  +91 7860783350
                </a>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex space-x-6 text-gray-600">
              <div className="flex items-center relative" ref={currencyRef}>
                <button
                  className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  onClick={handleCurrencyClick}
                >
                  <span className="flex items-center uppercase text-lg tracking-wide font-semibold">
                    <span className="text-2xl">{selectedCurrency.code}</span>
                    <span className="ml-1 text-2xl">
                      {selectedCurrency.symbol} ▼
                    </span>
                  </span>
                </button>

                {showCurrency && (
                  <div className="absolute top-full mt-2 right-0 bg-white shadow-md p-3 z-50 w-40">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        className="block w-full text-left px-2 py-2 hover:bg-[#f9f5f0] text-[#5d4037] transition-colors text-lg font-medium"
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <span className="text-xl">{currency.symbol}</span> -
                        <span className="text-xl font-semibold">
                          {" "}
                          {currency.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/search"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaSearch size={27} />
              </Link>

              <Link
                to="/login"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaUser size={27} />
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaHeart size={27} />
              </Link>

              <Link
                to="/cart"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <div className="relative">
                  <FaShoppingCart size={30} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#c98a5e] text-white text-xs font-bold px-1.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Main Navigation - Fixed on scroll */}
        <div
          className={`w-full bg-white border-t border-b border-gray-200 py-10 px-6 
                    ${
                      scrolled
                        ? "fixed top-0 left-0 shadow-md z-50 transition-all duration-300"
                        : ""
                    }`}
        >
          <div className="relative flex justify-between items-center px-20">
            {/* Left Navigation */}
            <div className="flex space-x-8 text-gray-700 uppercase tracking-wide text-lg font-bold ml-24 ">
              <div className="relative group">
                <Link
                  to="/"
                  className="hover:text-[#8b5e3c] flex items-center transition-colors"
                >
                  SHOP{" "}
                  <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                    <SlArrowDown size={16} />
                  </span>
                </Link>
                <DropdownMenu>
                  {shopData.map((category, idx) => (
                    <DropdownCategory
                      key={idx}
                      title={category.title}
                      items={category.items}
                    />
                  ))}
                </DropdownMenu>
              </div>

              <div className="relative group">
                <Link
                  to="/collections"
                  className="hover:text-[#8b5e3c] flex items-center transition-colors"
                >
                  COLLECTIONS{" "}
                  <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                    <SlArrowDown size={16} />
                  </span>
                </Link>
                <DropdownMenu>
                  {collectionsData.map((category, idx) => (
                    <DropdownCategory
                      key={idx}
                      title={category.title}
                      items={category.items}
                    />
                  ))}
                </DropdownMenu>
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                className="hover:opacity-90 transition-opacity"
                onClick={handleLogoClick}
              >
                <img
                  src="/katan.png"
                  alt="KATAN"
                  className="h-23 w-39 object-contain"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex space-x-8 text-gray-700 uppercase tracking-wide text-lg font-bold mr-34 ">
              {!scrolled ? (
                <>
                  <div className="relative group">
                    <Link
                      to="/fabrics"
                      className="hover:text-[#8b5e3c] flex items-center transition-colors"
                    >
                      FABRIC{" "}
                      <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                        <SlArrowDown size={16} />
                      </span>
                    </Link>
                    <DropdownMenu align="right">
                      {fabricData.map((category, idx) =>
                        category.title ? (
                          <DropdownCategory
                            key={idx}
                            title={category.title}
                            items={category.items}
                          />
                        ) : null
                      )}
                    </DropdownMenu>
                  </div>

                  <div className="relative group">
                    <Link
                      to="/about"
                      className="hover:text-[#8b5e3c] flex items-center transition-colors"
                    >
                      ABOUT US{" "}
                      <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                        <SlArrowDown size={16} />
                      </span>
                    </Link>
                    <DropdownMenu align="right">
                      <DropdownCategory
                        title="Our Story"
                        items={[
                          { name: "Story", link: "/about/story" },
                          { name: "Our-Heritage", link: "/about/heritage" },
                          { name: "Our-Craftmanship", link: "/about/craft" },
                          { name: "About-Us", link: "/about" },
                        ]}
                      />
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                // Show icons when scrolled - Made larger
                <div className="flex space-x-6 text-gray-600">
                  <div className="flex items-center relative" ref={currencyRef}>
                    <button
                      className="flex items-center hover:text-[#8b5e3c] transition-colors"
                      onClick={handleCurrencyClick}
                    >
                      <span className="flex text-2xl items-center text-base">
                        {selectedCurrency.symbol}
                        <span className="ml-1 text-2xl">▼</span>
                      </span>
                    </button>

                    {showCurrency && (
                      <div className="absolute top-full mt-2 right-0 bg-white shadow-md p-2 z-50 w-36">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            className="block w-full text-left px-2 py-1.5 hover:bg-[#f9f5f0] text-[#5d4037] transition-colors"
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            {currency.symbol} - {currency.code}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/search"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaSearch size={27} />
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaUser size={27} />
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaHeart size={27} />
                  </Link>

                  <Link
                    to="/cart"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <div className="relative">
                      <FaShoppingCart size={30} />
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

        {/* Add a spacer div when navbar is fixed to prevent content jump - INCREASED HEIGHT */}
        {scrolled && <div className="h-32"></div>}
      </div>
    </>
  );
};

export default Navbar;
