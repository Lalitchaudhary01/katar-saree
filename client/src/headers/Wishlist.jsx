import React, { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaTrash,
  FaShareAlt,
  FaEye,
  FaCheck,
} from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});

  const handleColorSelect = (productId, color) => {
    setSelectedColors({ ...selectedColors, [productId]: color });
    toast.success("Color selected!");
  };

  const handleAddToCart = (item) => {
    if (item.colors?.length > 0 && !selectedColors[item.productId]) {
      toast.error("Please select a color first");
      return;
    }

    const cartItem = {
      id: item.productId,
      name: item.title,
      image: item.image,
      price: item.discountPrice,
      color: selectedColors[item.productId] || item.colors?.[0],
      quantity: 1,
    };

    addToCart(cartItem);
    toast.success(`${item.title} added to cart!`);
  };

  const handleViewProduct = (productId) => {
    navigate(`/collection/${productId}`);
  };

  const handleShareProduct = (productId) => {
    navigator.clipboard.writeText(
      window.location.origin + `/collection/${productId}`
    );
    toast.success("Link copied to clipboard!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading && wishlist.length === 0) {
    return <div className="text-center py-20">Loading wishlist...</div>;
  }

  return (
    <div className="bg-white py-12 min-h-screen">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .font-cardo {
            font-family: 'Cardo', serif;
          }
          
          .font-playfair {
            font-family: 'Playfair Display', serif;
          }
          
          .overlay-gradient {
            background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
          }
          
          .item-hover {
            transition: all 0.3s ease-in-out;
          }
          
          .item-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .fancy-divider {
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent);
            margin: 1rem 0;
          }
          
          .card-shadow {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }
          
          .btn-hover {
            transition: all 0.3s ease;
            overflow: hidden;
            position: relative;
          }
          
          .btn-hover:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background-color: rgba(255,255,255,0.1);
            transition: all 0.3s ease;
          }
          
          .btn-hover:hover:after {
            width: 100%;
          }
          
          .color-swatch {
            transition: all 0.2s ease;
            cursor: pointer;
            border: 2px solid transparent;
          }
          
          .color-swatch.selected {
            transform: scale(1.2);
            border: 2px solid #000;
          }
          
          .color-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 10px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
          }
          
          .color-swatch:hover .color-tooltip {
            opacity: 1;
          }
        `}
      </style>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-10">
          <button
            className="mr-4 text-gray-600 hover:text-black transition-colors"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <h1 className="text-3xl font-playfair font-bold text-gray-800">
            My Wishlist
          </h1>
          <div className="ml-4 relative">
            <span className="ml-1 px-3 py-1 bg-black text-white font-medium rounded-full text-sm shadow-sm">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-100 card-shadow">
            <div className="w-24 h-24 bg-[#FDF5E6] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <FaHeart className="text-[#D4AF37] text-3xl" />
            </div>
            <h2 className="text-3xl font-playfair font-medium text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto font-cardo text-lg">
              Discover our exquisite collection of handcrafted sarees and add
              your favorites to your wishlist.
            </p>
            <motion.button
              onClick={() => navigate("/collection")}
              className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-900 transition font-cardo text-lg tracking-wide shadow-md btn-hover"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Collections
            </motion.button>
          </div>
        ) : (
          <>
            <div className="mb-8 p-5 bg-[#FDF5E6] rounded-lg border border-[#E8D9B5] shadow-sm">
              <p className="font-cardo text-gray-700 text-center">
                <span className="font-semibold">Tip:</span> Please select a
                color variant before adding items to your cart.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.productId}
                  className="bg-white rounded-lg shadow-sm overflow-hidden item-hover border border-gray-50 card-shadow"
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative">
                    <div className="overflow-hidden aspect-[3/4]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-pointer"
                        onClick={() => handleViewProduct(item.productId)}
                      />
                    </div>

                    {/* Overlay with actions on hover */}
                    <div
                      className={`absolute inset-0 overlay-gradient flex flex-col justify-end p-4 transition-opacity duration-300 ${
                        hoveredItem === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <motion.button
                          onClick={() => handleViewProduct(item.productId)}
                          className="bg-white/90 backdrop-blur-sm text-black p-2 rounded-full shadow-md cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="View product details"
                        >
                          <FaEye className="text-lg" />
                        </motion.button>

                        <div className="flex gap-2">
                          <motion.button
                            className="bg-white/90 backdrop-blur-sm text-black p-2 rounded-full shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShareProduct(item.productId)}
                          >
                            <FaShareAlt className="text-lg" />
                          </motion.button>

                          <motion.button
                            className="bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromWishlist(item.productId)}
                          >
                            <FaTrash className="text-lg" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Discount tag if exists */}
                    {item.discount && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-black text-white font-medium px-3 py-1 rounded-full text-sm shadow-md">
                          {item.discount}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5 border-t border-gray-100">
                    <h3
                      className="font-playfair font-semibold text-xl text-gray-900 hover:text-[#D4AF37] transition-colors cursor-pointer mb-1"
                      onClick={() => handleViewProduct(item.productId)}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-500 font-cardo text-sm mb-3">
                      {item.desc
                        ? item.desc.length > 70
                          ? item.desc.substring(0, 70) + "..."
                          : item.desc
                        : "Handcrafted premium saree"}
                    </p>

                    <div className="fancy-divider"></div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-playfair font-bold text-xl text-gray-900">
                          {selectedCurrency.symbol}
                          {formatPrice(convertPrice(item.discountPrice))}
                        </span>
                        {item.originalPrice > item.discountPrice && (
                          <span className="text-sm text-gray-500 line-through font-cardo">
                            {selectedCurrency.symbol}
                            {formatPrice(convertPrice(item.originalPrice))}
                          </span>
                        )}
                      </div>

                      {/* Heart icon for toggling wishlist */}
                      {/* <motion.button
                        onClick={() => removeFromWishlist(item.productId)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaHeart className="text-white" />
                      </motion.button> */}
                    </div>

                    {/* Color selection */}
                    {item.colors && item.colors.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2 font-cardo">
                          Select Color:
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {item.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className={`relative w-6 h-6 rounded-full shadow-sm color-swatch ${
                                selectedColors[item.productId] === color
                                  ? "selected"
                                  : ""
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() =>
                                handleColorSelect(item.productId, color)
                              }
                            >
                              {selectedColors[item.productId] === color && (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                  <FaCheck size={10} />
                                </div>
                              )}
                              <div className="color-tooltip">
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-3 rounded-md font-cardo text-base flex items-center justify-center gap-2 btn-hover ${
                        item.colors &&
                        item.colors.length > 0 &&
                        !selectedColors[item.productId]
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-900"
                      }`}
                      whileHover={
                        item.colors &&
                        item.colors.length > 0 &&
                        !selectedColors[item.productId]
                          ? {}
                          : { scale: 1.02 }
                      }
                      whileTap={
                        item.colors &&
                        item.colors.length > 0 &&
                        !selectedColors[item.productId]
                          ? {}
                          : { scale: 0.98 }
                      }
                    >
                      <FaShoppingCart className="text-sm" />
                      {item.colors &&
                      item.colors.length > 0 &&
                      !selectedColors[item.productId]
                        ? "Select a Color"
                        : "Add to Cart"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {wishlist.length > 0 && (
              <div className="mt-12 flex justify-center">
                <motion.button
                  onClick={() => navigate("/collection")}
                  className="bg-transparent border border-black text-black py-3 px-8 rounded-md hover:bg-black hover:text-white transition font-cardo tracking-wide btn-hover"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
