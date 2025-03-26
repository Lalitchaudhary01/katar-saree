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
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();

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
    const wishlistItem = {
      id: collection.id,
      title: collection.title,
      image: mainImage,
      discountPrice: collection.discountPrice,
      originalPrice: collection.originalPrice,
      stock: collection.stock,
      specialty: collection.specialty,
      colors: collection.colors,
    };

    // Check if the item is already in the wishlist
    const isCurrentlyInWishlist = isInWishlist(collection.id);

    // Toggle the wishlist
    toggleWishlist(wishlistItem);

    // Show appropriate toast message
    if (isCurrentlyInWishlist) {
      toast.success(`${collection.title} removed from your wishlist!`);
    } else {
      toast.success(`${collection.title} added to your wishlist!`);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color before adding to cart!");
      return;
    }

    const cartItem = {
      id: collection.id,
      title: collection.title,
      image: mainImage,
      price: collection.discountPrice,
      color: selectedColor,
      quantity: quantity,
      stock: collection.stock || 10,
      details: {
        color: collection.details?.color || selectedColor,
        technique: collection.details?.technique || "",
        fabric: collection.details?.fabric || collection.material || "",
        speciality: collection.details?.speciality || collection.desc || "",
      },
    };

    addToCart(cartItem);
    toast.success(`${collection.title} added to your cart!`);
  };

  const handleBuyNow = () => {
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
                className="flex-1 bg-black text-white py-4 rounded-full flex items-center justify-center space-x-2"
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

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useCurrency } from "../context/currencyContext";
// import { useWishlist } from "../context/WishlistContext";
// import collections from "../assets/product/CollectionData";
// import newArrivals from "../assets/product/NewArrival";
// import silkSarees from "../assets/product/SilkSaree";
// import banarasiProducts from "../assets/product/BanarasiProduct";
// import { toast } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaShoppingCart,
//   FaHeart,
//   FaShare,
//   FaStar,
//   FaChevronRight,
//   FaTruck,
//   FaUndo,
// } from "react-icons/fa";
// import { CgSize } from "react-icons/cg";
// import { MdSecurity } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// // Import the components
// import RecommendedProducts from "./RecommendedProducts";
// import ProductDetailsTabs from "./ProductDetailsTabs";

// const CollectionDetails = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const { isInWishlist, toggleWishlist } = useWishlist();
//   const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
//   const navigate = useNavigate();

//   // Convert id to string for Banarasi products and number for other collections
//   const productId = isNaN(Number(id)) ? id : Number(id);

//   // Expanded search across all product collections
//   const collection =
//     collections.find((item) => item.id === productId) ||
//     newArrivals.find((item) => item.id === productId) ||
//     silkSarees.find((item) => item.id === productId) ||
//     banarasiProducts.find((item) => item.id === productId);

//   const [selectedColor, setSelectedColor] = useState(null);
//   const [mainImage, setMainImage] = useState(collection?.images[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomed, setZoomed] = useState(false);
//   const [touchStartX, setTouchStartX] = useState(null);
//   const [touchEndX, setTouchEndX] = useState(null);

//   // Handle touch events for image swiping
//   const handleTouchStart = (e) => {
//     setTouchStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEndX(e.touches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStartX && touchEndX) {
//       const diffX = touchStartX - touchEndX;
//       if (diffX > 50) {
//         // Swipe left
//         const currentIndex = collection.images.indexOf(mainImage);
//         const nextIndex = (currentIndex + 1) % collection.images.length;
//         setMainImage(collection.images[nextIndex]);
//       } else if (diffX < -50) {
//         // Swipe right
//         const currentIndex = collection.images.indexOf(mainImage);
//         const prevIndex =
//           (currentIndex - 1 + collection.images.length) %
//           collection.images.length;
//         setMainImage(collection.images[prevIndex]);
//       }
//     }
//     setTouchStartX(null);
//     setTouchEndX(null);
//   };

