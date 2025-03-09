import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import collections from "../assets/product/CollectionData";
import newArrivals from "../assets/product/NewArrival";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const CollectionDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const numericId = Number(id);

  const collection =
    collections.find((item) => item.id === numericId) ||
    newArrivals.find((item) => item.id === numericId);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(collection?.images[0]);

  if (!collection) {
    return (
      <p className="text-center text-red-500 font-cardo">
        Collection not found!
      </p>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart!");
      return;
    }

    const cartItem = {
      id: collection.id,
      title: collection.title,
      image: mainImage,
      price: collection.discountPrice,
      size: selectedSize,
      color: selectedColor,
    };

    addToCart(cartItem);
    toast.success(
      `${collection.title} (Size: ${selectedSize}, Color: ${selectedColor}) added to cart!`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 max-w-5xl bg-white/70 backdrop-blur-md shadow-xl rounded-lg font-cardo"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Images */}
        <div className="md:w-1/2 flex flex-col items-center">
          <motion.img
            src={mainImage}
            alt="Selected"
            className="w-80 h-80 object-cover border border-[#d4c8b0] rounded-md shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex gap-3 mt-4">
            {collection.images.slice(0, 4).map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover border rounded cursor-pointer hover:opacity-80 transition ${
                  mainImage === img
                    ? "border-2 border-[#8B6A37] shadow-md"
                    : "border-[#d4c8b0]"
                }`}
                onClick={() => setMainImage(img)}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-black italic">
            {collection.title}
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {collection.desc}
          </p>

          <div className="mt-4">
            <p className="text-lg">
              Original Price:{" "}
              <s className="text-gray-500">₹{collection.originalPrice}</s>
            </p>
            <p className="text-xl font-bold text-black">
              ₹{collection.discountPrice}{" "}
              <span className="text-sm text-red-600">
                ({collection.discount} off)
              </span>
            </p>
          </div>

          {/* Sizes with Animation */}
          <div className="mt-6">
            <p className="font-semibold text-black">Select Size:</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {collection.sizes.map((size, index) => (
                <motion.button
                  key={index}
                  className={`px-4 py-2 border rounded text-sm transition-all ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-[#F9F6F0]"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  whileTap={{ scale: 0.9 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Colors with Animation */}
          <div className="mt-6">
            <p className="font-semibold text-black">Select Color:</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {collection.colors.map((color, index) => (
                <motion.button
                  key={index}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color
                      ? "border-2 border-black scale-110 shadow-md"
                      : "border border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  whileHover={{ scale: 1.2 }}
                ></motion.button>
              ))}
            </div>
          </div>

          {/* Buttons with Animation */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              className="bg-[#8B6A37] text-white px-6 py-2 rounded-md shadow hover:bg-[#6d5429] transition"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              className="border border-[#8B6A37] text-[#8B6A37] px-6 py-2 rounded-md hover:bg-[#f5f1e6] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy It Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionDetail;
