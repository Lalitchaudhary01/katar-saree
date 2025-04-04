import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaEnvelope, FaPhone, FaTruck } from "react-icons/fa";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";
import MobileNavbar from "./MobileNavar";
import {
  shopData,
  collectionsData,
  fabricData,
} from "../assets/product/navbarData";
import { toast } from "react-hot-toast";

// WhatsApp button component
export const WhatsAppButton = () => {
  const phoneNumber = "+917860783350";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white flex items-center px-2 py-1 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 animate-bounce"
    >
      <FaWhatsapp size={34} className="mr-2" />
      <span className="font-semibold">Chat</span>
    </a>
  );
};

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.length;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const currencyRef = useRef(null);
  const userMenuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const {
    selectedCurrency,
    currencies,
    showCurrency,
    handleCurrencyClick,
    handleCurrencySelect,
  } = useCurrency();

  // Check if user is logged in on component mount
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(userInfo));
    }
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        if (showCurrency) {
          handleCurrencyClick();
        }
      }

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        if (showUserMenu) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    currencyRef,
    userMenuRef,
    showCurrency,
    showUserMenu,
    handleCurrencyClick,
  ]);

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    // Update state
    setIsLoggedIn(false);
    setUserData(null);
    setShowUserMenu(false);

    // Show success message
    toast.success("Logged out successfully!");

    // Navigate to home page
    navigate("/");
  };

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

  // Custom User Menu Component
  const UserMenu = () => (
    <div className="absolute top-full mt-2 right-0 bg-white shadow-md p-3 z-50 w-48 rounded-md">
      {userData && (
        <div className="px-2 py-2 border-b border-gray-200">
          <p className="font-medium text-gray-900">{userData.name}</p>
          <p className="text-sm text-gray-600 truncate">{userData.email}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center w-full text-left px-2 py-2 hover:bg-[#f9f5f0] text-[#5d4037] transition-colors"
      >
        <FiLogOut className="mr-2" />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <div className="bg-[#f0f0f0] text-black py-2 text-center text-sm font-medium flex justify-center items-center">
        <FaTruck className="mr-2" size={20} />
        Free Shipping on Orders Above ₹25,000 | Flat 10% Off on First Order
      </div>

      <div className="font-cardo text-sm antialiased">
        {/* Mobile Navbar - Only visible on mobile screens */}
        <div className="block md:hidden">
          <MobileNavbar
            shopData={shopData}
            collectionsData={collectionsData}
            fabricData={fabricData}
            totalItems={totalItems}
            selectedCurrency={selectedCurrency}
            currencies={currencies}
            handleCurrencyClick={handleCurrencyClick}
            handleCurrencySelect={handleCurrencySelect}
            showCurrency={showCurrency}
            currencyRef={currencyRef}
            mobileMenuOpen={mobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            userData={userData}
          />
        </div>

        {/* Desktop Navbar - Hidden on mobile screens */}
        <div className="hidden md:block">
          {!scrolled && (
            <div className="w-full bg-white py-3 px-6 flex justify-between items-center border-b border-gray-100">
              <div className="text-black flex space-x-3.5 italic space-y-2">
                <div className="hidden md:flex items-center space-x-2">
                  <FaEnvelope size={18} />
                  <a
                    href="mailto:katanbanarasofficial@gmail.com"
                    className="hover:underline"
                  >
                    katanbanarasofficial@gmail.com
                  </a>
                </div>
                <div className="hidden md:flex items-center space-x-2 space-y-2">
                  <FaPhone size={18} />
                  <a
                    href="tel:+917860783350"
                    className="hover:underline space-y-2"
                  >
                    +91 7860783350
                  </a>
                </div>
              </div>

              <div className="flex space-x-6 text-black">
                <div
                  className="hidden md:flex items-center relative"
                  ref={currencyRef}
                >
                  <button
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                    onClick={handleCurrencyClick}
                  >
                    <span className="flex items-center uppercase text-lg tracking-wide font-semibold">
                      <span className="text-1xl">{selectedCurrency.code}</span>
                      <span className="ml-1 text-1xl">
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
                  className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
                >
                  <FiSearch size={23} />
                </Link>

                <div
                  className="hidden md:flex items-center relative"
                  ref={userMenuRef}
                >
                  <button
                    onClick={handleUserIconClick}
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FiUser size={23} />
                    {isLoggedIn && <span className="ml-1">▼</span>}
                  </button>
                  {isLoggedIn && showUserMenu && <UserMenu />}
                </div>

                <Link
                  to="/wishlist"
                  className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
                >
                  <FiHeart size={23} />
                </Link>

                <Link
                  to="/cart"
                  className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
                >
                  <div className="relative">
                    <FiShoppingCart size={25} />
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

          <div
            className={`w-full bg-white border-t border-b border-gray-200 px-2 md:px-6 
            ${
              scrolled
                ? "fixed top-0 left-0 shadow-md md:z-50 transition-all duration-300 py-4"
                : "pt-2 pb-8 md:py-10"
            }`}
          >
            <div className="relative flex justify-between items-center px-20">
              <div className="hidden md:flex space-x-8 text-black uppercase tracking-wide text-lg font-bold ml-24 ">
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

              <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:left-auto lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <Link
                  to="/"
                  className="hover:opacity-90 transition-opacity"
                  onClick={handleLogoClick}
                >
                  <img
                    src="/katan.png"
                    alt="KATAN"
                    className={`transition-all duration-300 object-contain ${
                      scrolled ? "h-14 w-auto" : "h-16 w-auto md:h-23 md:w-39"
                    }`}
                  />
                </Link>
              </div>

              <div className="hidden md:flex space-x-8 text-black uppercase tracking-wide text-lg font-bold mr-34 ">
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
                  <div className="flex space-x-6 text-black">
                    <div
                      className="flex items-center relative"
                      ref={currencyRef}
                    >
                      <button
                        className="flex items-center hover:text-[#8b5e3c] transition-colors"
                        onClick={handleCurrencyClick}
                      >
                        <span className="flex text-1xl items-center text-base">
                          {selectedCurrency.symbol}
                          <span className="ml-1 text-1xl">▼</span>
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
                      <FiSearch size={20} />
                    </Link>

                    <div
                      className="flex items-center relative"
                      ref={userMenuRef}
                    >
                      <button
                        onClick={handleUserIconClick}
                        className="flex items-center hover:text-[#8b5e3c] transition-colors"
                      >
                        <FiUser size={20} />
                        {isLoggedIn && <span className="ml-1 text-xs">▼</span>}
                      </button>
                      {isLoggedIn && showUserMenu && <UserMenu />}
                    </div>

                    <Link
                      to="/wishlist"
                      className="flex items-center hover:text-[#8b5e3c] transition-colors"
                    >
                      <FiHeart size={20} />
                    </Link>

                    <Link
                      to="/cart"
                      className="flex items-center hover:text-[#8b5e3c] transition-colors"
                    >
                      <div className="relative">
                        <FiShoppingCart size={22} />
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
          {scrolled && <div className="h-24 md:h-28"></div>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