//   // Modified to include all product collections
//   const getRecommendedProducts = () => {
//     const allProducts = [
//       ...collections,
//       ...newArrivals,
//       ...silkSarees,
//       ...banarasiProducts,
//     ];
//     const filteredProducts = allProducts.filter(
//       (item) => item.id !== productId
//     );
//     return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Modify color handling to support both named and hex colors
//   const processColor = (color) => {
//     // If color is a hex code, convert to name or use hex
//     if (color.startsWith("#")) {
//       const colorMap = {
//         "#8B0000": "Maroon",
//         "#FFD700": "Gold",
//         "#228B22": "Green",
//         "#800080": "Purple",
//         "#C0C0C0": "Silver",
//         "#000080": "Navy",
//         "#FF4500": "Orange Red",
//         "#4169E1": "Royal Blue",
//         "#000000": "Black",
//         "#FFDAB9": "Peach",
//         "#E6E6FA": "Lavender",
//         "#87CEFA": "Light Blue",
//         "#CD853F": "Peru",
//         "#A0522D": "Sienna",
//         "#D2B48C": "Tan",
//         "#556B2F": "Dark Olive Green",
//         "#8FBC8F": "Dark Sea Green",
//         "#2E8B57": "Sea Green",
//       };
//       return colorMap[color] || color;
//     }
//     return color;
//   };

//   // Modify colors array processing
//   const processedColors = collection?.colors?.map(processColor) || [];

//   // Handle product not found
//   if (!collection) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 font-[Garamond]">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl font-bold text-black mb-4">
//             Product Not Found
//           </h2>
//           <p className="text-gray-800 text-xl">
//             The saree you're looking for is no longer available.
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition font-light text-lg tracking-wide"
//           >
//             Continue Shopping
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   // Handle double-click zoom
//   const handleDoubleClickZoom = (e) => {
//     const image = e.currentTarget;
//     if (!zoomed) {
//       const { left, top, width, height } = image.getBoundingClientRect();
//       const x = ((e.clientX - left) / width) * 100;
//       const y = ((e.clientY - top) / height) * 100;

//       image.style.transformOrigin = `${x}% ${y}%`;
//       image.style.transform = "scale(2.5)";
//     } else {
//       image.style.transform = "scale(1)";
//     }
//     setZoomed(!zoomed);
//   };

//   // Wishlist toggle handler
//   const handleWishlistToggle = () => {
//     const wishlistItem = {
//       id: collection.id,
//       title: collection.title,
//       image: mainImage,
//       discountPrice: collection.discountPrice,
//       originalPrice: collection.originalPrice,
//       stock: collection.stock,
//       specialty: collection.specialty,
//       colors: collection.colors,
//     };

//     toggleWishlist(wishlistItem);

//     if (isInWishlist(collection.id)) {
//       toast.success(`${collection.title} removed from your wishlist!`);
//     } else {
//       toast.success(`${collection.title} added to your wishlist!`);
//     }
//   };

//   // Add to cart handler
//   const handleAddToCart = () => {
//     if (!selectedColor) {
//       toast.error("Please select a color before adding to cart!");
//       return;
//     }

//     const cartItem = {
//       id: collection.id,
//       title: collection.title,
//       image: mainImage,
//       price: collection.discountPrice,
//       color: selectedColor,
//       quantity: quantity,
//       stock: collection.stock || 10, // Default stock if not provided
//       details: {
//         color: collection.details?.color || selectedColor,
//         technique: collection.details?.technique || "",
//         fabric: collection.details?.fabric || collection.material || "",
//         speciality: collection.details?.speciality || collection.desc || "",
//       },
//     };

//     addToCart(cartItem);
//     toast.success(`${collection.title} added to your cart!`);
//   };

//   // Buy now handler
//   const handleBuyNow = () => {
//     if (!selectedColor) {
//       toast.error("Please select a color before proceeding to purchase!");
//       return;
//     }
//     navigate("/checkout", {
//       state: {
//         image: mainImage,
//         title: collection.title,
//         quantity,
//         color: selectedColor,
//         amount: collection.discountPrice * quantity,
//       },
//     });
//   };

