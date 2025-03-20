import React, { useState, useEffect, useRef } from "react";
import collections from "../assets/product/CollectionData";
import { motion } from "framer-motion";
import { FaEye, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState(
    collections.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const hoverTimers = useRef({});
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCollection) {
      setMainImage(selectedCollection.images[0]);
    }
  }, [selectedCollection]);

  useEffect(() => {
    return () => {
      Object.values(hoverTimers.current).forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, []);

  const handleMouseEnter = (index) => {
    hoverTimers.current[index] = setTimeout(() => {
      setCurrentIndexes((prevIndexes) => ({
        ...prevIndexes,
        [index]: (prevIndexes[index] + 1) % collections[index].images.length,
      }));
    }, 1000);
    setHoveredIndex(index);
  };

  const handleMouseLeave = (index) => {
    if (hoverTimers.current[index]) {
      clearTimeout(hoverTimers.current[index]);
    }
    setHoveredIndex(null);
  };

  const handleWishlistToggle = (e, collection, index) => {
    e.stopPropagation();

    const wishlistItem = {
      id: collection.id || `collection-${index}`,
      title: collection.title,
      image: collection.images[currentIndexes[index]],
      images: collection.images,
      originalPrice: collection.originalPrice,
      discountPrice: collection.discountPrice,
      colors: collection.colors,
      discount: collection.discount,
      desc: collection.desc,
      currencyCode: selectedCurrency.code,
      currencySymbol: selectedCurrency.symbol,
    };

    toggleWishlist(wishlistItem);
  };

  return (
    <section className="py-8 md:py-16 bg-[#fdfdfd]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .font-cardo {
            font-family: 'Cardo', serif;
          }
          
          .font-playfair {
            font-family: 'Playfair Display', serif;
          }

          .card-hover {
            transition: all 0.4s ease-in-out;
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .image-zoom {
            transition: transform 0.7s ease;
          }
          
          .image-zoom:hover {
            transform: scale(1.07);
          }
          
          .price-tag {
            position: relative;
            display: inline-block;
          }
          
          .price-tag:after {
            content: '';
            position: absolute;
            height: 1px;
            width: 100%;
            background-color: #000000;
            bottom: -2px;
            left: 0;
          }
          
          .discount-badge {
            background: linear-gradient(135deg, #000000 0%, #333333 100%);
          }
          
          .wishlist-btn {
            transition: all 0.3s ease;
          }
          
          .wishlist-btn:hover {
            transform: scale(1.1);
          }
        `}
      </style>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-[Garamond] font-bold text-black mb-3 tracking-wide">
          Featured Collections
        </h2>

        <p className="font-[Garamond] text-neutral-800 max-w-2xl mx-auto mb-6 text-sm md:text-base">
          Explore our curated selection of premium handcrafted pieces, each
          telling a story of heritage and artistry.
        </p>

        <div className="w-24 h-0.5 bg-black mx-auto"></div>
      </div>

      {/* Mobile-optimized grid with 2 items per row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-6 mt-8 md:mt-12">
        {collections
          .slice(0, showAll ? collections.length : 4)
          .map((collection, index) => (
            <div
              key={index}
              className="group w-full overflow-hidden bg-white flex flex-col justify-between cursor-pointer card-hover rounded-lg shadow-sm"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative overflow-hidden group">
                <div className="overflow-hidden">
                  <img
                    src={collection.images[currentIndexes[index]]}
                    alt={collection.title}
                    className="w-full h-[260px] md:h-[560px] object-cover image-zoom"
                    onClick={() => navigate(`/collection/${index}`)}
                  />
                </div>

                {/* Wishlist Button - Top Right */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleWishlistToggle(e, collection, index)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md wishlist-btn hover:bg-gray-50"
                  >
                    {isInWishlist(collection.id || `collection-${index}`) ? (
                      <FaHeart className="text-red-500 text-sm" />
                    ) : (
                      <FaRegHeart className="text-gray-800 text-sm" />
                    )}
                  </button>
                </div>

                {/* Quick View Button */}
                <div className="absolute font-[Garamond] bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCollection(collection);
                    }}
                    className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black rounded-full font-cardo tracking-wide text-xs flex items-center gap-1 hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <FaEye className="text-black text-xs" /> Quick View
                  </button>
                </div>

                {/* Discount Badge */}
                {collection.discount && (
                  <div className="absolute top-2 left-2">
                    <div className="discount-badge font-[Garamond] text-white font-medium text-xs px-2 py-0.5 rounded-full shadow-md">
                      {collection.discount} OFF
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 flex flex-col bg-white">
                <h3 className="text-sm md:text-base font-[Garamond] text-black font-playfair font-semibold mb-1 truncate">
                  {collection.title}
                </h3>
                <div className="flex font-[Garamond] items-center justify-center gap-2">
                  {collection.originalPrice && (
                    <p className="text-gray-500 line-through text-xs font-cardo">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.originalPrice))}
                    </p>
                  )}
                  {collection.discountPrice && (
                    <p className="text-black font-cardo font-bold text-sm md:text-base price-tag">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.discountPrice))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-8 md:mt-12 text-center">
        {!showAll && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="font-[Garamond] bg-black text-white px-6 py-2 text-sm md:text-base rounded-md hover:bg-gray-900 transition-all font-cardo tracking-wide shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Collections
          </motion.button>
        )}
      </div>

      {/* Detailed View Sidebar - Mobile Optimized */}
      {selectedCollection && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full sm:w-80 md:w-96 h-full bg-[#FDFBF7] shadow-lg z-50 p-4 md:p-6 overflow-y-auto font-cardo"
        >
          <button
            className="absolute top-3 right-3 text-lg text-black hover:text-gray-700 transition-colors"
            onClick={() => setSelectedCollection(null)}
          >
            ✖
          </button>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-black font-[Garamond]">
              {selectedCollection.title}
            </h3>

            {/* Wishlist button in sidebar */}
            <button
              onClick={() => {
                const wishlistItem = {
                  id:
                    selectedCollection.id ||
                    Math.random().toString(36).substr(2, 9),
                  title: selectedCollection.title,
                  image: mainImage,
                  images: selectedCollection.images,
                  originalPrice: selectedCollection.originalPrice,
                  discountPrice: selectedCollection.discountPrice,
                  colors: selectedCollection.colors,
                  discount: selectedCollection.discount,
                  desc: selectedCollection.desc,
                  currencyCode: selectedCurrency.code,
                  currencySymbol: selectedCurrency.symbol,
                };
                toggleWishlist(wishlistItem);
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm wishlist-btn hover:bg-gray-50"
            >
              {isInWishlist(
                selectedCollection.id || Math.random().toString(36).substr(2, 9)
              ) ? (
                <FaHeart className="text-red-500 text-sm" />
              ) : (
                <FaRegHeart className="text-gray-800 text-sm" />
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-col items-center">
            <motion.img
              src={mainImage}
              alt="Selected"
              className="w-full max-w-xs h-auto object-cover border rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              {selectedCollection.images.slice(0, 4).map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-14 h-14 object-cover border rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                    mainImage === img ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mt-4 text-sm font-[Garamond]">
            {selectedCollection.desc}
          </p>
          <div className="mt-4 bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-base">
                <s className="text-gray-500">
                  {selectedCurrency.symbol}
                  {formatPrice(convertPrice(selectedCollection.originalPrice))}
                </s>
              </p>
              <p className="text-lg font-bold text-black">
                {selectedCurrency.symbol}
                {formatPrice(convertPrice(selectedCollection.discountPrice))}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs bg-black/10 text-black px-2 py-0.5 rounded">
                {selectedCollection.discount} off
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="font-bold font-[Garamond] text-black text-sm">
              Select Color:
            </p>
            <div className="flex justify-center gap-2 mt-2">
              {selectedCollection.colors?.map((color, index) => (
                <motion.button
                  key={index}
                  className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-105 ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  whileHover={{ scale: 1.1 }}
                ></motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <motion.button
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-all flex items-center gap-2 font-[Garamond] text-base shadow-md w-full"
              onClick={() => {
                if (!selectedColor) {
                  toast.error("Please select a color before adding to cart!");
                  return;
                }

                const convertedPrice = convertPrice(
                  selectedCollection.discountPrice ||
                    selectedCollection.originalPrice
                );

                addToCart({
                  id:
                    selectedCollection.id ||
                    Math.random().toString(36).substr(2, 9),
                  title: selectedCollection.title,
                  image: mainImage,
                  price: convertedPrice,
                  color: selectedColor,
                  currencyCode: selectedCurrency.code,
                  currencySymbol: selectedCurrency.symbol,
                });

                toast.success(`${selectedCollection.title} added to cart!`);
              }}
              disabled={!selectedColor}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedCollections;
