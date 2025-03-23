import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaEye, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";

const RecommendedProducts = ({ products }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="mt-24 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-serif">
          Curated For You
        </h2>
        <div className="w-24 h-1 bg-black mx-auto mb-2"></div>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Exquisite selections tailored to your refined taste
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.slice(0, 4).map((item) => (
          <motion.div
            key={item.id}
            className="group relative bg-white overflow-hidden flex flex-col h-full rounded-xl shadow-sm hover:shadow-xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <div className="relative overflow-hidden aspect-[3/4] rounded-t-xl">
              <motion.img
                src={
                  item.images[
                    hoveredItem === item.id && item.images.length > 1 ? 1 : 0
                  ]
                }
                alt={item.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{
                  scale: hoveredItem === item.id ? 1.1 : 1,
                  transition: { duration: 1.2 },
                }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredItem === item.id ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
              />

              {/* Floating action buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                    x: hoveredItem === item.id ? 0 : 20,
                    transition: { duration: 0.3, delay: 0.1 },
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    const wishlistItem = {
                      id: item.id,
                      title: item.title,
                      image: item.images[0],
                      discountPrice: item.discountPrice,
                      originalPrice: item.originalPrice,
                      stock: item.stock,
                      specialty: item.specialty,
                      colors: item.colors,
                    };
                    toggleWishlist(wishlistItem);
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart
                    className={
                      isInWishlist(item.id)
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500 transition"
                    }
                    size={18}
                  />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                    x: hoveredItem === item.id ? 0 : 20,
                    transition: { duration: 0.3, delay: 0.2 },
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate(`/collection/${item.id}`)}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEye className="text-gray-800" size={18} />
                </motion.button>
              </div>

              {/* Status tag */}
              {item.specialty && (
                <motion.div
                  className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 uppercase tracking-wider font-medium rounded-full"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.specialty}
                </motion.div>
              )}

              {/* Discount tag */}
              {item.originalPrice > item.discountPrice && (
                <motion.div
                  className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 font-bold rounded-full"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {Math.round(
                    (1 - item.discountPrice / item.originalPrice) * 100
                  )}
                  % OFF
                </motion.div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-gray-900 text-base mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < 4
                          ? "text-amber-400 w-3 h-3"
                          : "text-gray-200 w-3 h-3"
                      }
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                </div>

                <div className="flex items-baseline mb-3">
                  <span className="font-bold text-gray-900 text-base mr-2">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(item.discountPrice))}
                  </span>
                  {item.originalPrice > item.discountPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(item.originalPrice))}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-black text-white flex items-center justify-center space-x-2 text-sm uppercase tracking-wider font-medium rounded-full"
                onClick={() => navigate(`/collection/${item.id}`)}
              >
                <FaShoppingBag size={14} />
                <span>View Product</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
