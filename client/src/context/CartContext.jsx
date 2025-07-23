import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  // Create axios instance with interceptors
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/cart`,
  });

  // Add request interceptor for token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Fetch user's cart
  const fetchCart = async () => {
    if (!userInfo?._id) {
      setCart([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/");
      setCart(response.data || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.error || "Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userInfo?._id]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!userInfo?._id) {
      toast.error("Please login to add items to cart");
      return false;
    }

    setLoading(true);
    try {
      const response = await api.post("/add", {
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        quantity: item.quantity || 1,
      });

      setCart(response.data || []);
      toast.success("Item added to cart!");
      return true;
    } catch (error) {
      console.error("Add to cart error:", error);
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.error || "Failed to add item to cart"
        );
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId, color) => {
    if (!userInfo?._id) return false;

    setLoading(true);
    try {
      const response = await api.delete("/remove", {
        data: { productId, color },
      });

      setCart(response.data || []);
      toast.success("Item removed from cart!");
      return true;
    } catch (error) {
      console.error("Remove from cart error:", error);
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.error || "Failed to remove item");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, color, quantity) => {
    if (!userInfo?._id) return false;

    setLoading(true);
    try {
      const response = await api.put("/update", {
        productId,
        color,
        quantity,
      });

      setCart(response.data || []);
      return true;
    } catch (error) {
      console.error("Update quantity error:", error);
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.error || "Failed to update quantity");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!userInfo?._id) return false;

    setLoading(true);
    try {
      await api.delete("/clear");
      setCart([]);
      toast.success("Cart cleared!");
      return true;
    } catch (error) {
      console.error("Clear cart error:", error);
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.error || "Failed to clear cart");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  // Get total number of items
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
