import React, { useState, useEffect, useRef } from "react";
import collections from "../assets/product/CollectionData";
import { motion, useAnimation } from "framer-motion";
import { FaEye, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext"; // Import the currency context
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState(
    collections.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const hoverTimers = useRef({});
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency(); // Use the currency context
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

    // Prepare the item with all necessary properties
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
      // Store currency information with the wishlist item
      currencyCode: selectedCurrency.code,
      currencySymbol: selectedCurrency.symbol,
    };

    toggleWishlist(wishlistItem);
  };

  return (
    <section className="py-16 md:py-24 bg-[#fdfdfd]">
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
        <h2 className="text-3xl md:text-5xl font-[Garamond] font-bold text-black mb-4 tracking-wide">
          Featured Collections
        </h2>

        <p className="font-[Garamond] text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
          Explore our curated selection of premium handcrafted pieces, each
          telling a story of heritage and artistry.
        </p>

        <div className="w-32 h-0.5 bg-black mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-8 mt-16">
        {collections
          .slice(0, showAll ? collections.length : 4)
          .map((collection, index) => (
            <div
              key={index}
              className="group w-full max-w-[350px] mx-auto overflow-hidden bg-white flex flex-col justify-between cursor-pointer card-hover rounded-lg shadow-md"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative overflow-hidden group">
                <div className="overflow-hidden">
                  <img
                    src={collection.images[currentIndexes[index]]}
                    alt={collection.title}
                    className="w-full h-[560px] object-cover image-zoom"
                    onClick={() => navigate(`/collection/${index}`)}
                  />
                </div>

                {/* Wishlist Button - Top Left */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleWishlistToggle(e, collection, index)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md wishlist-btn hover:bg-gray-50"
                  >
                    {isInWishlist(collection.id || `collection-${index}`) ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-800 text-lg" />
                    )}
                  </button>
                </div>

                {/* Quick View Button - More Elegant */}
                <div className="absolute font-[Garamond] bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCollection(collection);
                    }}
                    className="px-6 py-2.5 bg-white/90 backdrop-blur-sm text-black rounded-full font-cardo tracking-wide text-sm flex items-center gap-2 hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <FaEye className="text-black font-[Garamond]" /> Quick View
                  </button>
                </div>

                {/* Discount Badge */}
                {collection.discount && (
                  <div className="absolute top-4 left-4">
                    <div className="discount-badge font-[Garamond]  text-white font-medium text-sm px-3 py-1 rounded-full shadow-md">
                      {collection.discount} OFF
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col bg-white">
                <h3 className="text-xl font-[Garamond] text-black font-playfair font-semibold mb-2">
                  {collection.title}
                </h3>
                <div className="flex font-[Garamond] items-center justify-center gap-3">
                  {collection.originalPrice && (
                    <p className="text-gray-500 line-through text-sm font-cardo">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.originalPrice))}
                    </p>
                  )}
                  {collection.discountPrice && (
                    <p className="text-black font-cardo font-bold text-lg price-tag">
                      {selectedCurrency.symbol}
                      {formatPrice(convertPrice(collection.discountPrice))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-16 text-center">
        {!showAll && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="font-[Garamond] bg-black text-white px-10 py-3 rounded-md hover:bg-gray-900 transition-all font-cardo text-lg tracking-wide shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Collections
          </motion.button>
        )}
      </div>

      {/* Detailed View Sidebar - More Elegant */}
      {selectedCollection && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-80 md:w-96 h-full bg-[#FDFBF7] shadow-lg z-50 p-6 overflow-y-auto font-cardo"
        >
          <button
            className="absolute top-4 right-4 text-xl text-black hover:text-gray-700 transition-colors"
            onClick={() => setSelectedCollection(null)}
          >
            ✖
          </button>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-black font-[Garamond]">
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
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm wishlist-btn hover:bg-gray-50"
            >
              {isInWishlist(
                selectedCollection.id || Math.random().toString(36).substr(2, 9)
              ) ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-800 text-lg" />
              )}
            </button>
          </div>

          <div className="mt-4 flex flex-col items-center">
            <motion.img
              src={mainImage}
              alt="Selected"
              className="w-80 h-100 object-cover border rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex gap-3 mt-4">
              {selectedCollection.images.slice(0, 4).map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover border rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                    mainImage === img ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mt-6 font-[Garamond]">
            {selectedCollection.desc}
          </p>
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-lg">
                <s className="text-gray-500">
                  {selectedCurrency.symbol}
                  {formatPrice(convertPrice(selectedCollection.originalPrice))}
                </s>
              </p>
              <p className="text-xl font-bold text-black">
                {selectedCurrency.symbol}
                {formatPrice(convertPrice(selectedCollection.discountPrice))}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm bg-black/10 text-black px-2 py-0.5 rounded">
                {selectedCollection.discount} off
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-bold font-[Garamond] text-black">
              Select Color:
            </p>
            <div className="flex justify-center gap-3 mt-3">
              {selectedCollection.colors?.map((color, index) => (
                <motion.button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-105 ${
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

          <div className="flex items-center justify-center mt-8">
            <motion.button
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-all flex items-center gap-2 font-[Garamond] text-lg shadow-md w-full"
              onClick={() => {
                if (!selectedColor) {
                  toast.error("Please select a color before adding to cart!");
                  return;
                }

                // Get the converted price
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
                  // Use the converted price
                  price: convertedPrice,
                  color: selectedColor,
                  // Store the currency information with the cart item
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
