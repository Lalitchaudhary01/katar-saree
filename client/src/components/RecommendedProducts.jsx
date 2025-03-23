import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";

const RecommendedProducts = ({ products }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((item) => (
          <motion.div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]"
            whileHover={{ y: -5 }}
          >
            <div className="overflow-hidden h-[70%]">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <button
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
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
                >
                  <FaHeart
                    className={
                      isInWishlist(item.id)
                        ? "text-red-500"
                        : "text-gray-400 group-hover:text-red-500 transition"
                    }
                  />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between h-[30%]">
              <h3 className="font-medium text-gray-900 line-clamp-1">
                {item.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="font-bold text-gray-900">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(item.discountPrice))}
                  </span>
                  {item.originalPrice > item.discountPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(item.originalPrice))}
                    </span>
                  )}
                </div>
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < 4 ? "text-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate(`/collection/${item.id}`)}
                className="w-full mt-3 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition text-sm font-medium"
              >
                Quick View
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
