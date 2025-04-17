import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaHeart,
  FaShare,
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

// Component Imports
import RecommendedProducts from "./RecommendedProducts";
import ProductDetailsTabs from "./ProductDetailsTabs";

const CollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist(); // Changed from toggleWishlist to toggleWishlistItem
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const { userInfo } = useSelector((state) => state.auth);

  // Product Collection Logic
  const productId = isNaN(Number(id)) ? id : Number(id);
  const collection =
    collections.find((item) => item.id === productId) ||
    newArrivals.find((item) => item.id === productId) ||
    silkSarees.find((item) => item.id === productId) ||
    banarasiProducts.find((item) => item.id === productId);

  // State Management
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(collection?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [imageZoom, setImageZoom] = useState({
    isZoomed: false,
    position: { x: 0, y: 0 },
  });

  // Utility Functions
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
    };
    return color.startsWith("#") ? colorMap[color] || color : color;
  };

  const processedColors = collection?.colors?.map(processColor) || [];

  // Image Zoom Handler
  const handleImageZoom = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Toggle zoom on double click
    setImageZoom((prev) => ({
      isZoomed: !prev.isZoomed,
      position: { x, y },
    }));
  };

  const handleMouseMove = (e) => {
    if (imageZoom.isZoomed) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setImageZoom((prev) => ({
        ...prev,
        position: { x, y },
      }));
    }
  };

  // Handlers
  const handleWishlistToggle = () => {
    if (!userInfo) {
      navigate("/login", { state: { from: `/collection/${id}` } });
      return;
    }

    const wishlistItem = {
      id: collection.id,
      productId: collection.id, // Added to match context expectation
      title: collection.title,
      image: mainImage,
      discountPrice: collection.discountPrice,
      originalPrice: collection.originalPrice,
      discount: calculateDiscountPercentage(), // Added to match context
      colors: collection.colors,
      desc: collection.desc, // Added to match context
      currencyCode: selectedCurrency.code, // Added to match context
      currencySymbol: selectedCurrency.symbol, // Added to match context
      stock: collection.stock,
      specialty: collection.specialty,
    };

    const isCurrentlyInWishlist = isInWishlist(collection.id);
    toggleWishlistItem(wishlistItem); // Changed from toggleWishlist to toggleWishlistItem to match context

    if (isCurrentlyInWishlist) {
      toast.success(`${collection.title} removed from your wishlist!`);
    } else {
      toast.success(`${collection.title} added to your wishlist!`);
    }
  };

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
      name: collection.title, // Changed from title to name
      price: collection.discountPrice,
      image: mainImage,
      color: selectedColor,
      quantity: quantity,
      // Include any other required fields
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
        image: mainImage,
        title: collection.title,
        quantity,
        color: selectedColor,
        amount: collection.discountPrice * quantity,
      },
    });
  };

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
    ];
    const filteredProducts = allProducts.filter(
      (item) => item.id !== productId
    );
    return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
  };

  // Render Logic
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 font-[Garamond]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 max-w-6xl"
      >
        {/* Breadcrumb */}
        <motion.div
          variants={itemVariants}
          className="text-sm text-gray-600 mb-8 flex items-center"
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
          <span className="font-semibold">{collection.title}</span>
        </motion.div>

        {/* Product Details Container */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-12 p-8"
        >
          {/* Image Gallery */}
          <div className="relative">
            <AnimatePresence>
              <motion.div className="relative overflow-hidden" key={mainImage}>
                <motion.img
                  src={mainImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onDoubleClick={handleImageZoom}
                  onMouseMove={handleMouseMove}
                  className={`w-full h-[600px] object-cover rounded-2xl transition-transform duration-300 
                ${imageZoom.isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  style={
                    imageZoom.isZoomed
                      ? {
                          transform: `scale(2)`,
                          transformOrigin: `${imageZoom.position.x}% ${imageZoom.position.y}%`,
                        }
                      : {}
                  }
                />
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-4 mt-6 overflow-x-auto">
              {collection.images.slice(0, 5).map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer 
                    ${mainImage === img ? "ring-2 ring-black" : "opacity-70"}`}
                />
              ))}
            </div>

            {/* Wishlist and Share Buttons */}
            <div className="absolute top-4 right-4 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isInWishlist(collection.id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700"
                } shadow-md`}
              >
                <FaHeart
                  className={
                    isInWishlist(collection.id) ? "text-white" : "text-gray-400"
                  }
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white text-gray-700 shadow-md flex items-center justify-center"
              >
                <FaShare className="text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-light text-gray-900 tracking-wide"
            >
              {collection.title}
            </motion.h1>

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

            {/* Color Selection */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Color</span>
                <span className="text-sm text-gray-600">
                  {selectedColor || "Select a color"}
                </span>
              </div>
              <div className="flex space-x-4">
                {processedColors.map((color, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 
                      ${
                        selectedColor === color
                          ? "ring-2 ring-black"
                          : "border-gray-200"
                      }`}
                    style={{
                      backgroundColor: collection.colors[index].startsWith("#")
                        ? collection.colors[index]
                        : color,
                    }}
                  />
                ))}
              </div>
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
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-full"
                >
                  -
                </button>
                <span className="px-6">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(collection.stock, quantity + 1))
                  }
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-full"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 bg-[#4b1e1e] text-white py-4 rounded-full flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="flex-1 bg-white border border-black text-black py-4 rounded-full flex items-center justify-center space-x-2"
              >
                <span>Buy Now</span>
              </motion.button>
            </motion.div>

            {/* Additional Product Information */}
            <motion.div
              variants={itemVariants}
              className="mt-6 space-y-3 bg-gray-50 p-4 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <FaTruck className="text-blue-500" />
                <span>Free shipping on orders over ₹1000</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaUndo className="text-blue-500" />
                <span>Easy 30 days return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdSecurity className="text-blue-500" />
                <span>Secure payment guaranteed</span>
              </div>
            </motion.div>
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
