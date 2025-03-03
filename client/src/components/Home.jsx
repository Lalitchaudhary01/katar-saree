import { useState, useEffect } from "react";
import img1 from "../assets/Artboard-1-1.jpg";
import img2 from "../assets/Artboard-2-2.jpg";
import img3 from "../assets/Artboard-3.jpg";

const images = [img1, img2, img3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds per image

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Slideshow"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Home;
