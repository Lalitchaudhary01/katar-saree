import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import newArrivals from "../assets/product/NewArrival";

const NewArrivals = () => {
  const navigate = useNavigate();

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
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

                  {/* Eye Button on Image */}
                  <button
                    onClick={() => navigate(`/collection/${product.id}`)}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-md transition-transform hover:scale-110"
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
    </section>
  );
};

export default NewArrivals;