//   // Calculate discount percentage
//   const discountPercentage = Math.round(
//     ((collection.originalPrice - collection.discountPrice) /
//       collection.originalPrice) *
//       100
//   );

//   // Animation variants
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const imageTransition = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, transition: { duration: 0.2 } },
//   };

//   return (
//     <div className="bg-white py-12 md:py-16 font-[Garamond]">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Breadcrumb */}
//         <div className="text-sm md:text-base text-black mb-6 md:mb-8 flex items-center overflow-x-auto whitespace-nowrap pb-2">
//           <span
//             className="hover:underline cursor-pointer transition-colors duration-300"
//             onClick={() => navigate("/")}
//           >
//             Home
//           </span>
//           <FaChevronRight className="mx-2 text-xs text-gray-400" />
//           <span
//             className="hover:underline cursor-pointer transition-colors duration-300"
//             onClick={() => navigate("/collections")}
//           >
//             Collections
//           </span>
//           <FaChevronRight className="mx-2 text-xs text-gray-400" />
//           <span className="text-black font-medium truncate max-w-xs">
//             {collection.title}
//           </span>
//         </div>

//         <motion.div
//           variants={fadeIn}
//           initial="initial"
//           animate="animate"
//           className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-100"
//         >
//           <div className="flex flex-col lg:flex-row">
//             {/* Left side - Images */}
//             <div className="lg:w-3/5 p-4 md:p-8">
//               <div className="sticky top-16 md:top-24">
//                 <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
//                   {/* Thumbnails */}
//                   <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 flex-shrink-0 max-h-80 md:max-h-full scrollbar-hide">
//                     {collection.images.slice(0, 5).map((img, index) => (
//                       <motion.div
//                         key={index}
//                         className={`relative overflow-hidden cursor-pointer flex-shrink-0 rounded-lg ${
//                           mainImage === img
//                             ? "ring-2 ring-black shadow-md"
//                             : "ring-1 ring-gray-200"
//                         }`}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => setMainImage(img)}
//                       >
//                         <img
//                           src={img}
//                           alt={`Thumbnail ${index + 1}`}
//                           className="w-16 md:w-20 h-16 md:h-20 object-cover"
//                         />
//                         {mainImage === img && (
//                           <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="absolute inset-0 bg-black bg-opacity-5"
//                           />
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Main Image */}
//                   <div className="relative flex-1 overflow-hidden rounded-xl">
//                     <div className="group relative">
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={mainImage}
//                           className="relative overflow-hidden h-96 sm:h-96 md:h-[500px] lg:h-[600px]"
//                           variants={imageTransition}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                           onTouchStart={handleTouchStart}
//                           onTouchMove={handleTouchMove}
//                           onTouchEnd={handleTouchEnd}
//                         >
//                           {/* Discount Badge */}
//                           <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10">
//                             {discountPercentage > 0 && (
//                               <motion.span
//                                 className="bg-black text-white px-3 py-1 md:px-4 md:py-1 text-sm md:text-base font-light tracking-wider rounded-lg"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.2 }}
//                               >
//                                 {discountPercentage}% OFF
//                               </motion.span>
//                             )}
//                           </div>

//                           {/* Main Image */}
//                           <img
//                             src={mainImage}
//                             alt={collection.title}
//                             className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 ease-out"
//                             onDoubleClick={handleDoubleClickZoom}
//                             onMouseEnter={() => setShowZoom(true)}
//                             onMouseLeave={() => setShowZoom(false)}
//                           />

