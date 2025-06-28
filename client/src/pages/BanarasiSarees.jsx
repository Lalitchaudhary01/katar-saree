import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

// Context Hooks
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";

// Components
import QuickViewModal from "../reusable/QuickView";

// Product Data
// import banarasiProducts from "../assets/product/BanarasiProduct";

// Styles
import "./BanarasiSarees.css";

const BanarasiSarees = ({
  initialProducts = banarasiProducts,
  pageTitle = "Banarasi Sarees Collection",
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Mobile-first: filters hidden by default

  // Mobile-specific accordion states
  const [expandedSections, setExpandedSections] = useState({
    price: false,
    material: false,
    occasion: false,
  });

  // Quick View states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Extract all categories and tags for filters
  const categories = [
    ...new Set(initialProducts.map((product) => product.category)),
  ];
  const tags = [...new Set(initialProducts.flatMap((product) => product.tags))];

  // Apply filters
  useEffect(() => {
    let result = initialProducts;

    // Price filter
    result = result.filter(
      (product) =>
        product.discountPrice >= priceRange[0] &&
        product.discountPrice <= priceRange[1]
    );

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((product) =>
        product.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.desc.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [
    initialProducts,
    priceRange,
    selectedCategories,
    selectedTags,
    searchQuery,
  ]);

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleAccordion = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearFilters = () => {
    setPriceRange([0, 25000]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery("");
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setIsQuickViewOpen(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedTags.length > 0) count += selectedTags.length;
    if (priceRange[0] !== 0 || priceRange[1] !== 25000) count += 1;
    return count;
  };

  return (
    <section className="py-8 md:py-16 bg-[#FDFBF7] relative min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-black mb-3 md:mb-4 tracking-wide">
          {pageTitle}
        </h2>
        <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-lg px-4">
          Exquisite handcrafted traditional Banarasi silks with intricate
          designs passed down through generations.
        </p>
        <div className="w-20 md:w-32 h-0.5 bg-black mx-auto"></div>
      </div>

      {/* Mobile Search Bar */}
      <div className="container mx-auto px-4 mt-8">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sarees..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl font-cardo focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="container mx-auto px-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="font-cardo text-gray-600 text-sm">
            {filteredProducts.length} products found
          </span>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-cardo text-sm relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter size={14} />
              Filter
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
            {getActiveFiltersCount() > 0 && (
              <button
                className="px-3 py-2 border border-gray-300 rounded-xl text-gray-600 text-sm font-cardo"
                onClick={clearFilters}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal/Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowFilters(false)}
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
                <h3 className="font-playfair text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Price Filter Accordion */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleAccordion("price")}
                    className="w-full flex items-center justify-between p-4 font-playfair font-semibold text-left"
                  >
                    Price Range
                    {expandedSections.price ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.price && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 p-4"
                      >
                        <div className="flex justify-between mb-3 text-sm">
                          <span className="font-cardo">
                            ₹{priceRange[0].toLocaleString()}
                          </span>
                          <span className="font-cardo">
                            ₹{priceRange[1].toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="range"
                            min="0"
                            max="25000"
                            step="500"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="w-full accent-black"
                          />
                          <input
                            type="range"
                            min="0"
                            max="25000"
                            step="500"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="w-full accent-black"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Material Filter Accordion */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleAccordion("material")}
                    className="w-full flex items-center justify-between p-4 font-playfair font-semibold text-left"
                  >
                    Material
                    {expandedSections.material ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.material && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 p-4 space-y-3"
                      >
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center space-x-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="rounded border-gray-300 text-black focus:ring-black accent-black"
                            />
                            <span className="font-cardo text-sm">
                              {category}
                            </span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Occasion Filter Accordion */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleAccordion("occasion")}
                    className="w-full flex items-center justify-between p-4 font-playfair font-semibold text-left"
                  >
                    Occasion
                    {expandedSections.occasion ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.occasion && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 p-4"
                      >
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <button
                              key={tag}
                              className={`px-3 py-1.5 rounded-full font-cardo text-xs ${
                                selectedTags.includes(tag)
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              } transition-colors`}
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="sticky bottom-0 bg-white border-t p-4 space-y-3">
                <button
                  onClick={clearFilters}
                  className="w-full py-3 border border-gray-300 rounded-lg font-cardo text-gray-700 hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 bg-black text-white rounded-lg font-cardo"
                >
                  Show {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Filters Sidebar */}
      {showFilters && (
        <div className="container mx-auto px-4 mt-6 hidden md:block">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-bold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Filter */}
              <div>
                <h4 className="font-playfair font-semibold mb-4">
                  Price Range
                </h4>
                <div className="flex justify-between mb-2">
                  <span className="font-cardo text-sm">
                    ₹{priceRange[0].toLocaleString()}
                  </span>
                  <span className="font-cardo text-sm">
                    ₹{priceRange[1].toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full accent-black"
                  />
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full accent-black"
                  />
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <h4 className="font-playfair font-semibold mb-4">Material</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded border-gray-300 text-black focus:ring-black accent-black"
                      />
                      <span className="font-cardo text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion Filter */}
              <div>
                <h4 className="font-playfair font-semibold mb-4">Occasion</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1 rounded-full font-cardo text-xs ${
                        selectedTags.includes(tag)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-colors`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container mx-auto px-4 mt-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="font-playfair text-xl font-bold mb-4">
              No Products Found
            </h3>
            <p className="font-cardo text-gray-600 mb-6">
              Try adjusting your filters or search criteria.
            </p>
            <button
              className="bg-black text-white px-6 py-3 rounded-lg font-cardo"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden bg-white flex flex-col cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => navigate(`/collection/${product.id}`)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Mobile Quick Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="bg-white/90 backdrop-blur-sm h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center shadow-md"
                    >
                      <FaHeart
                        className={`text-sm md:text-base ${
                          isInWishlist(product.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="bg-white/90 backdrop-blur-sm h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center shadow-md md:hidden"
                    >
                      <FaEye className="text-sm text-gray-700" />
                    </button>
                  </div>

                  {/* Desktop Quick View */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm text-black rounded-full font-cardo text-sm flex items-center gap-2 hover:bg-white transition-all duration-300 shadow-lg"
                    >
                      <FaEye /> Quick View
                    </button>
                  </div>

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded-full font-medium">
                        {product.discount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <h3 className="text-sm md:text-base font-playfair font-semibold mb-2 line-clamp-2 flex-1">
                    {product.title}
                  </h3>
                  <div className="space-y-1">
                    {product.originalPrice && (
                      <p className="text-gray-500 line-through text-xs md:text-sm font-cardo">
                        {selectedCurrency.symbol}
                        {formatPrice(convertPrice(product.originalPrice))}
                      </p>
                    )}
                    <p className="text-black font-cardo font-bold text-sm md:text-base">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(product.discountPrice))}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        selectedProduct={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </section>
  );
};

export default BanarasiSarees;
