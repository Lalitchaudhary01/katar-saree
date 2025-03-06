import { useState, useEffect, useRef } from "react";
import img1 from "../assets/Artboard-1-1.jpg";
import img2 from "../assets/Artboard-2-2.jpg";
import img3 from "../assets/Artboard-3.jpg";

// Sample product data
const featuredProducts = [
  { id: 1, name: "Royal Banarasi Silk", price: "₹24,999", image: img1 },
  { id: 2, name: "Heritage Collection", price: "₹32,499", image: img2 },
  { id: 3, name: "Festive Elegance", price: "₹28,999", image: img3 },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  // Handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds per image

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle 3D parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sliderRef.current) return;

      const { left, top, width, height } =
        sliderRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const images = sliderRef.current.querySelectorAll(".slider-image");
      const texts = sliderRef.current.querySelectorAll(".slider-text");

      images.forEach((img) => {
        img.style.transform = `
          perspective(1000px)
          rotateX(${y * 5}deg)
          rotateY(${-x * 5}deg)
          scale3d(1.05, 1.05, 1.05)
        `;
      });

      texts.forEach((text) => {
        text.style.transform = `
          translate3d(${x * 30}px, ${y * 30}px, 0)
        `;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100">
      {/* Hero Section with 3D Effect */}
      <div ref={sliderRef} className="relative w-full h-screen overflow-hidden">
        {featuredProducts.map((product, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src={product.image}
              alt={product.name}
              className="slider-image w-full h-full object-cover transition-transform duration-500 ease-out"
            />

            <div className="slider-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-amber-200 mb-8 font-light tracking-wider">
                Timeless Elegance for the Modern Woman
              </p>
              <div className="mt-6">
                <span className="text-2xl md:text-3xl text-white font-light">
                  {product.price}
                </span>
              </div>
              <button className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-sm hover:from-amber-600 hover:to-amber-800 transition-all duration-300 uppercase tracking-widest text-sm">
                Explore Collection
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Luxury Brand Statement */}
      <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-amber-900 mb-6">
          The Essence of Luxury
        </h2>
        <p className="text-lg md:text-xl text-amber-800/80 max-w-3xl mx-auto leading-relaxed">
          KATAN brings the heritage of traditional craftsmanship to the modern
          world. Each saree is meticulously handcrafted by master artisans,
          preserving centuries-old techniques while embracing contemporary
          aesthetics.
        </p>
        <div className="mt-12 border-t border-b border-amber-200 py-6 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <span className="text-3xl font-light text-amber-800">100%</span>
            <p className="text-amber-700 text-sm uppercase tracking-wider mt-2">
              Pure Silk
            </p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-light text-amber-800">1200+</span>
            <p className="text-amber-700 text-sm uppercase tracking-wider mt-2">
              Artisan Hours
            </p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-light text-amber-800">57</span>
            <p className="text-amber-700 text-sm uppercase tracking-wider mt-2">
              Award Winning Designs
            </p>
          </div>
        </div>
      </div>

      {/* Featured Collection Preview */}
      <div className="bg-gradient-to-b from-amber-100 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900 mb-12 text-center">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="relative overflow-hidden h-96">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="mt-2 text-amber-200">{product.price}</p>
                    <button className="mt-4 px-4 py-2 bg-white text-amber-900 rounded-sm text-sm uppercase tracking-wider hover:bg-amber-50 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white transition-all duration-300 uppercase tracking-wider text-sm rounded-sm">
              View All Collections
            </button>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif text-amber-900 mb-6">
              Our Heritage
            </h2>
            <p className="text-amber-800/80 leading-relaxed mb-6">
              Since 1947, KATAN has been synonymous with luxury and tradition.
              Our journey began in the heart of Varanasi, where the ancient art
              of silk weaving has been preserved for generations.
            </p>
            <p className="text-amber-800/80 leading-relaxed">
              Today, we combine time-honored techniques with contemporary design
              sensibilities to create sarees that are not just garments, but
              heirlooms to be passed down through generations.
            </p>
            <button className="mt-8 underline underline-offset-4 text-amber-800 hover:text-amber-600 transition-colors duration-300 uppercase tracking-wide text-sm flex items-center gap-2">
              Read Our Story
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
          <div className="md:w-1/2 overflow-hidden rounded-sm">
            <img
              src={img2}
              alt="Heritage"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
