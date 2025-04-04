import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  // In both context files, add this to clear data on logout:
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userInfo" && e.oldValue && !e.newValue) {
        // User logged out
        setCart([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Check if an item is in the wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Add item to wishlist
  const addToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      setWishlistItems((prevItems) => [...prevItems, item]);
      toast.success(`${item.title} added to your wishlist!`);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const itemToRemove = wishlistItems.find((item) => item.id === id);
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (itemToRemove) {
      toast.success(`${itemToRemove.title} removed from your wishlist!`);
    }
  };

  // Toggle wishlist item
  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
