import { useState, useEffect } from "react";

// ImageKit URLs instead of local imports
const desktopImages = [
  "https://ik.imagekit.io/yg3bo4zvy/logo/Artboard1.jpg",
  "https://ik.imagekit.io/yg3bo4zvy/logo/Artboard2.jpg",
  "https://ik.imagekit.io/yg3bo4zvy/logo/Artboard3.jpg",
];

const mobileImage = "https://ik.imagekit.io/yg3bo4zvy/logo/1.png";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up slideshow timer for desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % desktopImages.length);
      }, 5000); // 5 seconds per image

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen overflow-hidden p-0 m-0">
      {isMobile ? (
        // Mobile view - single static image with no gaps
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src={mobileImage}
            alt="Mobile Banner"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        // Desktop view - slideshow
        desktopImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slideshow ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
