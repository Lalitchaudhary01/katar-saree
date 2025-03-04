import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    name: "Blush Pink Handwoven Silk",
    description: "Pure Silk with Zari Border",
    price: "₹24,500",
    image: "https://source.unsplash.com/random/600x800/?silk,saree,pink",
    colors: ["bg-pink-200", "bg-red-300", "bg-purple-200"],
  },
  {
    id: 2,
    name: "Royal Gold Kanjivaram",
    description: "Authentic Kanjivaram Silk",
    price: "₹30,000",
    image: "https://source.unsplash.com/random/600x800/?gold,saree",
    colors: ["bg-yellow-300", "bg-gold-500", "bg-orange-300"],
  },
  {
    id: 3,
    name: "Emerald Green Banarasi",
    description: "Traditional Banarasi Weave",
    price: "₹28,000",
    image: "https://source.unsplash.com/random/600x800/?green,saree",
    colors: ["bg-green-400", "bg-teal-500", "bg-lime-400"],
  },
  {
    id: 4,
    name: "Classic Red Bridal Saree",
    description: "Perfect for Weddings",
    price: "₹35,000",
    image: "https://source.unsplash.com/random/600x800/?red,saree,bridal",
    colors: ["bg-red-500", "bg-maroon-600", "bg-orange-400"],
  },
];

const NewArrivals = () => {
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

        {/* Swiper Carousel */}
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card group bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-lg">
                  <span className="absolute top-4 right-4 bg-accent text-white text-xs font-secondary px-3 py-1 z-10">
                    New
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="mt-4">
                  <h3 className="font-primary text-lg text-secondary">
                    {product.name}
                  </h3>
                  <p className="font-secondary text-neutral-600 text-sm mt-1">
                    {product.description}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="font-secondary text-secondary">
                      {product.price}
                    </p>
                    <div className="flex">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className={`h-4 w-4 rounded-full ${color} border border-neutral-200 mr-1`}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;
