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

  // ✅ MAIN FIX: API Base URL add karo
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // ✅ FIX: Full URL use karo (tumhare backend ke according endpoint change karo)
          const { data } = await axios.get(`${API_BASE_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
          setIsAuthenticated(true);
        } catch (err) {
          console.log("Token verification failed:", err);
          logout();
        }
      }
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      // ✅ FIX: Full URL use karo
      const { data } = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
