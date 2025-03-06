import React, { useState, useEffect, useRef } from "react";
import collections from "../assets/product/CollectionData";
import { motion } from "framer-motion";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
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
  const [selectedColor, setSelectedColor] = useState(null); // Added missing state

  const hoverTimers = useRef({});
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null); // Added missing state

  useEffect(() => {
    if (selectedCollection) {
      setMainImage(selectedCollection.images[0]); // Set default image when modal opens
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

  return (
    <section className="py-16 md:py-24 bg-primary bg-opacity-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#8B6A37] mb-3">
          Featured Collections
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
          Explore our curated selection of premium handcrafted pieces, each
          telling a story of heritage and artistry.
        </p>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {collections
          .slice(0, showAll ? collections.length : 4)
          .map((collection, index) => (
            <div
              key={index}
              className="group w-64 overflow-hidden shadow-lg rounded-xl bg-white border border-[#E0C097] transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.images[currentIndexes[index]]}
                  alt={collection.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  onClick={() => navigate(`/collection/${index}`)}
                />
                <button
                  onClick={() => setSelectedCollection(collection)}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FaEye className="text-[#D4AF37] text-xl" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl text-[#8B6A37] font-semibold mb-2">
                  {collection.title}
                </h3>
                <p className="text-neutral-600 text-sm flex-grow">
                  {collection.desc}
                </p>
                {collection.discountPrice && (
                  <p className="text-[#8B6A37] font-semibold text-lg mt-2">
                    ₹{collection.discountPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-16 text-center">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="bg-[#8B6A37] text-white px-8 py-3 rounded hover:bg-[#B8860B] transition-all"
          >
            Explore All Collections
          </button>
        )}
      </div>

      {selectedCollection && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
        >
          <button
            className="absolute top-4 right-4 text-xl text-[#D4AF37]"
            onClick={() => setSelectedCollection(null)}
          >
            ✖
          </button>
          <h3 className="text-2xl font-bold text-[#8B6A37] mb-4">
            {selectedCollection.title}
          </h3>
          <div className="mt-4 flex flex-col items-center">
            <img
              src={mainImage}
              alt="Selected"
              className="w-80 h-80 object-cover border rounded-lg shadow-md"
            />
            <div className="flex gap-3 mt-4">
              {selectedCollection.images.slice(0, 4).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover border rounded-lg cursor-pointer ${
                    mainImage === img ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
          <p className="text-[#6B4F27] mt-4">{selectedCollection.desc}</p>
          <div className="mt-2 text-center">
            <p className="text-lg font-semibold">
              Original Price: <s>₹{selectedCollection.originalPrice}</s>
            </p>
            <p className="text-xl font-bold text-red-600">
              Discount Price: ₹{selectedCollection.discountPrice} (
              {selectedCollection.discount})
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="font-semibold">Select Size:</p>
            <div className="flex justify-center gap-2 mt-2">
              {selectedCollection.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg text-sm ${
                    selectedSize === size
                      ? "bg-[#8B6A37] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="font-semibold">Select Color:</p>
            <div className="flex justify-center gap-3 mt-2">
              {selectedCollection.colors?.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              className="bg-[#D4AF37] text-white px-6 py-3 rounded hover:bg-[#B8860B] transition-all flex items-center gap-2"
              onClick={() => {
                if (!selectedSize || !selectedColor) {
                  toast.error(
                    "Please select a size and color before adding to cart!"
                  );
                  return;
                }

                addToCart({
                  id:
                    selectedCollection.id ||
                    Math.random().toString(36).substr(2, 9),
                  title: selectedCollection.title,
                  image: mainImage,
                  price:
                    selectedCollection.discountPrice ||
                    selectedCollection.originalPrice,
                  size: selectedSize,
                  color: selectedColor,
                });

                toast.success(`${selectedCollection.title} added to cart!`);
              }}
              disabled={!selectedSize || !selectedColor}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedCollections;
