import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";
import { useWishlist } from "../context/WishlistContext";
import collections from "../assets/product/CollectionData";
import newArrivals from "../assets/product/NewArrival";
import silkSarees from "../assets/product/SilkSaree";
import { toast } from "react-hot-toast";
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
import { CgSize } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Import the components
import RecommendedProducts from "./RecommendedProducts";
import ProductDetailsTabs from "./ProductDetailsTabs";

const CollectionDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();

  const numericId = Number(id);

  const collection =
    collections.find((item) => item.id === numericId) ||
    newArrivals.find((item) => item.id === numericId) ||
    silkSarees.find((item) => item.id === numericId);

  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(collection?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Get recommended products
  const getRecommendedProducts = () => {
    const allProducts = [...collections, ...newArrivals, ...silkSarees];
    const filteredProducts = allProducts.filter(
      (item) => item.id !== numericId
    );
    return filteredProducts.sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const diffX = touchStartX - touchEndX;
      if (diffX > 50) {
        // Swipe left
        const currentIndex = collection.images.indexOf(mainImage);
        const nextIndex = (currentIndex + 1) % collection.images.length;
        setMainImage(collection.images[nextIndex]);
      } else if (diffX < -50) {
        // Swipe right
        const currentIndex = collection.images.indexOf(mainImage);
        const prevIndex =
          (currentIndex - 1 + collection.images.length) %
          collection.images.length;
        setMainImage(collection.images[prevIndex]);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Handle product not found
  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-96 font-[Garamond]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-black mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-800 text-xl">
            The saree you're looking for is no longer available.
          </p>
          <button className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition font-light text-lg tracking-wide">
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

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
      stock: collection.stock,
      details: {
        color: collection.details?.color || selectedColor,
        technique: collection.details?.technique || "",
        fabric: collection.details?.fabric || "",
        speciality: collection.details?.speciality || "",
      },
    };

    addToCart(cartItem);
    toast.success(`${collection.title} added to your cart!`);
  };

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

    toggleWishlist(wishlistItem);

    if (isInWishlist(collection.id)) {
      toast.success(`${collection.title} removed from your wishlist!`);
    } else {
      toast.success(`${collection.title} added to your wishlist!`);
    }
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

  const handleDoubleClickZoom = (e) => {
    const image = e.currentTarget;
    if (!zoomed) {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      image.style.transformOrigin = `${x}% ${y}%`;
      image.style.transform = "scale(2.5)";
    } else {
      image.style.transform = "scale(1)";
    }
    setZoomed(!zoomed);
  };

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((collection.originalPrice - collection.discountPrice) /
      collection.originalPrice) *
      100
  );

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white py-12 md:py-16 font-[Garamond]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb - Enhanced for mobile */}
        <div className="text-sm md:text-base text-black mb-6 md:mb-8 flex items-center overflow-x-auto whitespace-nowrap pb-2">
          <span className="hover:underline cursor-pointer transition-colors duration-300">
            Home
          </span>
          <FaChevronRight className="mx-2 text-xs text-gray-400" />
          <span className="hover:underline cursor-pointer transition-colors duration-300">
            Collections
          </span>
          <FaChevronRight className="mx-2 text-xs text-gray-400" />
          <span className="text-black font-medium truncate max-w-xs">
            {collection.title}
          </span>
        </div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images - Improved for mobile */}
            <div className="lg:w-3/5 p-4 md:p-8">
              <div className="sticky top-16 md:top-24">
                <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
                  {/* Thumbnails - Horizontal scroll on mobile, vertical on desktop */}
                  <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 flex-shrink-0 max-h-80 md:max-h-full scrollbar-hide">
                    {collection.images.slice(0, 5).map((img, index) => (
                      <motion.div
                        key={index}
                        className={`relative overflow-hidden cursor-pointer flex-shrink-0 rounded-lg ${
                          mainImage === img
                            ? "ring-2 ring-black shadow-md"
                            : "ring-1 ring-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMainImage(img)}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-16 md:w-20 h-16 md:h-20 object-cover"
                        />
                        {mainImage === img && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black bg-opacity-5"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Image with fade animation - FIXED HEIGHT ISSUE HERE */}
                  <div className="relative flex-1 overflow-hidden rounded-xl">
                    <div className="group relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={mainImage}
                          className="relative overflow-hidden h-96 sm:h-96 md:h-[500px] lg:h-[600px]"
                          variants={imageTransition}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        >
                          <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10">
                            {discountPercentage > 0 && (
                              <motion.span
                                className="bg-black text-white px-3 py-1 md:px-4 md:py-1 text-sm md:text-base font-light tracking-wider rounded-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                {discountPercentage}% OFF
                              </motion.span>
                            )}
                          </div>

                          {/* Main Image */}
                          <img
                            src={mainImage}
                            alt={collection.title}
                            className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 ease-out"
                            onDoubleClick={handleDoubleClickZoom}
                          />

                          {/* Zoom Overlay */}
                          {showZoom && (
                            <div
                              className="absolute inset-0 bg-cover bg-no-repeat opacity-0 group-hover:opacity-100 z-20 cursor-zoom-out"
                              style={{
                                backgroundImage: `url(${mainImage})`,
                                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                transform: "scale(1.5)",
                              }}
                              onMouseMove={(e) => {
                                const { left, top, width, height } =
                                  e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - left) / width) * 100;
                                const y = ((e.clientY - top) / height) * 100;
                                setZoomPosition({ x, y });
                              }}
                              onMouseLeave={() => setShowZoom(false)}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Wishlist and Share Buttons */}
                      <div className="absolute right-3 top-3 md:right-6 md:top-6 flex flex-col gap-3 z-10">
                        <motion.button
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                            isInWishlist(collection.id)
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-700"
                          } shadow-md backdrop-blur-sm bg-opacity-90`}
                          onClick={handleWishlistToggle}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaHeart
                            className={
                              isInWishlist(collection.id)
                                ? "text-white text-sm md:text-lg"
                                : "text-gray-400 text-sm md:text-lg"
                            }
                          />
                        </motion.button>

                        <motion.button
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-gray-700 shadow-md backdrop-blur-sm bg-opacity-90 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaShare className="text-gray-400 text-sm md:text-lg" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Details - Enhanced for mobile */}
            <div className="lg:w-2/5 p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
              {/* Basic product info */}
              <div>
                <motion.div
                  className="flex items-center gap-2 mb-3 md:mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm md:text-base ${
                          i < 4 ? "text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm md:text-base">
                    (126 reviews)
                  </span>
                </motion.div>

                <motion.h1
                  className="text-2xl md:text-4xl font-normal text-black tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {collection.title}
                </motion.h1>

                <motion.p
                  className="mt-3 md:mt-4 text-gray-700 leading-relaxed text-base md:text-lg line-clamp-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {collection.desc}
                </motion.p>

                <motion.div
                  className="flex flex-wrap items-baseline gap-2 md:gap-4 mt-6 md:mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-2xl md:text-3xl font-light text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(collection.discountPrice))}
                  </span>
                  {collection.originalPrice > collection.discountPrice && (
                    <span className="text-lg md:text-xl text-gray-500 line-through">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.originalPrice))}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="text-base md:text-lg font-light text-green-800">
                      save {selectedCurrency.symbol}
                      {formatPrice(
                        convertPrice(
                          collection.originalPrice - collection.discountPrice
                        )
                      )}
                    </span>
                  )}
                </motion.div>
              </div>

              <div className="h-px bg-gray-100 my-6 md:my-8"></div>

              {/* Colors - More touch-friendly on mobile */}
              <motion.div
                className="p-4 md:p-5 rounded-xl shadow-sm bg-gray-50 mb-5 md:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="font-medium text-base md:text-lg text-black">
                    Color
                  </span>
                  <span className="text-xs md:text-sm text-black">
                    {selectedColor || "Select a color"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {collection.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-black"
                          : "ring-1 ring-gray-200"
                      }`}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: color }}
                      ></span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Quantity - Larger touch targets for mobile */}
              <motion.div
                className="mb-5 md:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="font-medium text-black block mb-3 md:mb-4">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg w-36 overflow-hidden">
                  <motion.button
                    className="w-12 h-12 flex items-center justify-center text-lg text-black hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileTap={{ scale: 0.95 }}
                  >
                    -
                  </motion.button>
                  <span className="flex-1 text-center font-light">
                    {quantity}
                  </span>
                  <motion.button
                    className="w-12 h-12 flex items-center justify-center text-lg text-black hover:bg-gray-50"
                    onClick={() =>
                      setQuantity(Math.min(collection.stock, quantity + 1))
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>

              {/* Buttons - Better mobile layout */}
              <motion.div
                className="flex gap-4 mt-6 md:mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  className="flex-1 bg-white border-2 border-black text-black py-3 md:py-4 rounded-xl font-medium flex items-center justify-center gap-2 text-sm md:text-base transition-colors hover:bg-black hover:text-white"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShoppingCart className="text-sm md:text-base" />
                  Add to Cart
                </motion.button>
                <motion.button
                  className="flex-1 bg-black text-white py-3 md:py-4 rounded-xl font-medium text-sm md:text-base transition-colors hover:bg-gray-900"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </motion.button>
              </motion.div>

              {/* Product information - Compact for mobile */}
              <motion.div
                className="mt-8 md:mt-10 space-y-3 md:space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaTruck className="text-blue-500 text-sm md:text-base" />
                  </div>
                  <span>Free shipping on orders over ₹1000</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaUndo className="text-blue-500 text-sm md:text-base" />
                  </div>
                  <span>Easy 30 days return policy</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <MdSecurity className="text-blue-500 text-sm md:text-base" />
                  </div>
                  <span>Secure payment guaranteed</span>
                </div>
              </motion.div>

              {/* Stock info */}
              <motion.div
                className="mt-6 md:mt-8 p-4 bg-gray-50 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <span className="font-medium text-black">Availability:</span>
                  <span
                    className={
                      collection.stock > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {collection.stock > 0
                      ? `In Stock (${collection.stock} left)`
                      : "Out of Stock"}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Product details tabs - Scrollable for mobile */}
          <ProductDetailsTabs product={collection} />
        </motion.div>

        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <RecommendedProducts products={getRecommendedProducts()} />
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionDetails;