//                           {/* Zoom Overlay */}
//                           {showZoom && (
//                             <div
//                               className="absolute inset-0 bg-cover bg-no-repeat opacity-0 group-hover:opacity-100 z-20 cursor-zoom-out"
//                               style={{
//                                 backgroundImage: `url(${mainImage})`,
//                                 backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                                 transform: "scale(1.5)",
//                               }}
//                               onMouseMove={(e) => {
//                                 const { left, top, width, height } =
//                                   e.currentTarget.getBoundingClientRect();
//                                 const x = ((e.clientX - left) / width) * 100;
//                                 const y = ((e.clientY - top) / height) * 100;
//                                 setZoomPosition({ x, y });
//                               }}
//                               onMouseLeave={() => setShowZoom(false)}
//                             />
//                           )}
//                         </motion.div>
//                       </AnimatePresence>

//                       {/* Wishlist and Share Buttons */}
//                       <div className="absolute right-3 top-3 md:right-6 md:top-6 flex flex-col gap-3 z-10">
//                         <motion.button
//                           className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
//                             isInWishlist(collection.id)
//                               ? "bg-red-500 text-white"
//                               : "bg-white text-gray-700"
//                           } shadow-md backdrop-blur-sm bg-opacity-90`}
//                           onClick={handleWishlistToggle}
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <FaHeart
//                             className={
//                               isInWishlist(collection.id)
//                                 ? "text-white text-sm md:text-lg"
//                                 : "text-gray-400 text-sm md:text-lg"
//                             }
//                           />
//                         </motion.button>

//                         <motion.button
//                           className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-gray-700 shadow-md backdrop-blur-sm bg-opacity-90 flex items-center justify-center"
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <FaShare className="text-gray-400 text-sm md:text-lg" />
//                         </motion.button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Details */}
//             <div className="lg:w-2/5 p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
//               {/* Basic product info */}
//               <div>
//                 <motion.div
//                   className="flex items-center gap-2 mb-3 md:mb-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <div className="flex text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         className={`text-sm md:text-base ${
//                           i < 4 ? "text-amber-400" : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-gray-500 text-sm md:text-base">
//                     (126 reviews)
//                   </span>
//                 </motion.div>

//                 <motion.h1
//                   className="text-2xl md:text-4xl font-normal text-black tracking-wide"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {collection.title}
//                 </motion.h1>

//                 <motion.p
//                   className="mt-3 md:mt-4 text-gray-700 leading-relaxed text-base md:text-lg line-clamp-3"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {collection.desc}
//                 </motion.p>

//                 <motion.div
//                   className="flex flex-wrap items-baseline gap-2 md:gap-4 mt-6 md:mt-8"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <span className="text-2xl md:text-3xl font-light text-black">
//                     {selectedCurrency.symbol}
//                     {formatPrice(convertPrice(collection.discountPrice))}
//                   </span>
//                   {collection.originalPrice > collection.discountPrice && (
//                     <span className="text-lg md:text-xl text-gray-500 line-through">
//                       {selectedCurrency.symbol}
//                       {formatPrice(convertPrice(collection.originalPrice))}
//                     </span>
//                   )}
//                   {discountPercentage > 0 && (
//                     <span className="text-base md:text-lg font-light text-green-800">
//                       save {selectedCurrency.symbol}
//                       {formatPrice(
//                         convertPrice(
//                           collection.originalPrice - collection.discountPrice
//                         )
//                       )}
//                     </span>
//                   )}
//                 </motion.div>
//               </div>
//               <div className="h-px bg-gray-100 my-6 md:my-8"></div>
//               {/* Color Selection Section */}
//               <motion.div
//                 className="p-4 md:p-5 rounded-xl shadow-sm bg-gray-50 mb-5 md:mb-6"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <div className="flex justify-between items-center mb-3 md:mb-4">
//                   <span className="font-medium text-base md:text-lg text-black">
//                     Color
//                   </span>
//                   <span className="text-xs md:text-sm text-black">
//                     {selectedColor || "Select a color"}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-4">
//                   {processedColors.map((color, index) => {
//                     // Find the original color (hex or name) for background
//                     const originalColor = collection.colors[index];
//                     return (
//                       <motion.button
//                         key={index}
//                         className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full transition-all ${
//                           selectedColor === color
//                             ? "ring-2 ring-offset-2 ring-black"
//                             : "ring-1 ring-gray-200"
//                         }`}
//                         onClick={() => setSelectedColor(color)}
//                         whileHover={{ scale: 1.1, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <span
//                           className="absolute inset-0 rounded-full"
//                           style={{
//                             backgroundColor: originalColor.startsWith("#")
//                               ? originalColor
//                               : color,
//                           }}
//                         ></span>
//                       </motion.button>
//                     );
//                   })}
//                 </div>
//               </motion.div>

