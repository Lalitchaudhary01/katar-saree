import React, { useState, useEffect, useRef } from "react";
import collections from "../assets/product/CollectionData";
import { motion } from "framer-motion";
import {
  FaEye,
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
import { useSelector } from "react-redux";
import QuickViewModal from "../reusable/QuickView";
import "../styles/FeaturedCollections.css";

const FeaturedCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState(
    collections.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoading, setImageLoading] = useState({});

  // Touch swipe variables
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const hoverTimers = useRef({});
  const carouselRef = useRef(null);
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

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

    // Check if user is logged in
    if (!userInfo) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

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

    const isCurrentlyInWishlist = isInWishlist(wishlistItem.id);
    toggleWishlistItem(wishlistItem);

    if (isCurrentlyInWishlist) {
      toast.success(`${collection.title} removed from wishlist`);
    } else {
      toast.success(`${collection.title} added to wishlist`);
    }
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

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum distance to be considered a swipe

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left (next)
        handleNextCard();
      } else {
        // Swiped right (prev)
        handlePrevCard();
      }
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Function to open modal with the selected product
  const openQuickViewModal = (collection) => {
    setSelectedProduct(collection);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeQuickViewModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 md:py-24 bg-[#f9f7f5]">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1a1a1a] mb-4 tracking-wider">
          Featured Collections
        </h2>

        <p className="font-montserrat text-neutral-600 max-w-2xl mx-auto mb-8 text-sm md:text-base tracking-wide leading-relaxed">
          Discover our exquisite selection of handcrafted luxury pieces, each
          meticulously designed to elevate your wardrobe with timeless elegance.
        </p>

        <div className="w-24 h-px bg-[#1a1a1a] mx-auto mb-16"></div>
      </div>

      {/* Collection grid with mobile navigation */}
      <div
        className="relative"
        ref={carouselRef}
        onTouchStart={isMobile ? handleTouchStart : null}
        onTouchMove={isMobile ? handleTouchMove : null}
        onTouchEnd={isMobile ? handleTouchEnd : null}
      >
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
                >
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: "3/4" }}
                    onClick={() => navigate(`/collection/${collection.id}`)}
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
                    />

                    {/* Overlay gradient - make sure this doesn't block clicks */}
                    <div className="luxury-overlay absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
                      {/* Quick view button - enable pointer events just for this button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Stop navigation when clicking button
                          openQuickViewModal(collection);
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
                      <div className="absolute top-3 left-1 md:top-3 sm:top-16 xs:top-16 pointer-events-none">
                        <div className="elegant-badge text-white text-xs px-1.5 py-0.5 rounded-sm shadow-md">
                          {collection.discount}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="p-4 flex flex-col items-center bg-white"
                    onClick={() => navigate(`/collection/${collection.id}`)}
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
            className="explore-btn font-montserrat bg-[#4b1e1e] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#2a2a2a] transition-all shadow-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Full Collection <FaLongArrowAltRight className="ml-1" />
          </motion.button>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        selectedProduct={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeQuickViewModal}
      />
    </section>
  );
};

export default FeaturedCollections;
