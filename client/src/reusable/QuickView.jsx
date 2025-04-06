import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Context Hooks
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";

const QuickView = ({ selectedProduct, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen && selectedProduct) {
      setMainImage(selectedProduct.images[0]);
      setSelectedColor(null);
    }
  }, [isOpen, selectedProduct]);

  if (!isOpen || !selectedProduct) return null;

  const handleAddToCart = () => {
    if (!userInfo) {
      // Redirect to login if user is not logged in
      onClose();
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color before adding to cart!");
      return;
    }

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.title,
      image: mainImage,
      price: selectedProduct.discountPrice,
      color: selectedColor,
      originalPriceINR: selectedProduct.discountPrice,
    });

    toast.success(`${selectedProduct.title} added to cart!`);
    onClose();
  };

  const handleWishlistToggle = () => {
    if (!userInfo) {
      // Redirect to login if user is not logged in
      onClose();
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    const wishlistItem = {
      id: selectedProduct.id,
      title: selectedProduct.title,
      image: mainImage,
      images: selectedProduct.images,
      originalPrice: selectedProduct.originalPrice,
      discountPrice: selectedProduct.discountPrice,
      colors: selectedProduct.colors,
      discount: selectedProduct.discount,
      desc: selectedProduct.desc,
      currencyCode: selectedCurrency.code,
      currencySymbol: selectedCurrency.symbol,
    };

    const isCurrentlyInWishlist = isInWishlist(wishlistItem.id);
    toggleWishlist(wishlistItem);

    if (isCurrentlyInWishlist) {
      toast.success(`${selectedProduct.title} removed from wishlist`);
    } else {
      toast.success(`${selectedProduct.title} added to wishlist`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: Image gallery */}
              <div className="w-full md:w-3/5 bg-[#f9f7f5] p-4 md:p-6">
                <div
                  className="sidebar-image-container mb-3"
                  style={{
                    height: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={mainImage}
                    alt={selectedProduct.title}
                    className="w-auto h-auto max-w-full max-h-full sidebar-image object-contain"
                  />
                </div>

                <div className="flex gap-2 justify-center">
                  {selectedProduct.images.slice(0, 4).map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`sidebar-image-container w-12 h-12 cursor-pointer thumbnail ${
                        mainImage === img ? "active ring-2 ring-black" : ""
                      }`}
                      onClick={() => setMainImage(img)}
                    >
                      <img
                        src={img}
                        alt={`View ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Product details */}
              <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col">
                <button
                  className="self-end text-lg text-black hover:text-gray-700 transition-colors mb-2"
                  onClick={onClose}
                >
                  ✖
                </button>

                <h2 className="font-playfair text-xl md:text-2xl font-semibold text-black mb-2 tracking-wide">
                  {selectedProduct.title}
                </h2>

                <div className="flex items-center gap-3 mb-3">
                  {selectedProduct.originalPrice && (
                    <p className="text-gray-500 line-through text-sm font-cardo">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(selectedProduct.originalPrice))}
                    </p>
                  )}
                  <p className="text-black font-cardo text-base md:text-lg font-semibold">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(selectedProduct.discountPrice))}
                  </p>

                  {selectedProduct.discount && (
                    <span className="text-xs bg-black text-white px-2 py-0.5 rounded-sm font-cardo">
                      {selectedProduct.discount} OFF
                    </span>
                  )}
                </div>

                <p className="text-gray-600 font-cardo text-sm leading-relaxed mb-4 border-t border-b border-gray-100 py-3 max-h-24 overflow-y-auto">
                  {selectedProduct.desc}
                </p>

                <div className="mb-4">
                  <h3 className="font-playfair text-sm uppercase tracking-wider text-black mb-2">
                    Select Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors?.map((color, colorIndex) => (
                      <motion.button
                        key={colorIndex}
                        className={`color-swatch w-6 h-6 rounded-full ${
                          selectedColor === color
                            ? "ring-2 ring-offset-1 ring-black"
                            : "ring-1 ring-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      ></motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={handleWishlistToggle}
                    className="w-10 h-10 flex-shrink-0 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {isInWishlist(selectedProduct.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-800" />
                    )}
                  </button>

                  <motion.button
                    className={`flex-1 font-cardo text-sm tracking-wider uppercase py-2 px-4 rounded-sm flex items-center justify-center gap-2 transition-all ${
                      !selectedColor
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                    onClick={handleAddToCart}
                    disabled={!selectedColor}
                    whileHover={{ scale: selectedColor ? 1.02 : 1 }}
                    whileTap={{ scale: selectedColor ? 0.98 : 1 }}
                  >
                    <FaShoppingCart /> Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickView;