//               {/* Quantity Selection */}
//               <motion.div
//                 className="mb-5 md:mb-6"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <span className="font-medium text-black block mb-3 md:mb-4">
//                   Quantity
//                 </span>
//                 <div className="flex items-center border border-gray-200 rounded-lg w-36 overflow-hidden">
//                   <motion.button
//                     className="w-12 h-12 flex items-center justify-center text-lg text-black hover:bg-gray-50"
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     -
//                   </motion.button>
//                   <span className="flex-1 text-center font-light">
//                     {quantity}
//                   </span>
//                   <motion.button
//                     className="w-12 h-12 flex items-center justify-center text-lg text-black hover:bg-gray-50"
//                     onClick={() =>
//                       setQuantity(Math.min(collection.stock, quantity + 1))
//                     }
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     +
//                   </motion.button>
//                 </div>
//               </motion.div>

//               {/* Action Buttons */}
//               <motion.div
//                 className="flex gap-4 mt-6 md:mt-8"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <motion.button
//                   className="flex-1 bg-white border-2 border-black text-black py-3 md:py-4 rounded-xl font-medium flex items-center justify-center gap-2 text-sm md:text-base transition-colors hover:bg-black hover:text-white"
//                   onClick={handleAddToCart}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <FaShoppingCart className="text-sm md:text-base" />
//                   Add to Cart
//                 </motion.button>
//                 <motion.button
//                   className="flex-1 bg-black text-white py-3 md:py-4 rounded-xl font-medium text-sm md:text-base transition-colors hover:bg-gray-900"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleBuyNow}
//                 >
//                   Buy Now
//                 </motion.button>
//               </motion.div>

//               {/* Product information - Compact for mobile */}
//               <motion.div
//                 className="mt-8 md:mt-10 space-y-3 md:space-y-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <div className="flex items-center gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
//                   <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//                     <FaTruck className="text-blue-500 text-sm md:text-base" />
//                   </div>
//                   <span>Free shipping on orders over ₹1000</span>
//                 </div>
//                 <div className="flex items-center gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
//                   <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//                     <FaUndo className="text-blue-500 text-sm md:text-base" />
//                   </div>
//                   <span>Easy 30 days return policy</span>
//                 </div>
//                 <div className="flex items-center gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
//                   <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//                     <MdSecurity className="text-blue-500 text-sm md:text-base" />
//                   </div>
//                   <span>Secure payment guaranteed</span>
//                 </div>
//               </motion.div>

//               {/* Stock info */}
//               <motion.div
//                 className="mt-6 md:mt-8 p-4 bg-gray-50 rounded-xl"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.9 }}
//               >
//                 <div className="flex items-center gap-2 text-sm md:text-base">
//                   <span className="font-medium text-black">Availability:</span>
//                   <span
//                     className={
//                       collection.stock > 0 ? "text-green-600" : "text-red-600"
//                     }
//                   >
//                     {collection.stock > 0
//                       ? `In Stock (${collection.stock} left)`
//                       : "Out of Stock"}
//                   </span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Product details tabs - Scrollable for mobile */}
//           <ProductDetailsTabs product={collection} />
//         </motion.div>

//         {/* Recommended Products */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.5 }}
//         >
//           <RecommendedProducts products={getRecommendedProducts()} />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default CollectionDetails;
