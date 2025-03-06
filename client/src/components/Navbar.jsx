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

  // Styled Components for Dropdown Menus
  const DropdownMenu = ({ children, align = "left" }) => (
    <div
      className={`absolute hidden group-hover:block top-full 
        ${align === "right" ? "right-0" : "left-0"}
        bg-white shadow-md z-50 w-full min-w-max pt-4 pb-6 
        max-w-screen-xl overflow-hidden`} // Added max-width and overflow handling
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
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link
              to={item.link}
              className="text-[#6d4c41] hover:text-[#8b5e3c] font-cardo text-sm transition-colors duration-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  // Shopping Categories Data
  const shopData = [
    {
      title: "New Arrivals",
      items: [
        { name: "Fresh off the Loom", link: "/new-arrivals/fresh" },
        { name: "Freshly Tailored", link: "/new-arrivals/tailored" },
      ],
    },
    {
      title: "Clothing",
      items: [
        { name: "Sarees", link: "/clothing/sarees" },
        { name: "Lehengas", link: "/clothing/lehengas" },
        { name: "Dupattas", link: "/clothing/dupattas" },
        { name: "Suits", link: "/clothing/suits" },
        { name: "Blouses", link: "/clothing/blouses" },
        { name: "Jackets", link: "/clothing/jackets" },
      ],
    },
    {
      title: "Featured",
      items: [
        { name: "Silk & Wool", link: "/featured/silk-wool" },
        { name: "Antinomy", link: "/featured/antinomy" },
        { name: "Handwoven Fabrics", link: "/featured/handwoven" },
        { name: "Bridal", link: "/featured/bridal" },
      ],
    },
  ];

  // Collections Data
  const collectionsData = [
    {
      title: "Weaves & Patterns",
      items: [
        { name: "Kashi", link: "/weaves/kashi" },
        { name: "Zarkashi - Real Zari", link: "/weaves/zarkashi" },
        { name: "Kadhua Bootis", link: "/weaves/kadhua" },
        { name: "Tanchoi", link: "/weaves/tanchoi" },
        { name: "Shikargah", link: "/weaves/shikargah" },
      ],
    },
    {
      title: "Fabrics",
      items: [
        { name: "Katan Silk", link: "/fabrics/katan" },
        { name: "Satin Silk", link: "/fabrics/satin" },
        { name: "Tissue Silk", link: "/fabrics/tissue" },
        { name: "Textured Silk", link: "/fabrics/textured" },
        { name: "Silk Pashmina Wool", link: "/fabrics/pashmina" },
      ],
    },
    {
      title: "How to Style",
      items: [
        { name: "The Eid Edit", link: "/style/eid" },
        { name: "Seasonal Selections", link: "/style/seasonal" },
        { name: "Pastel Dreams", link: "/style/pastel" },
        { name: "Modern Classics", link: "/style/modern" },
        { name: "Tilfi Weddings", link: "/style/weddings" },
      ],
    },
  ];

  // Campaigns Data
  const campaignsData = [
    {
      title: "Shop By Campaign",
      items: [
        { name: "Silk & Wool", link: "/campaign/silk-wool" },
        { name: "Peony Pavilion", link: "/campaign/peony" },
        { name: "SeeSaw", link: "/campaign/seesaw" },
        { name: "Sandhi", link: "/campaign/sandhi" },
        { name: "Of the First Water", link: "/campaign/first-water" },
      ],
    },
    {
      title: "Featured Campaign",
      items: [
        { name: "Songs of the Seasons", link: "/campaign/seasons" },
        { name: "The Way of Flowers", link: "/campaign/flowers" },
        { name: "Kala", link: "/campaign/kala" },
        { name: "Quarter to Time", link: "/campaign/quarter" },
        { name: "Gulab Bari", link: "/campaign/gulab" },
      ],
    },
    {
      title: "",
      items: [],
    },
  ];

  // Craft Data
  const craftData = [
    {
      title: "Craft Techniques",
      items: [
        { name: "Handloom Weaving", link: "/craft/handloom" },
        { name: "Zardozi Embroidery", link: "/craft/zardozi" },
        { name: "Heritage Processes", link: "/craft/heritage" },
        { name: "Dyeing Techniques", link: "/craft/dyeing" },
      ],
    },
    {
      title: "Material Science",
      items: [
        { name: "Pure Silk", link: "/craft/pure-silk" },
        { name: "Wool & Blends", link: "/craft/wool" },
        { name: "Gold & Silver Zari", link: "/craft/zari" },
        { name: "Natural Dyes", link: "/craft/natural-dyes" },
      ],
    },
    {
      title: "Artisanal Knowledge",
      items: [
        { name: "Meet the Weavers", link: "/craft/weavers" },
        { name: "Craft Preservation", link: "/craft/preservation" },
        { name: "Workshops & Tours", link: "/craft/workshops" },
        { name: "From Loom to Wardrobe", link: "/craft/journey" },
      ],
    },
  ];

  // Stories Data
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
      {/* Main container with Cardo font */}
      <div className="font-cardo text-sm antialiased">
        {/* Shipping Info Bar - Only visible when not scrolled */}
        {!scrolled && (
          <div className="w-full bg-[#5d4037] text-white py-2 px-4 flex justify-center items-center z-50 relative">
            <div className="flex items-center">
              <span className="italic font-cardo">
                Free shipping within India
              </span>
              <button className="absolute right-4 text-white">✕</button>
            </div>
          </div>
        )}

        {/* Brand and Icons Bar - Only visible when not scrolled */}
        {!scrolled && (
          <div className="w-full bg-white py-3 px-6 flex justify-between items-center border-b border-gray-100">
            {/* Branding */}
            <div className="text-[#5d4037] italic">
              Threads of Tradition, Crafted by KATAN
            </div>

            {/* Right Side Icons */}
            <div className="flex space-x-6 text-gray-600">
              <Link
                to="/search"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaSearch size={16} />
                <span className="ml-2 uppercase text-xs tracking-wide">
                  SEARCH
                </span>
              </Link>

              <div className="flex items-center relative" ref={currencyRef}>
                <button
                  className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  onClick={handleCurrencyClick}
                >
                  <span className="flex items-center uppercase text-xs tracking-wide">
                    {selectedCurrency.code} {selectedCurrency.symbol}
                    <span className="ml-1">▼</span>
                  </span>
                </button>

                {showCurrency && (
                  <div className="absolute top-full mt-2 right-0 bg-white shadow-md p-3 z-50 w-36">
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
                to="/login"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaUser size={16} />
                <span className="ml-2 uppercase text-xs tracking-wide">
                  LOGIN
                </span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <FaHeart size={16} />
                <span className="ml-2 uppercase text-xs tracking-wide">
                  WISHLIST
                </span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center hover:text-[#8b5e3c] transition-colors"
              >
                <div className="relative">
                  <FaShoppingCart size={16} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#c98a5e] text-white text-xs font-bold px-1.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="ml-2 uppercase text-xs tracking-wide">
                  CART
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* Main Navigation - Fixed on scroll */}
        <div
          className={`w-full bg-white border-t border-b border-gray-200 py-6 px-6 
                    ${
                      scrolled
                        ? "fixed top-0 left-0 shadow-md z-50 transition-all duration-300"
                        : ""
                    }`}
        >
          <div className="flex justify-between items-center">
            {/* Left Navigation */}
            <div className="flex space-x-8 text-gray-700 uppercase tracking-wide text-sm">
              <div className="relative group">
                <Link
                  to="/"
                  className="hover:text-[#8b5e3c] flex items-center transition-colors"
                >
                  SHOP <span className="ml-1">▼</span>
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
                  COLLECTIONS <span className="ml-1">▼</span>
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

              <div className="relative group">
                <Link
                  to="/campaigns"
                  className="hover:text-[#8b5e3c] flex items-center transition-colors"
                >
                  CAMPAIGNS <span className="ml-1">▼</span>
                </Link>
                <DropdownMenu>
                  {campaignsData.map(
                    (category, idx) =>
                      category.title && (
                        <DropdownCategory
                          key={idx}
                          title={category.title}
                          items={category.items}
                        />
                      )
                  )}
                  <div>
                    <img
                      src="/campaign-image-1.jpg"
                      alt="Silk & Wool"
                      className="h-64 w-64 object-cover"
                    />
                    <p className="text-center mt-2 font-cardo text-[#5d4037]">
                      SILK & WOOL
                    </p>
                  </div>
                </DropdownMenu>
              </div>
            </div>

            {/* Center Logo */}
            <div>
              <Link to="/" className="hover:opacity-90 transition-opacity">
                <img
                  src="/KatanBanarasp.png"
                  alt="KATAN "
                  className="h-14 object-contain"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex space-x-8 text-gray-700 uppercase tracking-wide text-sm">
              {/* Show these menu items when not scrolled */}
              {!scrolled ? (
                <>
                  {/* Craft dropdown - update alignment to right */}
                  <div className="relative group">
                    <Link
                      to="/craft"
                      className="hover:text-[#8b5e3c] flex items-center transition-colors"
                    >
                      CRAFT <span className="ml-1">▼</span>
                    </Link>
                    <DropdownMenu align="right">
                      {craftData.map((category, idx) => (
                        <DropdownCategory
                          key={idx}
                          title={category.title}
                          items={category.items}
                        />
                      ))}
                    </DropdownMenu>
                  </div>

                  {/* Stories dropdown - update alignment to right */}
                  <div className="relative group">
                    <Link
                      to="/stories"
                      className="hover:text-[#8b5e3c] flex items-center transition-colors"
                    >
                      STORIES <span className="ml-1">▼</span>
                    </Link>
                    <DropdownMenu align="right">
                      {storiesData.map((category, idx) => (
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
                      to="/about"
                      className="hover:text-[#8b5e3c] flex items-center transition-colors"
                    >
                      ABOUT US <span className="ml-1">▼</span>
                    </Link>
                    {/* Change to align="right" to keep it from overflowing left */}
                    <DropdownMenu align="right">
                      <DropdownCategory
                        title="Our Story"
                        items={[
                          { name: "Philosophy", link: "/about/philosophy" },
                          { name: "Journey", link: "/about/journey" },
                          { name: "Team", link: "/about/team" },
                          {
                            name: "Sustainability",
                            link: "/about/sustainability",
                          },
                        ]}
                      />
                      {/* Rest of the dropdown menu content */}
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                // Show icons when scrolled
                <div className="flex space-x-6 text-gray-600">
                  <Link
                    to="/search"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaSearch size={16} />
                  </Link>

                  <div className="flex items-center relative" ref={currencyRef}>
                    <button
                      className="flex items-center hover:text-[#8b5e3c] transition-colors"
                      onClick={handleCurrencyClick}
                    >
                      <span className="flex items-center">
                        {selectedCurrency.symbol}
                        <span className="ml-1">▼</span>
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
                    to="/login"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaUser size={16} />
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <FaHeart size={16} />
                  </Link>

                  <Link
                    to="/cart"
                    className="flex items-center hover:text-[#8b5e3c] transition-colors"
                  >
                    <div className="relative">
                      <FaShoppingCart size={16} />
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
      </div>
    </>
  );
};

export default Navbar;
