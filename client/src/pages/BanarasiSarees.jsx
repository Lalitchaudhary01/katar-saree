import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimesCircle,
  FaEye,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useCurrency } from "../context/currencyContext";
import { useWishlist } from "../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
// Import QuickViewModal component
import QuickViewModal from "../reusable/QuickView";
// Import your collections data
import collections from "../assets/product/CollectionData"; // Update this path to match your file structure

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState({});

  const hoverTimers = React.useRef({});
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Initialize current indexes for image hover effect
  useEffect(() => {
    if (searchResults.length > 0) {
      setCurrentIndexes(
        searchResults.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
      );
    }
  }, [searchResults]);

  // Cleanup hover timers
  useEffect(() => {
    return () => {
      Object.values(hoverTimers.current).forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, []);

  // Filter products when search query or category filter changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    // Simulate a brief loading time for better UX
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = collections.filter((product) => {
        // Search by title
        const titleMatch = product.title.toLowerCase().includes(query);

        // Search by description
        const descMatch =
          product.desc && product.desc.toLowerCase().includes(query);

        // Search by fabric (in details)
        const fabricMatch =
          product.details &&
          product.details.fabric &&
          product.details.fabric.toLowerCase().includes(query);

        // Search in other details
        const detailsMatch =
          product.details &&
          Object.values(product.details).some(
            (value) =>
              typeof value === "string" && value.toLowerCase().includes(query)
          );

        // Category filter
        const productCategory = mapProductCategory(product);
        const matchesCategory =
          filterCategory === "all" || productCategory === filterCategory;

        return (
          (titleMatch || descMatch || fabricMatch || detailsMatch) &&
          matchesCategory
        );
      });

      setSearchResults(filtered);
      setLoading(false);
    }, 300);
  }, [searchQuery, filterCategory]);

  // Handle image load
  const handleImageLoad = (index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }));
  };

  // Handle mouse enter for image hover effect
  const handleMouseEnter = (index) => {
    if (searchResults[index]?.images?.length > 1) {
      hoverTimers.current[index] = setTimeout(() => {
        setCurrentIndexes((prevIndexes) => ({
          ...prevIndexes,
          [index]:
            (prevIndexes[index] + 1) % searchResults[index].images.length,
        }));
      }, 800);
    }
    setHoveredIndex(index);
  };

  // Handle mouse leave
  const handleMouseLeave = (index) => {
    if (hoverTimers.current[index]) {
      clearTimeout(hoverTimers.current[index]);
    }
    setHoveredIndex(null);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (e, product, index) => {
    e.stopPropagation(); // Stop event propagation
    const wishlistItem = {
      id: product.id || `product-${index}`,
      title: product.title,
      image: product.images[currentIndexes[index] || 0],
      images: product.images,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      colors: product.colors,
      discount: product.discount,
      desc: product.desc,
      currencyCode: selectedCurrency.code,
      currencySymbol: selectedCurrency.symbol,
    };
    toggleWishlist(wishlistItem);
  };

  // Helper function to map your product data to categories
  const mapProductCategory = (product) => {
    // Add logic to determine category based on your product structure
    if (product.title?.toLowerCase().includes("silk")) return "sarees";
    if (product.title?.toLowerCase().includes("saree")) return "sarees";
    if (product.details?.fabric?.toLowerCase().includes("silk"))
      return "sarees";
    if (product.details?.fabric?.toLowerCase().includes("georgette"))
      return "fabric";
    if (product.details?.fabric?.toLowerCase().includes("khadi"))
      return "fabric";

    return "accessories"; // Default category
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Open QuickView modal
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Close QuickView modal
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "sarees", label: "Sarees" },
    { value: "fabric", label: "Fabrics" },
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f9f7f5]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
          
          .font-cormorant {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }

          .luxury-card {
            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
          }
          
          .luxury-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          }
          
          .luxury-image {
            transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          
          .luxury-card:hover .luxury-image {
            transform: scale(1.08);
          }
          
          .luxury-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          
          .luxury-card:hover .luxury-overlay {
            opacity: 1;
          }
          
          .price-tag {
            position: relative;
            display: inline-block;
          }
          
          .price-tag:after {
            content: '';
            position: absolute;
            height: 1px;
            width: 100%;
            background-color: #000000;
            bottom: -3px;
            left: 0;
          }
          
          .elegant-badge {
            background: linear-gradient(135deg, #1a1a1a 0%, #323232 100%);
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-weight: 500;
          }
          
          .wishlist-btn {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            opacity: 0.9;
          }
          
          .wishlist-btn:hover {
            transform: scale(1.15);
            opacity: 1;
          }
          
          .quick-view-btn {
            letter-spacing: 1px;
            text-transform: uppercase;
            font-size: 10px;
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
          }
          
          .quick-view-btn:hover {
            background: rgba(255, 255, 255, 1);
            letter-spacing: 1.5px;
          }
          
          .image-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          
          .thumbnail {
            transition: all 0.3s ease;
            opacity: 0.7;
          }
          
          .thumbnail:hover, .thumbnail.active {
            opacity: 1;
            transform: translateY(-2px);
          }
        `}
      </style>

      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1a1a1a] mb-4 tracking-wider">
          Search Products
        </h1>

        <p className="font-montserrat text-neutral-600 max-w-2xl mx-auto mb-8 text-sm md:text-base tracking-wide leading-relaxed">
          Discover our exquisite collection of luxury pieces, each meticulously
          crafted for elegance and style.
        </p>

        <div className="w-24 h-px bg-[#1a1a1a] mx-auto mb-12"></div>

        {/* Luxury Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative flex shadow-md rounded-lg overflow-hidden">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for products by title, fabric..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-4 pl-12 border-0 focus:outline-none focus:ring-0 font-montserrat text-sm"
              />
              <div className="absolute left-4 top-4 text-[#1a1a1a]">
                <FaSearch size={20} />
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={20} />
                </button>
              )}
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-4 border-0 border-l border-gray-200 bg-white focus:outline-none focus:ring-0 font-montserrat text-sm"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Initial State - No Search Yet */}
        {!searchQuery && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-cormorant font-medium mb-3">
              Explore Our Collection
            </h2>
            <p className="font-montserrat text-gray-600 max-w-lg mx-auto mb-8 text-sm">
              Enter a search term above to find products by title, fabric type
              or description.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <p className="font-montserrat text-gray-600 w-full mb-2 text-sm">
                Popular search categories:
              </p>
              {categories.slice(1).map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setFilterCategory(category.value);
                    // Set a generic search term to trigger search with this category
                    setSearchQuery("silk");
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-sm hover:bg-gray-100 transition-colors font-montserrat text-xs tracking-wider uppercase"
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5e3c] mx-auto"></div>
            <p className="mt-4 text-gray-600 font-montserrat">
              Searching products...
            </p>
          </div>
        )}

        {/* Search Results */}
        {!loading && searchQuery && (
          <div className="mb-12">
            <h2 className="text-xl font-cormorant font-medium mb-8 text-center">
              {searchResults.length > 0
                ? `Found ${searchResults.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`}
            </h2>

            {searchResults.length === 0 && searchQuery && !loading && (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-cormorant font-medium mb-2">
                  No matching products found
                </h3>
                <p className="font-montserrat text-gray-600 mb-6 text-sm">
                  Try different keywords or browse our categories
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setFilterCategory(category.value);
                        setSearchQuery("silk"); // Set a common term to find products
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-sm hover:bg-gray-100 transition-colors font-montserrat text-xs tracking-wider uppercase"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-12">
              {searchResults.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="luxury-card bg-white rounded-lg overflow-hidden shadow-md group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: "3/4" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {/* Image loading skeleton */}
                    {imageLoading[index] !== false && (
                      <div className="absolute inset-0 image-skeleton"></div>
                    )}

                    <img
                      src={product.images[currentIndexes[index] || 0]}
                      alt={product.title}
                      className="w-full h-full object-cover luxury-image"
                      onLoad={() => handleImageLoad(index)}
                    />

                    {/* Overlay gradient */}
                    <div className="luxury-overlay absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
                      {/* Quick view button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Stop navigation when clicking button
                          openQuickView(product);
                        }}
                        className="quick-view-btn mx-auto mb-4 px-4 py-2 rounded-sm flex items-center gap-2 shadow-lg pointer-events-auto"
                      >
                        <FaEye className="text-[#1a1a1a] text-xs" />
                        <span className="font-montserrat text-[#1a1a1a]">
                          QUICK VIEW
                        </span>
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                      <button
                        onClick={(e) => handleWishlistToggle(e, product, index)}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md wishlist-btn hover:scale-110 transition-transform"
                      >
                        {isInWishlist(product.id || `product-${index}`) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-800" />
                        )}
                      </button>
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <div className="elegant-badge text-white text-xs px-2.5 py-1 rounded-sm shadow-md">
                          {product.discount}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="p-4 flex flex-col items-center bg-white"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <h3 className="text-sm md:text-base font-cormorant text-[#1a1a1a] font-semibold mb-2 tracking-wide">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-center gap-3">
                      {product.originalPrice && (
                        <p className="text-gray-500 line-through text-xs font-montserrat">
                          {selectedCurrency?.symbol || "₹"}
                          {formatPrice
                            ? formatPrice(convertPrice(product.originalPrice))
                            : product.originalPrice}
                        </p>
                      )}
                      <p className="text-[#1a1a1a] font-montserrat text-sm md:text-base price-tag">
                        {selectedCurrency?.symbol || "₹"}
                        {formatPrice
                          ? formatPrice(
                              convertPrice(
                                product.discountPrice || product.originalPrice
                              )
                            )
                          : product.discountPrice || product.originalPrice}
                      </p>
                    </div>

                    {/* Color swatches preview */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex justify-center gap-1.5 mt-3">
                        {product.colors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                        {product.colors.length > 4 && (
                          <div className="text-xs text-gray-500 font-montserrat">
                            +{product.colors.length - 4}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Use the QuickViewModal component */}
      <QuickViewModal
        selectedProduct={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </section>
  );
};

export default SearchPage;
