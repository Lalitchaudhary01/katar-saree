import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaFilter,
} from "react-icons/fa";

// Context Hooks
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";

// Components
import QuickViewModal from "../reusable/QuickView";

// Product Data
import banarasiProducts from "../assets/product/BanarasiProduct";

// Styles
import "./BanarasiSarees.css";

const BanarasiSarees = () => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [filteredProducts, setFilteredProducts] = useState(banarasiProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // Quick View states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Extract all categories and tags for filters
  const categories = [
    ...new Set(banarasiProducts.map((product) => product.category)),
  ];
  const tags = [
    ...new Set(banarasiProducts.flatMap((product) => product.tags)),
  ];

  // Apply filters
  useEffect(() => {
    let result = banarasiProducts;

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
  }, [priceRange, selectedCategories, selectedTags, searchQuery]);

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

  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] relative">
      {/* Header */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4 tracking-wide">
          Banarasi Sarees Collection
        </h2>
        <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
          Exquisite handcrafted traditional Banarasi silks with intricate
          designs passed down through generations.
        </p>
        <div className="w-32 h-0.5 bg-black mx-auto"></div>
      </div>

      {/* Search and Filter Header */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search for sarees..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-cardo focus:outline-none focus:ring-2 focus:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-cardo"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              className="border border-black text-black px-4 py-2 rounded-lg font-cardo hover:bg-black hover:text-white transition-colors"
              onClick={clearFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-playfair text-xl font-bold mb-6 pb-3 border-b">
                  Filters
                </h3>

                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="font-playfair font-semibold mb-4">
                    Price Range
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-cardo">
                      ₹{priceRange[0].toLocaleString()}
                    </span>
                    <span className="font-cardo">
                      ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="mb-3"
                  />
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="font-playfair font-semibold mb-4">Material</h4>
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="custom-checkbox block mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className="checkmark"></span>
                      <span className="font-cardo">{category}</span>
                    </label>
                  ))}
                </div>

                {/* Tags Filter */}
                <div className="mb-4">
                  <h4 className="font-playfair font-semibold mb-4">Occasion</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        className={`px-3 py-1 rounded-full font-cardo text-sm ${
                          selectedTags.includes(tag)
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
          )}

          {/* Products Grid */}
          <div
            className={`w-full ${showFilters ? "md:w-3/4 lg:w-4/5" : "w-full"}`}
          >
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-10 text-center">
                <h3 className="font-playfair text-xl font-bold mb-4">
                  No Products Found
                </h3>
                <p className="font-cardo text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  className="mt-6 bg-black text-white px-6 py-2 rounded-lg font-cardo"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden bg-white flex flex-col justify-between cursor-pointer card-hover rounded-lg shadow-md"
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden group">
                      <div className="overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          onClick={() => navigate(`/collection/${product.id}`)}
                          className="w-full h-[300px] sm:h-[360px] object-cover image-zoom"
                        />
                      </div>

                      {/* Quick View Button and Wishlist Icon */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          className="px-6 py-2.5 bg-white/90 backdrop-blur-sm text-black rounded-full font-cardo tracking-wide text-sm flex items-center gap-2 hover:bg-white transition-all duration-300 shadow-lg"
                        >
                          <FaEye className="text-black" /> Quick View
                        </button>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-4 left-4 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 wishlist-btn ${
                          isInWishlist(product.id) ? "active" : ""
                        }`}
                      >
                        <FaHeart
                          className={`text-xl ${
                            isInWishlist(product.id)
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        />
                      </button>

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="discount-badge text-white font-medium text-sm px-3 py-1 rounded-full shadow-md">
                          {product.discount}
                        </div>
                      </div>
                    </div>

                    {/* Product Details with Currency Conversion */}
                    <div className="p-5 flex flex-col bg-white">
                      <h3 className="text-xl text-black font-playfair font-semibold mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-center gap-3">
                        {product.originalPrice && (
                          <p className="text-gray-500 line-through text-sm font-cardo">
                            {selectedCurrency.symbol}
                            {formatPrice(convertPrice(product.originalPrice))}
                          </p>
                        )}
                        <p className="text-black font-cardo font-bold text-lg price-tag">
                          {selectedCurrency.symbol}
                          {formatPrice(convertPrice(product.discountPrice))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
