import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import collections from "../assets/product/CollectionData";
import { toast } from "react-hot-toast";

const CollectionDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const numericId = Number(id);
  const collection = collections.find((item) => item.id === numericId);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(collection?.images[0]);

  if (!collection) {
    return <p className="text-center text-red-500">Collection not found!</p>;
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
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-[#8B6A37]">
        {collection.title}
      </h2>

      {/* Image Section */}
      <div className="mt-4 flex flex-col items-center">
        <img
          src={mainImage}
          alt="Selected"
          className="w-80 h-80 object-cover border rounded-lg shadow-md"
        />
        <div className="flex gap-3 mt-4">
          {collection.images.slice(0, 4).map((img, index) => (
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

      <p className="mt-4 text-gray-600 text-center">{collection.desc}</p>
      <div className="mt-2 text-center">
        <p className="text-lg font-semibold">
          Original Price: <s>₹{collection.originalPrice}</s>
        </p>
        <p className="text-xl font-bold text-red-600">
          Discount Price: ₹{collection.discountPrice} ({collection.discount})
        </p>
      </div>

      {/* Sizes */}
      <div className="mt-4 text-center">
        <p className="font-semibold">Select Size:</p>
        <div className="flex justify-center gap-2 mt-2">
          {collection.sizes.map((size, index) => (
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

      {/* Colors */}
      <div className="mt-4 text-center">
        <p className="font-semibold">Select Color:</p>
        <div className="flex justify-center gap-3 mt-2">
          {collection.colors.map((color, index) => (
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

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button className="border px-6 py-2 rounded-lg shadow-md">
          Buy It Now
        </button>
      </div>
    </div>
  );
};

export default CollectionDetail;
