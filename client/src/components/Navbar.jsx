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
import { useCurrency } from "../context/currencyContext";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const {
    selectedCurrency,
    currencies,
    showCurrency,
    handleCurrencyClick,
    handleCurrencySelect,
  } = useCurrency();

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

  const shopData = [
    {
      title: "Fresh off the Looms",
      items: [
        { name: "Trending Sarees", link: "/trending/sarees" },
        { name: "Trending Suits", link: "/trending/suits" },
        { name: "Silk", link: "/featured/silk" },
        { name: "Katan Icon", link: "/featured/katan-icon" },
        { name: "Handwoven Fabrics", link: "/featured/handwoven" },
        { name: "Katan Signature Class", link: "/featured/signature-class" },
      ],
    },
    {
      title: "Collections",
      items: [
        { name: "Gifts", link: "/collections/gifts" },
        { name: "Best Sellers", link: "/collections/best-sellers" },
        { name: "Back in Stock", link: "/collections/back-in-stock" },
        { name: "Pre Order", link: "/collections/pre-order" },
        { name: "Ready to Ship", link: "/collections/ready-to-ship" },
        { name: "Heavy Silk", link: "/collections/heavy-silk" },
        { name: "Bridal Collection", link: "/collections/bridal" },
        { name: "Casual Collection", link: "/collections/casual" },
      ],
    },
    {
      title: "Clothing",
      items: [
        { name: "Sarees", link: "/clothing/sarees" },
        { name: "Suits", link: "/clothing/suits" },
        { name: "Dupattas", link: "/clothing/dupattas" },
      ],
    },
  ];

  const collectionsData = [
    {
      title: "Weaving and Patterns",
      items: [
        { name: "Kadhwa Bootis", link: "/weaves/kadhwa-bootis" },
        { name: "Kadwa Buri", link: "/weaves/kadwa-buri" },
        { name: "Kadhwa Strips", link: "/weaves/kadhwa-strips" },
        { name: "Jaal Cutwork", link: "/weaves/jaal-cutwork" },
        { name: "Jamawar", link: "/weaves/jamawar" },
        { name: "Banarasi Bandhej", link: "/weaves/banarasi-bandhej" },
        { name: "Minakari Bandhej", link: "/weaves/minakari-bandhej" },
        { name: "Tasal Banarasi", link: "/weaves/tasal" },
      ],
    },
    {
      title: "Rare Techniques",
      items: [
        { name: "The Most Rarest Weaving Technique", link: "/techniques/rare" },
        { name: "Rankat", link: "/techniques/rankat" },
        { name: "Bridal Sarees", link: "/techniques/bridal-sarees" },
      ],
    },
  ];

  const fabricData = [
    {
      title: "Fabric Types",
      items: [
        { name: "Katan Silk", link: "/fabrics/katan" },
        { name: "Satin Silk", link: "/fabrics/satin" },
        { name: "Tissue Silk", link: "/fabrics/tissue" },
        { name: "Kora Organza Silk", link: "/fabrics/kora-organza" },
        { name: "Handwoven Georgette", link: "/fabrics/handwoven-georgette" },
        { name: "Tanchui", link: "/fabrics/tanchui" },
      ],
    },
    {
      title: "Fabric Collections",
      items: [
        { name: "Wedding Fabrics", link: "/fabrics/wedding" },
        { name: "Festival Fabrics", link: "/fabrics/festival" },
        { name: "Everyday Elegance", link: "/fabrics/everyday" },
        { name: "Premium Weaves", link: "/fabrics/premium" },
      ],
    },
    {
      title: "Fabric Care",
      items: [
        { name: "Silk Care Guide", link: "/fabrics/care-guide" },
        { name: "Storage Tips", link: "/fabrics/storage" },
        { name: "Dry Cleaning", link: "/fabrics/dry-cleaning" },
        { name: "Rejuvenation Tips", link: "/fabrics/rejuvenation" },
      ],
    },
  ];

  const storiesData = [
    {
      title: "Heritage",
      items: [
        { name: "Banaras History", link: "/stories/banaras-history" },
        { name: "Textile Legacy", link: "/stories/textile-legacy" },
        { name: "Mughal Influence", link: "/stories/mughal" },
        { name: "Royal Patrons", link: "/stories/royal-patrons" },
      ],
    },
    {
      title: "Artisan Stories",
      items: [
        { name: "Master Weavers", link: "/stories/master-weavers" },
        { name: "Women in Craft", link: "/stories/women-in-craft" },
        { name: "Generational Knowledge", link: "/stories/generational" },
        { name: "Craft Revival", link: "/stories/revival" },
      ],
    },
    {
      title: "Editorial",
      items: [
        { name: "Style Chronicles", link: "/stories/style-chronicles" },
        { name: "Wearing Heritage", link: "/stories/wearing-heritage" },
        { name: "Sustainable Luxury", link: "/stories/sustainable" },
        { name: "Celebration Guides", link: "/stories/celebrations" },
      ],
    },
  ];

  return (
    <>
      <div className="font-cardo text-sm antialiased">
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

            <div className=" flex space-x-6 text-gray-600">
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
              <button
                className="lg:hidden fixed right-4 top-4 z-50 text-gray-700"
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

              <Link
                to="/search"
                className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaSearch size={23} />
              </Link>

              <Link
                to="/login"
                className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaUser size={23} />
              </Link>

              <Link
                to="/wishlist"
                className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaHeart size={23} />
              </Link>

              <Link
                to="/cart"
                className="hidden md:flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <div className="relative">
                  <FaShoppingCart size={25} />
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
          className={`w-full bg-white border-t border-b border-gray-200 pt-2 pb-8 md:py-10 px-2 md:px-6 
      ${
        scrolled
          ? "fixed top-0 left-0 shadow-md z-50 transition-all duration-300"
          : ""
      }`}
        >
          <div className="relative flex justify-between items-center px-20">
            <div className="hidden md:flex space-x-8 text-gray-700 uppercase tracking-wide text-lg font-bold ml-24 ">
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
                  className="h-16 w-auto md:h-23 md:w-39 object-contain"
                />
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 text-gray-700 uppercase tracking-wide text-lg font-bold mr-34 ">
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
                <div className="flex space-x-6 text-gray-600">
                  <div className="flex items-center relative" ref={currencyRef}>
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
                    <FaSearch size={22} />
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaUser size={22} />
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaHeart size={22} />
                  </Link>

                  <Link
                    to="/cart"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <div className="relative">
                      <FaShoppingCart size={25} />
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

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <div className="p-5 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/katan.png"
                  alt="KATAN"
                  className="h-16 w-auto object-contain"
                />
              </Link>
              <button onClick={toggleMobileMenu} className="text-gray-700">
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

            {/* Mobile Menu Items */}
            <div className="space-y-6">
              {/* SHOP */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center">
                  <Link
                    to="/"
                    className="text-gray-700 uppercase tracking-wide text-lg font-bold"
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
                          <h3 className="font-cardo text-[#5d4037] text-base mb-2">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item, index) => (
                              <li key={index}>
                                <Link
                                  to={item.link}
                                  className="text-[#6d4c41] block"
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
                    className="text-gray-700 uppercase tracking-wide text-lg font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    COLLECTIONS
                  </Link>
                </div>
                <div className="mt-3 ml-4 space-y-3">
                  {collectionsData.map((category, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="font-cardo text-[#5d4037] text-base mb-2">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={item.link}
                              className="text-[#6d4c41] block"
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
                    className="text-gray-700 uppercase tracking-wide text-lg font-bold"
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
                          <h3 className="font-cardo text-[#5d4037] text-base mb-2">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item, index) => (
                              <li key={index}>
                                <Link
                                  to={item.link}
                                  className="text-[#6d4c41] block"
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
                    className="text-gray-700 uppercase tracking-wide text-lg font-bold"
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
                        className="text-[#6d4c41] block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about/heritage"
                        className="text-[#6d4c41] block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Heritage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about/craft"
                        className="text-[#6d4c41] block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Craftmanship
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="text-[#6d4c41] block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Icons Row in Mobile */}
              <div className="flex justify-around py-4">
                <Link
                  to="/search"
                  className="text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaSearch size={20} />
                </Link>
                <Link
                  to="/login"
                  className="text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser size={20} />
                </Link>
                <Link
                  to="/wishlist"
                  className="text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHeart size={20} />
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative">
                    <FaShoppingCart size={22} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#c98a5e] text-white text-xs font-bold px-1.5 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Add a spacer div when navbar is fixed to prevent content jump - INCREASED HEIGHT */}
        {scrolled && <div className="h-28 md:h-32"></div>}
      </div>
    </>
  );
};

export default Navbar;
