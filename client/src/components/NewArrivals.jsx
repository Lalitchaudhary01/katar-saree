import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import newArrivals from "../assets/product/NewArrival";

const NewArrivals = () => {
  const { addToCart } = useCart(); // Using addToCart from context
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setMainImage(product.images[0]);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="new-arrivals" className="py-16 md:py-24 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#8B6A37] mb-3">
            New Arrivals
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
            The latest additions to our collection, blending tradition with
            contemporary design.
          </p>
          <div className="w-24 h-0.5 bg-accent mx-auto mt-6"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="product-carousel"
        >
          {newArrivals.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card group bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative">
                <div className="relative overflow-hidden rounded-lg">
                  <span className="absolute top-4 right-4 bg-accent text-white text-xs font-secondary px-3 py-1 z-10">
                    New
                  </span>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => navigate(`/collection/${product.id}`)}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                  />
                  <button
                    onClick={() => openModal(product)}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-md transition-transform hover:scale-110 opacity-0 group-hover:opacity-100 duration-300"
                  >
                    <FaEye className="text-[#D4AF37] text-xl" />
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="font-primary text-lg text-secondary">
                    {product.title}
                  </h3>
                  <p className="font-secondary text-neutral-600 text-sm mt-1">
                    {product.desc}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="font-secondary text-secondary font-semibold">
                      ₹{product.discountPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedProduct && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
        >
          <button
            className="absolute top-4 right-4 text-xl text-[#D4AF37]"
            onClick={closeModal}
          >
            ✖
          </button>
          <h3 className="text-2xl font-bold text-[#8B6A37] mb-4">
            {selectedProduct.title}
          </h3>
          <div className="mt-4 flex flex-col items-center">
            <img
              src={mainImage}
              alt="Selected"
              className="w-80 h-80 object-cover border rounded-lg shadow-md"
            />
            <div className="flex gap-3 mt-4">
              {selectedProduct.images.map((img, index) => (
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
          <p className="text-[#6B4F27] mt-4">{selectedProduct.desc}</p>
          <div className="mt-2 text-center">
            <p className="text-lg font-semibold">
              Original Price: <s>₹{selectedProduct.originalPrice}</s>
            </p>
            <p className="text-xl font-bold text-red-600">
              Discount Price: ₹{selectedProduct.discountPrice} (
              {selectedProduct.discount})
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="font-semibold">Select Size:</p>
            <div className="flex justify-center gap-2 mt-2">
              {selectedProduct.sizes?.map((size, index) => (
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
              {selectedProduct.colors?.map((color, index) => (
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
                  id: selectedProduct.id,
                  title: selectedProduct.title,
                  image: mainImage,
                  price: selectedProduct.discountPrice,
                  size: selectedSize,
                  color: selectedColor,
                });
                toast.success(`${selectedProduct.title} added to cart!`);
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

export default NewArrivals;
