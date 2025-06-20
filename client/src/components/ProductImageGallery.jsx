import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const ProductImageGallery = ({
  collection,
  selectedColorVariant,
  selectedColor,
  isInWishlist,
  onWishlistToggle,
}) => {
  const [mainImage, setMainImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState({
    isZoomed: false,
    position: { x: 50, y: 50 },
  });

  // Initialize images when color variant changes
  useEffect(() => {
    if (selectedColorVariant && selectedColorVariant.images) {
      setCurrentImages(selectedColorVariant.images);
      setMainImage(selectedColorVariant.images[0]);
      setCurrentThumbnailIndex(0);
    } else if (collection?.images) {
      setCurrentImages(collection.images);
      setMainImage(collection.images[0]);
      setCurrentThumbnailIndex(0);
    }
  }, [selectedColorVariant, collection]);

  // Image Zoom Handlers
  const handleImageZoom = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setImageZoom((prev) => ({
      isZoomed: !prev.isZoomed,
      position: {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      },
    }));
  };

  const handleMouseMove = (e) => {
    if (imageZoom.isZoomed) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setImageZoom((prev) => ({
        ...prev,
        position: {
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        },
      }));
    }
  };

  // Reset zoom when main image changes
  useEffect(() => {
    setImageZoom({ isZoomed: false, position: { x: 50, y: 50 } });
  }, [mainImage]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: collection.title,
        text: collection.desc,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Thumbnail navigation functions
  const getVisibleThumbnails = () => {
    const isMobile = window.innerWidth < 768;
    const thumbnailsPerPage = isMobile ? 4 : 6;
    const startIndex = currentThumbnailIndex;
    const endIndex = Math.min(
      startIndex + thumbnailsPerPage,
      currentImages.length
    );
    return currentImages.slice(startIndex, endIndex);
  };

  const canScrollLeft = currentThumbnailIndex > 0;
  const canScrollRight = () => {
    const isMobile = window.innerWidth < 768;
    const thumbnailsPerPage = isMobile ? 4 : 6;
    return currentThumbnailIndex + thumbnailsPerPage < currentImages.length;
  };

  const scrollThumbnails = (direction) => {
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 3;

    if (direction === "left" && canScrollLeft) {
      setCurrentThumbnailIndex(Math.max(0, currentThumbnailIndex - step));
    } else if (direction === "right" && canScrollRight()) {
      const maxIndex = Math.max(0, currentImages.length - (isMobile ? 4 : 6));
      setCurrentThumbnailIndex(
        Math.min(maxIndex, currentThumbnailIndex + step)
      );
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gray-50"
          style={{ height: "600px" }}
          key={mainImage}
        >
          <motion.img
            src={mainImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onDoubleClick={handleImageZoom}
            onMouseMove={handleMouseMove}
            className={`w-full h-full transition-all duration-500 ease-in-out select-none
              ${
                imageZoom.isZoomed
                  ? "cursor-zoom-out scale-150 object-cover"
                  : "cursor-zoom-in object-cover"
              }`}
            style={
              imageZoom.isZoomed
                ? {
                    transformOrigin: `${imageZoom.position.x}% ${imageZoom.position.y}%`,
                    objectPosition: "center",
                  }
                : {
                    objectPosition: "center top",
                  }
            }
            draggable={false}
          />

          {/* Color indicator overlay */}
          {selectedColor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-medium z-10"
            >
              {selectedColor}
            </motion.div>
          )}

          {/* Zoom indicator */}
          {imageZoom.isZoomed && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm z-10">
              Double-click to zoom out
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* IMPROVED THUMBNAIL GALLERY */}
      <div className="mt-6">
        <div className="relative">
          {/* Thumbnail container */}
          <div className="flex items-center">
            {/* Left scroll button */}
            {canScrollLeft && (
              <button
                onClick={() => scrollThumbnails("left")}
                className="absolute left-0 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-colors -ml-4"
              >
                <FaChevronLeft className="text-sm" />
              </button>
            )}

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-hidden mx-4 md:mx-0">
              <div className="flex space-x-3 transition-transform duration-300">
                {getVisibleThumbnails().map((img, index) => {
                  const actualIndex = currentThumbnailIndex + index;
                  return (
                    <motion.img
                      key={`${selectedColor}-${actualIndex}`}
                      src={img}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer transition-all border-2
                        ${
                          mainImage === img
                            ? "ring-2 ring-black ring-offset-2 border-black opacity-100"
                            : "border-gray-200 opacity-70 hover:opacity-90 hover:border-gray-400"
                        }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right scroll button */}
            {canScrollRight() && (
              <button
                onClick={() => scrollThumbnails("right")}
                className="absolute right-0 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-colors -mr-4"
              >
                <FaChevronRight className="text-sm" />
              </button>
            )}
          </div>

          {/* Thumbnail indicator dots (mobile only) */}
          {window.innerWidth < 768 && currentImages.length > 4 && (
            <div className="flex justify-center mt-3 space-x-1">
              {Array.from({
                length: Math.ceil(currentImages.length / 4),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentThumbnailIndex(index * 4)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentThumbnailIndex / 4) === index
                      ? "bg-black"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wishlist and Share Buttons */}
      <div className="absolute top-4 right-4 flex space-x-3 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onWishlistToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isInWishlist ? "bg-red-500 text-white" : "bg-white text-gray-700"
          } shadow-md`}
        >
          <FaHeart className={isInWishlist ? "text-white" : "text-gray-400"} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-white text-gray-700 shadow-md flex items-center justify-center"
        >
          <FaShare className="text-gray-400" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProductImageGallery;
