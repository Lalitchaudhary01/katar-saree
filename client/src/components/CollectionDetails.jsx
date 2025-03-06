import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import collections from "../assets/product/CollectionData";
import newArrivals from "../assets/product/NewArrival";
import { toast } from "react-hot-toast";

const CollectionDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const numericId = Number(id);

  // Find collection in both datasets
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
    <div className="container mx-auto p-8 max-w-3xl bg-[#faf7f2] shadow-md rounded-lg font-cardo">
      {/* Add Cardo font to your index.html or import it in your CSS */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap");
      `}</style>

      <h2 className="text-3xl font-bold text-center text-[#8B6A37] italic">
        {collection.title}
      </h2>

      {/* Image Section - with soft shadow and border */}
      <div className="mt-6 flex flex-col items-center">
        <img
          src={mainImage}
          alt="Selected"
          className="w-80 h-80 object-cover border border-[#d4c8b0] rounded-md shadow-lg"
        />
        <div className="flex gap-3 mt-4">
          {collection.images.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover border rounded cursor-pointer hover:opacity-80 transition ${
                mainImage === img
                  ? "border-2 border-[#8B6A37] shadow-md"
                  : "border-[#d4c8b0]"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-gray-700 text-center leading-relaxed">
        {collection.desc}
      </p>
      <div className="mt-4 text-center">
        <p className="text-lg">
          Original Price:{" "}
          <s className="text-gray-500">₹{collection.originalPrice}</s>
        </p>
        <p className="text-xl font-bold text-[#8B6A37]">
          ₹{collection.discountPrice}{" "}
          <span className="text-sm text-red-600">
            ({collection.discount} off)
          </span>
        </p>
      </div>

      {/* Sizes with more elegant styling */}
      <div className="mt-6 text-center">
        <p className="font-semibold text-[#5c4a24]">Select Size:</p>
        <div className="flex justify-center gap-3 mt-2">
          {collection.sizes.map((size, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded text-sm transition-all ${
                selectedSize === size
                  ? "bg-[#8B6A37] text-white border-[#8B6A37]"
                  : "bg-[#f5f1e6] border-[#d4c8b0] hover:bg-[#e9e1d0]"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors with refined styling */}
      <div className="mt-6 text-center">
        <p className="font-semibold text-[#5c4a24]">Select Color:</p>
        <div className="flex justify-center gap-4 mt-2">
          {collection.colors.map((color, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full transition-all ${
                selectedColor === color
                  ? "border-2 border-[#8B6A37] scale-110 shadow-md"
                  : "border border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Buttons with more elegant styling */}
      <div className="mt-8 flex justify-center gap-6">
        <button
          className="bg-[#8B6A37] text-white px-6 py-2 rounded-md shadow hover:bg-[#6d5429] transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button className="border border-[#8B6A37] text-[#8B6A37] px-6 py-2 rounded-md hover:bg-[#f5f1e6] transition">
          Buy It Now
        </button>
      </div>
    </div>
  );
};

export default CollectionDetail;
