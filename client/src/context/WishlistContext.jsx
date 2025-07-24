import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import config from "../api/config"; // Adjust the import path as necessary

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  // Axios instance with auth token
  const api = axios.create({
    baseURL: `${config.BASE_URL}/wishlist`,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!userInfo?._id) {
      setWishlist([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/");
      setWishlist(response.data || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error(error.response?.data?.error || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Add to wishlist
  const addToWishlist = async (item) => {
    if (!userInfo?._id) {
      toast.error("Please login to add items to wishlist");
      return false;
    }

    setLoading(true);
    try {
      await api.post("/add", {
        productId: item.id,
        title: item.title,
        image: item.image,
        originalPrice: item.originalPrice,
        discountPrice: item.discountPrice,
        discount: item.discount,
        colors: item.colors,
        desc: item.desc,
        currencyCode: item.currencyCode,
        currencySymbol: item.currencySymbol,
      });

      await fetchWishlist();
      toast.success("Added to wishlist!");
      return true;
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error(error.response?.data?.error || "Failed to add to wishlist");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!userInfo?._id) return false;

    setLoading(true);
    try {
      await api.delete("/remove", { data: { productId } });
      await fetchWishlist();
      toast.success("Removed from wishlist!");
      return true;
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      toast.error(error.response?.data?.error || "Failed to remove item");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    if (!userInfo?._id) return false;

    setLoading(true);
    try {
      await api.delete("/clear");
      setWishlist([]);
      toast.success("Wishlist cleared!");
      return true;
    } catch (error) {
      console.error("Clear wishlist error:", error);
      toast.error(error.response?.data?.error || "Failed to clear wishlist");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Toggle wishlist item
  const toggleWishlistItem = async (item) => {
    if (isInWishlist(item.id)) {
      await removeFromWishlist(item.id);
    } else {
      await addToWishlist(item);
    }
  };

  // Auto-fetch when user changes
  useEffect(() => {
    fetchWishlist();
  }, [userInfo?._id]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        toggleWishlistItem,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
