import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
import { useSelector } from "react-redux";
import QuickViewModal from "../reusable/QuickView";
import "../styles/NewArrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const itemsPerPage = 4;
  const hoverTimers = useRef({});
  const carouselRef = useRef(null);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);

        // Initialize currentIndexes based on fetched data
        const indexes = {};
        response.data.forEach((_, index) => {
          indexes[index] = 0;
        });
        setCurrentIndexes(indexes);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Check if user is on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Cleanup timers on unmount
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
        [index]: (prevIndexes[index] + 1) % products[index].images.length,
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
    e.stopPropagation();

    if (!userInfo) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

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

    const isCurrentlyInWishlist = isInWishlist(wishlistItem.id);
    toggleWishlistItem(wishlistItem);

    if (isCurrentlyInWishlist) {
      toast.success(`${product.title} removed from wishlist`);
    } else {
      toast.success(`${product.title} added to wishlist`);
    }
  };

  // Mobile navigation
  const handleNextCard = () => {
    const maxIndex = Math.max(0, products.length - 2);
    setVisibleCardIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 2
    );
  };

  const handlePrevCard = () => {
    const maxIndex = Math.max(0, products.length - 2);
    setVisibleCardIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 2
    );
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        if (isMobile) handleNextCard();
        else goToNextPage();
      } else {
        if (isMobile) handlePrevCard();
        else goToPrevPage();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Desktop pagination
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#f9f7f5]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1a1a1a] mb-4 tracking-wider">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-12 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <div className="animate-pulse bg-gray-200 w-full h-full"></div>
                </div>
                <div className="p-4">
                  <div className="animate-pulse bg-gray-200 h-4 w-3/4 mb-2"></div>
                  <div className="animate-pulse bg-gray-200 h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-[#f9f7f5]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1a1a1a] mb-4 tracking-wider">
            New Arrivals
          </h2>
          <p className="text-red-500 font-montserrat">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#f9f7f5]">
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

      <div
        className="relative"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Navigation */}
        {isMobile && products.length > 0 && (
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

        {/* Desktop View */}
        {!isMobile && products.length > 0 && (
          <div className="swiper-container">
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
                      key={product.id || globalIndex}
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
                        onClick={() => navigate(`/collection/${product.id}`)}
                      >
                        {imageLoading[globalIndex] !== false && (
                          <div className="absolute inset-0 image-skeleton"></div>
                        )}

                        <img
                          src={product.images[currentIndexes[globalIndex] || 0]}
                          alt={product.title}
                          className="w-full h-full object-cover luxury-image"
                          onLoad={() => handleImageLoad(globalIndex)}
                        />

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

                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                          <button
                            onClick={(e) =>
                              handleWishlistToggle(e, product, globalIndex)
                            }
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

                        <div className="absolute top-3 left-3 pointer-events-none">
                          <div className="elegant-badge text-white text-xs px-2.5 py-1 rounded-sm shadow-md">
                            NEW
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-4 flex flex-col items-center bg-white"
                        onClick={() => navigate(`/collection/${product.id}`)}
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

        {/* Mobile View */}
        {isMobile && products.length > 0 && (
          <div className="grid grid-cols-2 gap-4 px-4 mb-8">
            {products
              .slice(visibleCardIndex, visibleCardIndex + 2)
              .map((product, index) => {
                const globalIndex = visibleCardIndex + index;

                return (
                  <motion.div
                    key={product.id || globalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="luxury-card bg-white rounded-lg overflow-hidden shadow-md group"
                  >
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      style={{ aspectRatio: "3/4" }}
                      onClick={() => navigate(`/collection/${product.id}`)}
                    >
                      {imageLoading[globalIndex] !== false && (
                        <div className="absolute inset-0 image-skeleton"></div>
                      )}

                      <img
                        src={product.images[currentIndexes[globalIndex] || 0]}
                        alt={product.title}
                        className="w-full h-full object-cover luxury-image"
                        onLoad={() => handleImageLoad(globalIndex)}
                      />

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

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                        <button
                          onClick={(e) =>
                            handleWishlistToggle(e, product, globalIndex)
                          }
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

                      <div className="absolute top-3 left-3 pointer-events-none">
                        <div className="elegant-badge text-white text-xs px-2.5 py-1 rounded-sm shadow-md">
                          NEW
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-4 flex flex-col items-center bg-white"
                      onClick={() => navigate(`/collection/${product.id}`)}
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

      {/* Pagination for Desktop */}
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

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="font-montserrat text-gray-600">No products available</p>
        </div>
      )}

      <QuickViewModal
        selectedProduct={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default NewArrivals;
