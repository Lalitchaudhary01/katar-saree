import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const navigate = useNavigate();

  // ✅ API Base URL - Production ke liye important
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // ✅ Full URL use karo, relative URL nahi
          const { data } = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
          setIsAuthenticated(true);
          console.log("Token verified successfully"); // Debug log
        } catch (err) {
          console.log(
            "Token verification failed:",
            err.response?.data || err.message
          );
          logout();
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      // ✅ Full URL use karo
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      console.log("Login successful"); // Debug log
      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
    console.log("Logged out successfully"); // Debug log
  };

  // Debug logging
  useEffect(() => {
    console.log("Auth State:", {
      isAuthenticated,
      hasToken: !!token,
      apiBaseUrl: API_BASE_URL,
    });
  }, [isAuthenticated, token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook that throws error if used outside provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
