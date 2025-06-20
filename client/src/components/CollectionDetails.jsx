import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaStar,
  FaChevronRight,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// Context Imports
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";
import { useWishlist } from "../context/WishlistContext";

// Data Imports
import collections from "../assets/product/CollectionData";
import newArrivals from "../assets/product/NewArrival";
import silkSarees from "../assets/product/SilkSaree";
import banarasiProducts from "../assets/product/BanarasiProduct";
import KoraKadhwaStrips from "../assets/product/KoraKadhwaStrips";

// Component Imports
import RecommendedProducts from "./RecommendedProducts";
import ProductDetailsTabs from "./ProductDetailsTabs";
import ProductImageGallery from "./ProductImageGallery";

const CollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const { userInfo } = useSelector((state) => state.auth);

  // Product Collection Logic
  const productId = isNaN(Number(id)) ? id : Number(id);
  const collection =
    collections.find((item) => item.id === productId) ||
    newArrivals.find((item) => item.id === productId) ||
    silkSarees.find((item) => item.id === productId) ||
    banarasiProducts.find((item) => item.id === productId) ||
    KoraKadhwaStrips.find((item) => item.id === productId);

  // State Management
  const [selectedColorVariant, setSelectedColorVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Color Processing Function
  const processColor = (color) => {
    const colorMap = {
      "#8B0000": "Maroon",
      "#FFD700": "Gold",
      "#228B22": "Green",
      "#800080": "Purple",
      "#C0C0C0": "Silver",
      "#000080": "Navy",
      "#FF4500": "Orange Red",
      "#4169E1": "Royal Blue",
      "#000000": "Black",
      "#FFDAB9": "Peach",
      "#E6E6FA": "Lavender",
      "#87CEFA": "Light Blue",
      "#CD853F": "Peru",
      "#A0522D": "Sienna",
      "#D2B48C": "Tan",
      "#556B2F": "Dark Olive Green",
      "#8FBC8F": "Dark Sea Green",
      "#2E8B57": "Sea Green",
      "#DAA520": "Gold",
      "#F5F5DC": "Beige",
    };
    return color.startsWith("#") ? colorMap[color] || color : color;
  };

  // Get Color Data
  const getColorData = () => {
    if (collection?.colorVariants) {
      return collection.colorVariants;
    } else if (collection?.colors) {
      return collection.colors.map((color, index) => ({
        color: color,
        colorName: processColor(color),
        colorCode: processColor(color).toUpperCase(),
        images: collection.images || [],
      }));
    }
    return [];
  };

  // Initialize default color
  useEffect(() => {
    if (collection) {
      if (collection.colorVariants && collection.colorVariants.length > 0) {
        const defaultVariant = collection.colorVariants[0];
        setSelectedColorVariant(defaultVariant);
        setSelectedColor(defaultVariant.colorName);
      } else if (collection.colors && collection.colors.length > 0) {
        setSelectedColor(processColor(collection.colors[0]));
      }
    }
  }, [collection]);

  // COLOR SELECTION HANDLER
  const handleColorSelection = (colorVariant) => {
    setSelectedColorVariant(colorVariant);
    setSelectedColor(colorVariant.colorName);
    toast.success(`Color changed to ${colorVariant.colorName}`);
  };

  // Wishlist Handler
  const handleWishlistToggle = () => {
    if (!userInfo) {
      navigate("/login", { state: { from: `/collection/${id}` } });
      return;
    }

    const wishlistItem = {
      id: collection.id,
      productId: collection.id,
      title: collection.title,
      image: selectedColorVariant?.images?.[0] || collection.images?.[0],
      discountPrice: collection.discountPrice,
      originalPrice: collection.originalPrice,
      discount: calculateDiscountPercentage(),
      colors:
        collection.colors || collection.colorVariants?.map((cv) => cv.color),
      desc: collection.desc,
      currencyCode: selectedCurrency.code,
      currencySymbol: selectedCurrency.symbol,
      stock: collection.stock,
      specialty: collection.specialty,
    };

    const isCurrentlyInWishlist = isInWishlist(collection.id);
    toggleWishlistItem(wishlistItem);

    if (isCurrentlyInWishlist) {
      toast.success(`${collection.title} removed from your wishlist!`);
    } else {
      toast.success(`${collection.title} added to your wishlist!`);
    }
  };

  // Add to Cart Handler
  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: `/collection/${id}` } });
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color before adding to cart!");
      return;
    }

    const cartItem = {
      id: collection.id,
      name: collection.title,
      price: collection.discountPrice,
      image: selectedColorVariant?.images?.[0] || collection.images?.[0],
      color: selectedColor,
      quantity: quantity,
    };

    try {
      const success = await addToCart(cartItem);
      if (success) {
        toast.success(`${collection.title} added to your cart!`);
      }
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  // Buy Now Handler
  const handleBuyNow = () => {
    if (!userInfo) {
      navigate("/login", { state: { from: `/collection/${id}` } });
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color before proceeding to purchase!");
      return;
    }

    navigate("/checkout", {
      state: {
        image: selectedColorVariant?.images?.[0] || collection.images?.[0],
        title: collection.title,
        quantity,
        color: selectedColor,
        amount: collection.discountPrice * quantity,
      },
    });
  };

  // Calculate discount percentage
  const calculateDiscountPercentage = () => {
    return Math.round(
      ((collection.originalPrice - collection.discountPrice) /
        collection.originalPrice) *
        100
    );
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Recommended Products Logic
  const getRecommendedProducts = () => {
    const allProducts = [
      ...collections,
      ...newArrivals,
      ...silkSarees,
      ...banarasiProducts,
      ...KoraKadhwaStrips,
    ];
    const filteredProducts = allProducts.filter(
      (item) => item.id !== productId
    );
    return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
  };

  // Error state - Product not found
  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 bg-white rounded-2xl shadow-2xl"
        >
          <h2 className="text-4xl font-light text-gray-800 mb-6">
            Product Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The saree you're looking for is no longer available.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-10 py-4 bg-black text-white rounded-full text-lg font-light tracking-wide hover:bg-gray-900 transition"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-16 font-[Garamond]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 max-w-6xl"
      >
        {/* Breadcrumb Navigation */}
        <motion.div
          variants={itemVariants}
          className="text-sm text-gray-600 mb-6 md:mb-8 flex items-center"
        >
          <span
            className="cursor-pointer hover:text-black transition"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <FaChevronRight className="mx-2 text-xs" />
          <span
            className="cursor-pointer hover:text-black transition"
            onClick={() => navigate("/collections")}
          >
            Collections
          </span>
          <FaChevronRight className="mx-2 text-xs" />
          <span className="font-semibold truncate">{collection.title}</span>
        </motion.div>

        {/* Main Product Container - FIXED FOR MOBILE */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden"
        >
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {/* Mobile Image Section */}
            <div className="p-4 border-b border-gray-200">
              <ProductImageGallery
                collection={collection}
                selectedColorVariant={selectedColorVariant}
                selectedColor={selectedColor}
                isInWishlist={isInWishlist(collection.id)}
                onWishlistToggle={handleWishlistToggle}
              />
            </div>

            {/* Mobile Product Details Section */}
            <div className="p-4 space-y-4">
              {/* Product Title */}
              <motion.h1
                variants={itemVariants}
                className="text-2xl font-light text-gray-900 tracking-wide"
              >
                {collection.title}
              </motion.h1>

              {/* Rating Section */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3"
              >
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < 4 ? "text-amber-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(126 reviews)</span>
              </motion.div>

              {/* Price Section */}
              <motion.div
                variants={itemVariants}
                className="flex items-baseline space-x-3"
              >
                <span className="text-2xl font-light text-black">
                  {selectedCurrency.symbol}
                  {formatPrice(convertPrice(collection.discountPrice))}
                </span>
                {collection.originalPrice > collection.discountPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.originalPrice))}
                    </span>
                    <span className="text-green-600 font-medium text-sm">
                      {calculateDiscountPercentage()}% OFF
                    </span>
                  </>
                )}
              </motion.div>

              {/* Product Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-700 leading-relaxed text-sm"
              >
                {collection.desc}
              </motion.p>

              {/* COLOR SELECTION */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    Select Color
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {selectedColor || "Choose a color"}
                  </span>
                </div>

                <div className="flex space-x-2 flex-wrap gap-2">
                  {getColorData().map((colorData, index) => (
                    <motion.button
                      key={`${colorData.color}-${index}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleColorSelection(colorData)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 group
                        ${
                          selectedColor === colorData.colorName
                            ? "ring-2 ring-black ring-offset-2 border-white shadow-lg"
                            : "border-gray-300 hover:border-gray-500 shadow-md hover:shadow-lg"
                        }`}
                      style={{
                        backgroundColor: colorData.color,
                        boxShadow:
                          selectedColor === colorData.colorName
                            ? `0 0 0 2px white, 0 0 0 4px ${colorData.color}40`
                            : "none",
                      }}
                    >
                      {/* Selection checkmark */}
                      {selectedColor === colorData.colorName && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-4 h-4 text-white drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}

                      {/* Hover tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {colorData.colorName}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Selected color info */}
                {selectedColorVariant && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg"
                  >
                    <strong>{selectedColorVariant.colorName}</strong> variant
                    selected
                    {selectedColorVariant.colorCode && (
                      <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                        {selectedColorVariant.colorCode}
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Quantity Control */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <span className="font-medium text-gray-800 text-sm">
                  Quantity
                </span>
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full transition text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-medium text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(collection.stock, quantity + 1))
                    }
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full transition text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  ({collection.stock} available)
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#4b1e1e] text-white py-3 rounded-full flex items-center justify-center space-x-2 font-medium hover:bg-[#3a1717] transition text-sm"
                >
                  <FaShoppingCart className="text-sm" />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="flex-1 bg-white border-2 border-black text-black py-3 rounded-full flex items-center justify-center space-x-2 font-medium hover:bg-gray-50 transition text-sm"
                >
                  <span>Buy Now</span>
                </motion.button>
              </motion.div>

              {/* Additional Product Information */}
              <motion.div
                variants={itemVariants}
                className="mt-4 space-y-2 bg-gray-50 p-4 rounded-xl"
              >
                <div className="flex items-center space-x-2">
                  <FaTruck className="text-blue-500 text-sm" />
                  <span className="text-gray-700 text-xs">
                    Free shipping on orders over ₹1000
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUndo className="text-blue-500 text-sm" />
                  <span className="text-gray-700 text-xs">
                    Easy 30 days return policy
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdSecurity className="text-blue-500 text-sm" />
                  <span className="text-gray-700 text-xs">
                    Secure payment guaranteed
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 p-8">
            {/* IMAGE GALLERY SECTION */}
            <ProductImageGallery
              collection={collection}
              selectedColorVariant={selectedColorVariant}
              selectedColor={selectedColor}
              isInWishlist={isInWishlist(collection.id)}
              onWishlistToggle={handleWishlistToggle}
            />

            {/* PRODUCT DETAILS SECTION */}
            <div className="space-y-6">
              {/* Product Title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-light text-gray-900 tracking-wide"
              >
                {collection.title}
              </motion.h1>

              {/* Rating Section */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < 4 ? "text-amber-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(126 reviews)</span>
              </motion.div>

              {/* Product Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-700 leading-relaxed"
              >
                {collection.desc}
              </motion.p>

              {/* Price Section */}
              <motion.div
                variants={itemVariants}
                className="flex items-baseline space-x-4"
              >
                <span className="text-3xl font-light text-black">
                  {selectedCurrency.symbol}
                  {formatPrice(convertPrice(collection.discountPrice))}
                </span>
                {collection.originalPrice > collection.discountPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.originalPrice))}
                    </span>
                    <span className="text-green-600 font-medium">
                      {calculateDiscountPercentage()}% OFF
                    </span>
                  </>
                )}
              </motion.div>

              {/* COLOR SELECTION */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-lg">
                    Select Color
                  </span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {selectedColor || "Choose a color"}
                  </span>
                </div>

                <div className="flex space-x-3 flex-wrap gap-2">
                  {getColorData().map((colorData, index) => (
                    <motion.button
                      key={`${colorData.color}-${index}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleColorSelection(colorData)}
                      className={`relative w-14 h-14 rounded-full border-3 transition-all duration-300 group
                        ${
                          selectedColor === colorData.colorName
                            ? "ring-3 ring-black ring-offset-3 border-white shadow-lg"
                            : "border-gray-300 hover:border-gray-500 shadow-md hover:shadow-lg"
                        }`}
                      style={{
                        backgroundColor: colorData.color,
                        boxShadow:
                          selectedColor === colorData.colorName
                            ? `0 0 0 2px white, 0 0 0 4px ${colorData.color}40`
                            : "none",
                      }}
                    >
                      {/* Selection checkmark */}
                      {selectedColor === colorData.colorName && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-6 h-6 text-white drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}

                      {/* Hover tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {colorData.colorName}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Selected color info */}
                {selectedColorVariant && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
                  >
                    <strong>{selectedColorVariant.colorName}</strong> variant
                    selected
                    {selectedColorVariant.colorCode && (
                      <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                        {selectedColorVariant.colorCode}
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Quantity Control */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-6"
              >
                <span className="font-medium text-gray-800">Quantity</span>
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-full transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(collection.stock, quantity + 1))
                    }
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-full transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  ({collection.stock} available)
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#4b1e1e] text-white py-4 rounded-full flex items-center justify-center space-x-2 font-medium hover:bg-[#3a1717] transition"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="flex-1 bg-white border-2 border-black text-black py-4 rounded-full flex items-center justify-center space-x-2 font-medium hover:bg-gray-50 transition"
                >
                  <span>Buy Now</span>
                </motion.button>
              </motion.div>

              {/* Additional Product Information */}
              <motion.div
                variants={itemVariants}
                className="mt-6 space-y-3 bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <FaTruck className="text-blue-500 text-lg" />
                  <span className="text-gray-700">
                    Free shipping on orders over ₹1000
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUndo className="text-blue-500 text-lg" />
                  <span className="text-gray-700">
                    Easy 30 days return policy
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MdSecurity className="text-blue-500 text-lg" />
                  <span className="text-gray-700">
                    Secure payment guaranteed
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Product Details Tabs */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-white rounded-3xl shadow-xl p-8"
        >
          <ProductDetailsTabs product={collection} />
        </motion.div>

        {/* Recommended Products */}
        <motion.div variants={itemVariants} className="mt-16">
          <RecommendedProducts products={getRecommendedProducts()} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CollectionDetails;
