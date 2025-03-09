import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Check if an item is in the wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Add item to wishlist
  const addToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      setWishlistItems([...wishlistItems, item]);
      toast.success(`${item.title} added to your wishlist!`);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const itemToRemove = wishlistItems.find((item) => item.id === id);
    const newWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(newWishlist);
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
