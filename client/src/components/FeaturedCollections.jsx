import React, { useState, useEffect, useRef } from "react";
import collections from "../assets/product/CollectionData";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
  FaLongArrowAltRight,
} from "react-icons/fa";
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
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoading, setImageLoading] = useState({});

  const hoverTimers = useRef({});
  const carouselRef = useRef(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();

  // Check if user is on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Set showAll to true on mobile
  useEffect(() => {
    if (isMobile) {
      setShowAll(true);
    }
  }, [isMobile]);

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

  const handleImageLoad = (index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }));
  };

  const handleMouseEnter = (index) => {
    hoverTimers.current[index] = setTimeout(() => {
      setCurrentIndexes((prevIndexes) => ({
        ...prevIndexes,
        [index]: (prevIndexes[index] + 1) % collections[index].images.length,
      }));
    }, 800);
    setHoveredIndex(index);
  };

  const handleMouseLeave = (index) => {
    if (hoverTimers.current[index]) {
      clearTimeout(hoverTimers.current[index]);
    }
    setHoveredIndex(null);
  };

  const handleWishlistToggle = (e, collection, index) => {
    e.stopPropagation(); // Stop event propagation
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

  // Function to handle next card on mobile
  const handleNextCard = () => {
    const maxIndex = collections.length - 2;
    setVisibleCardIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 2
    );
  };

  // Function to handle previous card on mobile
  const handlePrevCard = () => {
    const maxIndex = collections.length - 2;
    setVisibleCardIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 2
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#f9f7f5]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
          
          .font-cormorant {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }

          .luxury-card {
            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
          }
          
          .luxury-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          }
          
          .luxury-image {
            transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          
          .luxury-card:hover .luxury-image {
            transform: scale(1.08);
          }
          
          .luxury-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          
          .luxury-card:hover .luxury-overlay {
            opacity: 1;
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
            bottom: -3px;
            left: 0;
          }
          
          .elegant-badge {
            background: linear-gradient(135deg, #1a1a1a 0%, #323232 100%);
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-weight: 500;
          }
          
          .wishlist-btn {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            opacity: 0.9;
          }
          
          .wishlist-btn:hover {
            transform: scale(1.15);
            opacity: 1;
          }
          
          .nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 10;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid rgba(0,0,0,0.05);
          }
          
          .nav-arrow:hover {
            background-color: white;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          }
          
          .nav-arrow.prev {
            left: 10px;
          }
          
          .nav-arrow.next {
            right: 10px;
          }
          
          .color-swatch {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            cursor: pointer;
          }
          
          .color-swatch:hover {
            transform: scale(1.15);
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
          }
          
          .sidebar-image-container {
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          }
          
          .sidebar-image {
            transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          
          .sidebar-image:hover {
            transform: scale(1.05);
          }
          
          .thumbnail {
            transition: all 0.3s ease;
            opacity: 0.7;
          }
          
          .thumbnail:hover, .thumbnail.active {
            opacity: 1;
            transform: translateY(-2px);
          }
          
          .luxurious-overlay {
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(2px);
          }
          
          .image-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          
          .quick-view-btn {
            letter-spacing: 1px;
            text-transform: uppercase;
            font-size: 10px;
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
          }
          
          .quick-view-btn:hover {
            background: rgba(255, 255, 255, 1);
            letter-spacing: 1.5px;
          }
          
          .explore-btn {
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
          }
          
          .explore-btn:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #fff;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          
          .explore-btn:hover:after {
            transform: scaleX(1);
            transform-origin: left;
          }
        `}
      </style>

      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1a1a1a] mb-4 tracking-wider">
          Curated Collections
        </h2>

        <p className="font-montserrat text-neutral-600 max-w-2xl mx-auto mb-8 text-sm md:text-base tracking-wide leading-relaxed">
          Discover our exquisite selection of handcrafted luxury pieces, each
          meticulously designed to elevate your wardrobe with timeless elegance.
        </p>

        <div className="w-24 h-px bg-[#1a1a1a] mx-auto mb-16"></div>
      </div>

      {/* Collection grid with mobile navigation */}
      <div className="relative" ref={carouselRef}>
        {/* Mobile Navigation Arrows */}
        {isMobile && (
          <>
            <button
              className="nav-arrow prev"
              onClick={handlePrevCard}
              aria-label="Previous card"
            >
              <FaChevronLeft className="text-[#1a1a1a]" />
            </button>

            <button
              className="nav-arrow next"
              onClick={handleNextCard}
              aria-label="Next card"
            >
              <FaChevronRight className="text-[#1a1a1a]" />
            </button>
          </>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-12 mb-16">
          {collections
            .slice(0, showAll || isMobile ? collections.length : 4)
            .map((collection, index) => {
              // For mobile view, show only visible cards
              const isVisible =
                !isMobile ||
                index === visibleCardIndex ||
                index === visibleCardIndex + 1;
              if (!isVisible) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="luxury-card bg-white rounded-lg overflow-hidden shadow-md group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  // Remove the onClick from the parent
                >
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: "3/4" }}
                    onClick={() => {
                      console.log("Navigating to:", `/collection/${index}`);
                      navigate(`/collection/${index}`);
                    }} // Add navigation here on the container
                  >
                    {/* Image loading skeleton */}
                    {imageLoading[index] !== false && (
                      <div className="absolute inset-0 image-skeleton"></div>
                    )}

                    <img
                      src={collection.images[currentIndexes[index]]}
                      alt={collection.title}
                      className="w-full h-full object-cover luxury-image"
                      onLoad={() => handleImageLoad(index)}
                      // Remove onClick from here
                    />

                    {/* Overlay gradient - make sure this doesn't block clicks */}
                    <div className="luxury-overlay absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
                      {/* Quick view button - enable pointer events just for this button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Stop navigation when clicking button
                          setSelectedCollection(collection);
                        }}
                        className="quick-view-btn mx-auto mb-4 px-4 py-2 rounded-sm flex items-center gap-2 shadow-lg pointer-events-auto"
                      >
                        <FaEye className="text-[#1a1a1a] text-xs" />
                        <span className="font-montserrat text-[#1a1a1a]">
                          QUICK VIEW
                        </span>
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Stop navigation when clicking button
                          handleWishlistToggle(e, collection, index);
                        }}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md wishlist-btn hover:scale-110 transition-transform"
                      >
                        {isInWishlist(
                          collection.id || `collection-${index}`
                        ) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-800" />
                        )}
                      </button>
                    </div>

                    {/* Discount Badge */}
                    {collection.discount && (
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <div className="elegant-badge text-white text-xs px-2.5 py-1 rounded-sm shadow-md">
                          {collection.discount}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="p-4 flex flex-col items-center bg-white"
                    onClick={() => {
                      console.log("Navigating to:", `/collection/${index}`);
                      navigate(`/collection/${index}`);
                    }} // Add navigation to details section too
                  >
                    <h3 className="text-sm md:text-base font-cormorant text-[#1a1a1a] font-semibold mb-2 tracking-wide">
                      {collection.title}
                    </h3>

                    <div className="flex items-center justify-center gap-3">
                      {collection.originalPrice && (
                        <p className="text-gray-500 line-through text-xs font-montserrat">
                          {selectedCurrency.symbol}
                          {formatPrice(convertPrice(collection.originalPrice))}
                        </p>
                      )}
                      {collection.discountPrice && (
                        <p className="text-[#1a1a1a] font-montserrat text-sm md:text-base price-tag">
                          {selectedCurrency.symbol}
                          {formatPrice(convertPrice(collection.discountPrice))}
                        </p>
                      )}
                    </div>

                    {/* Color swatches preview */}
                    {collection.colors && collection.colors.length > 0 && (
                      <div className="flex justify-center gap-1.5 mt-3">
                        {collection.colors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                        {collection.colors.length > 4 && (
                          <div className="text-xs text-gray-500 font-montserrat">
                            +{collection.colors.length - 4}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* "Explore All Collections" button - Hidden on mobile */}
      <div className="text-center mt-4 mb-8">
        {!showAll && !isMobile && collections.length > 4 && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="explore-btn font-montserrat bg-[#1a1a1a] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#2a2a2a] transition-all shadow-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Full Collection <FaLongArrowAltRight className="ml-1" />
          </motion.button>
        )}
      </div>

      {/* QuickView Modal */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCollection(null)}
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
                      alt={selectedCollection.title}
                      className="w-auto h-auto max-w-full max-h-full sidebar-image object-contain"
                    />
                  </div>

                  <div className="flex gap-2 justify-center">
                    {selectedCollection.images
                      .slice(0, 4)
                      .map((img, imgIndex) => (
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
                    onClick={() => setSelectedCollection(null)}
                  >
                    ✖
                  </button>

                  <h2 className="font-cormorant text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-2 tracking-wide">
                    {selectedCollection.title}
                  </h2>

                  <div className="flex items-center gap-3 mb-3">
                    {selectedCollection.originalPrice && (
                      <p className="text-gray-500 line-through text-sm font-montserrat">
                        {selectedCurrency.symbol}
                        {formatPrice(
                          convertPrice(selectedCollection.originalPrice)
                        )}
                      </p>
                    )}
                    <p className="text-[#1a1a1a] font-montserrat text-base md:text-lg font-semibold">
                      {selectedCurrency.symbol}
                      {formatPrice(
                        convertPrice(
                          selectedCollection.discountPrice ||
                            selectedCollection.originalPrice
                        )
                      )}
                    </p>

                    {selectedCollection.discount && (
                      <span className="text-xs bg-[#1a1a1a] text-white px-2 py-0.5 rounded-sm font-montserrat">
                        {selectedCollection.discount} OFF
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4 border-t border-b border-gray-100 py-3 max-h-24 overflow-y-auto">
                    {selectedCollection.desc}
                  </p>

                  <div className="mb-4">
                    <h3 className="font-montserrat text-sm uppercase tracking-wider text-[#1a1a1a] mb-2">
                      Select Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollection.colors?.map((color, colorIndex) => (
                        <motion.button
                          key={colorIndex}
                          className={`color-swatch w-6 h-6 rounded-full ${
                            selectedColor === color
                              ? "ring-2 ring-offset-1 ring-[#1a1a1a]"
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
                      className="w-10 h-10 flex-shrink-0 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      {isInWishlist(
                        selectedCollection.id ||
                          Math.random().toString(36).substr(2, 9)
                      ) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-800" />
                      )}
                    </button>

                    <motion.button
                      className={`flex-1 font-montserrat text-sm tracking-wider uppercase py-2 px-4 rounded-sm flex items-center justify-center gap-2 transition-all ${
                        !selectedColor
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#1a1a1a] text-white hover:bg-[#323232]"
                      }`}
                      onClick={() => {
                        if (!selectedColor) {
                          toast.error("Please select a color");
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

                        toast.success(
                          `${selectedCollection.title} added to cart`
                        );
                      }}
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
    </section>
  );
};

export default FeaturedCollections;
