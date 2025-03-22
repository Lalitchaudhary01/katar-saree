import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";
import { toast } from "react-hot-toast";
import newArrivals from "../assets/product/NewArrival";

const NewArrivals = () => {
  const [currentIndexes, setCurrentIndexes] = useState(
    newArrivals.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState({});

  // New state for desktop swiper
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(newArrivals.length / itemsPerPage);

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

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

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
        [index]: (prevIndexes[index] + 1) % newArrivals[index].images.length,
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

  const handleWishlistToggle = (e, product, index) => {
    e.stopPropagation(); // Stop event propagation
    const wishlistItem = {
      id: product.id || `product-${index}`,
      title: product.title,
      image: product.images[currentIndexes[index]],
      images: product.images,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      colors: product.colors,
      discount: product.discount,
      desc: product.desc,
      currencyCode: selectedCurrency.code,
      currencySymbol: selectedCurrency.symbol,
    };
    toggleWishlist(wishlistItem);
  };

  // Function to handle next card on mobile
  const handleNextCard = () => {
    const maxIndex = newArrivals.length - 2;
    setVisibleCardIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 2
    );
  };

  // Function to handle previous card on mobile
  const handlePrevCard = () => {
    const maxIndex = newArrivals.length - 2;
    setVisibleCardIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 2
    );
  };

  // Functions for desktop swiper navigation
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Get current items to display based on pagination
  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return newArrivals.slice(start, end);
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
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          
          .nav-arrow:hover {
            background-color: white;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          }
          
          .nav-arrow.prev {
            left: 5px;
          }
          
          .nav-arrow.next {
            right: 5px;
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
          
          .pagination-indicator {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 20px;
          }
          
          .pagination-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #d1d1d1;
            transition: all 0.3s ease;
          }
          
          .pagination-dot.active {
            background-color: #1a1a1a;
            transform: scale(1.2);
          }
          
          .swiper-container {
            position: relative;
            overflow: hidden;
          }
          
          .swiper-wrapper {
            transition: transform 0.5s ease;
          }
          
          .desktop-nav-arrow {
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
          }
          
          .desktop-nav-arrow.prev {
            left: 10px;
          }
          
          .desktop-nav-arrow.next {
            right: 10px;
          }
          
          .desktop-nav-arrow:hover {
            background-color: white;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            transform: translateY(-50%) scale(1.05);
          }
          
          .fade-enter {
            opacity: 0;
            transform: translateY(20px);
          }
          
          .fade-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 300ms, transform 300ms;
          }
          
          .fade-exit {
            opacity: 1;
          }
          
          .fade-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}
      </style>

      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1a1a1a] mb-4 tracking-wider">
          New Arrivals
        </h2>

        <p className="font-montserrat text-neutral-600 max-w-2xl mx-auto mb-8 text-sm md:text-base tracking-wide leading-relaxed">
          Discover our latest additions, each meticulously designed to elevate
          your wardrobe with timeless elegance.
        </p>

        <div className="w-24 h-px bg-[#1a1a1a] mx-auto mb-16"></div>
      </div>

      {/* Product grid with navigation */}
      <div className="relative" ref={carouselRef}>
        {/* Mobile Navigation Arrows - Positioned at the sides */}
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

        {/* Desktop Navigation and Product Display */}
        {!isMobile && (
          <div className="swiper-container">
            {/* Desktop Navigation Arrows - Positioned at sides */}
            <button
              className="desktop-nav-arrow prev"
              onClick={goToPrevPage}
              aria-label="Previous page"
            >
              <FaChevronLeft className="text-[#1a1a1a]" />
            </button>

            <button
              className="desktop-nav-arrow next"
              onClick={goToNextPage}
              aria-label="Next page"
            >
              <FaChevronRight className="text-[#1a1a1a]" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-12 mb-8"
              >
                {getCurrentItems().map((product, index) => {
                  const globalIndex = currentPage * itemsPerPage + index;

                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="luxury-card bg-white rounded-lg overflow-hidden shadow-md group"
                      onMouseEnter={() => handleMouseEnter(globalIndex)}
                      onMouseLeave={() => handleMouseLeave(globalIndex)}
                    >
                      <div
                        className="relative overflow-hidden cursor-pointer"
                        style={{ aspectRatio: "3/4" }}
                        onClick={() => {
                          navigate(`/collection/${product.id}`);
                        }}
                      >
                        {/* Image loading skeleton */}
                        {imageLoading[globalIndex] !== false && (
                          <div className="absolute inset-0 image-skeleton"></div>
                        )}

                        <img
                          src={product.images[currentIndexes[globalIndex] || 0]}
                          alt={product.title}
                          className="w-full h-full object-cover luxury-image"
                          onLoad={() => handleImageLoad(globalIndex)}
                        />

                        {/* Overlay gradient */}
                        <div className="luxury-overlay absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
                          {/* Quick view button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
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
                              handleWishlistToggle(e, product, globalIndex);
                            }}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md wishlist-btn hover:scale-110 transition-transform"
                          >
                            {isInWishlist(
                              product.id || `product-${globalIndex}`
                            ) ? (
                              <FaHeart className="text-red-500" />
                            ) : (
                              <FaRegHeart className="text-gray-800" />
                            )}
                          </button>
                        </div>

                        {/* New Badge */}
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <div className="elegant-badge text-white text-xs px-2.5 py-1 rounded-sm shadow-md">
                            NEW
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-4 flex flex-col items-center bg-white"
                        onClick={() => {
                          navigate(`/collection/${product.id}`);
                        }}
                      >
                        <h3 className="text-sm md:text-base font-cormorant text-[#1a1a1a] font-semibold mb-2 tracking-wide">
                          {product.title}
                        </h3>

                        <div className="flex items-center justify-center gap-3">
                          {product.originalPrice && (
                            <p className="text-gray-500 line-through text-xs font-montserrat">
                              {selectedCurrency.symbol}
                              {formatPrice(convertPrice(product.originalPrice))}
                            </p>
                          )}
                          <p className="text-[#1a1a1a] font-montserrat text-sm md:text-base price-tag">
                            {selectedCurrency.symbol}
                            {formatPrice(convertPrice(product.discountPrice))}
                          </p>
                        </div>

                        {/* Color swatches preview */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex justify-center gap-1.5 mt-3">
                            {product.colors.slice(0, 4).map((color, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                              ></div>
                            ))}
                            {product.colors.length > 4 && (
                              <div className="text-xs text-gray-500 font-montserrat">
                                +{product.colors.length - 4}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Mobile Product Display */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-4 px-4 mb-8">
            {newArrivals
              .slice(visibleCardIndex, visibleCardIndex + 2)
              .map((product, index) => {
                const globalIndex = visibleCardIndex + index;

                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="luxury-card bg-white rounded-lg overflow-hidden shadow-md group"
                  >
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      style={{ aspectRatio: "3/4" }}
                      onClick={() => {
                        navigate(`/collection/${product.id}`);
                      }}
                    >
                      {/* Image loading skeleton */}
                      {imageLoading[globalIndex] !== false && (
                        <div className="absolute inset-0 image-skeleton"></div>
                      )}

                      <img
                        src={product.images[currentIndexes[globalIndex] || 0]}
                        alt={product.title}
                        className="w-full h-full object-cover luxury-image"
                        onLoad={() => handleImageLoad(globalIndex)}
                      />

                      {/* Overlay and other elements same as desktop */}
                      <div className="luxury-overlay absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
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
                            handleWishlistToggle(e, product, globalIndex);
                          }}
                          className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md wishlist-btn hover:scale-110 transition-transform"
                        >
                          {isInWishlist(
                            product.id || `product-${globalIndex}`
                          ) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart className="text-gray-800" />
                          )}
                        </button>
                      </div>

                      {/* New Badge */}
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <div className="elegant-badge text-white text-xs px-2.5 py-1 rounded-sm shadow-md">
                          NEW
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-4 flex flex-col items-center bg-white"
                      onClick={() => {
                        navigate(`/collection/${product.id}`);
                      }}
                    >
                      <h3 className="text-sm md:text-base font-cormorant text-[#1a1a1a] font-semibold mb-2 tracking-wide">
                        {product.title}
                      </h3>

                      <div className="flex items-center justify-center gap-3">
                        {product.originalPrice && (
                          <p className="text-gray-500 line-through text-xs font-montserrat">
                            {selectedCurrency.symbol}
                            {formatPrice(convertPrice(product.originalPrice))}
                          </p>
                        )}
                        <p className="text-[#1a1a1a] font-montserrat text-sm md:text-base price-tag">
                          {selectedCurrency.symbol}
                          {formatPrice(convertPrice(product.discountPrice))}
                        </p>
                      </div>

                      {/* Color swatches preview */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex justify-center gap-1.5 mt-3">
                          {product.colors.slice(0, 4).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                          {product.colors.length > 4 && (
                            <div className="text-xs text-gray-500 font-montserrat">
                              +{product.colors.length - 4}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        )}
      </div>

      {/* Pagination Dots for Desktop */}
      {!isMobile && totalPages > 1 && (
        <div className="pagination-indicator mb-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={`pagination-dot ${currentPage === i ? "active" : ""}`}
              onClick={() => setCurrentPage(i)}
              role="button"
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* QuickView Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
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
                    onClick={() => setSelectedProduct(null)}
                  >
                    ✖
                  </button>

                  <h2 className="font-cormorant text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-2 tracking-wide">
                    {selectedProduct.title}
                  </h2>

                  <div className="flex items-center gap-3 mb-3">
                    {selectedProduct.originalPrice && (
                      <p className="text-gray-500 line-through text-sm font-montserrat">
                        {selectedCurrency.symbol}
                        {formatPrice(
                          convertPrice(selectedProduct.originalPrice)
                        )}
                      </p>
                    )}
                    <p className="text-[#1a1a1a] font-montserrat text-base md:text-lg font-semibold">
                      {selectedCurrency.symbol}
                      {formatPrice(
                        convertPrice(
                          selectedProduct.discountPrice ||
                            selectedProduct.originalPrice
                        )
                      )}
                    </p>

                    <span className="text-xs bg-[#1a1a1a] text-white px-2 py-0.5 rounded-sm font-montserrat">
                      NEW
                    </span>
                  </div>

                  <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4 border-t border-b border-gray-100 py-3 max-h-24 overflow-y-auto">
                    {selectedProduct.desc}
                  </p>

                  <div className="mb-4">
                    <h3 className="font-montserrat text-sm uppercase tracking-wider text-[#1a1a1a] mb-2">
                      Select Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors?.map((color, colorIndex) => (
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
                            selectedProduct.id ||
                            Math.random().toString(36).substr(2, 9),
                          title: selectedProduct.title,
                          image: mainImage,
                          images: selectedProduct.images,
                          originalPrice: selectedProduct.originalPrice,
                          discountPrice: selectedProduct.discountPrice,
                          colors: selectedProduct.colors,
                          discount: "NEW",
                          desc: selectedProduct.desc,
                          currencyCode: selectedCurrency.code,
                          currencySymbol: selectedCurrency.symbol,
                        };
                        toggleWishlist(wishlistItem);
                      }}
                      className="w-10 h-10 flex-shrink-0 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      {isInWishlist(
                        selectedProduct.id ||
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
                          selectedProduct.discountPrice ||
                            selectedProduct.originalPrice
                        );

                        addToCart({
                          id:
                            selectedProduct.id ||
                            Math.random().toString(36).substr(2, 9),
                          title: selectedProduct.title,
                          image: mainImage,
                          price: convertedPrice,
                          color: selectedColor,
                          currencyCode: selectedCurrency.code,
                          currencySymbol: selectedCurrency.symbol,
                        });

                        toast.success(`${selectedProduct.title} added to cart`);
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

export default NewArrivals;
