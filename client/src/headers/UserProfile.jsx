import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUser, FiEdit2, FiSave, FiLogOut, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { logout } from "../Redux/authSlice";

const UserProfile = ({ onClose }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user profile data from backend
    const fetchUserProfile = async () => {
      try {
        // You can replace this with your actual API call
        setProfileData({
          name: userInfo?.name || "",
          email: userInfo?.email || "",
          phone: userInfo?.phone || "",
          address: userInfo?.address || "",
        });
      } catch (error) {
        toast.error("Failed to fetch profile data");
      }
    };

    if (userInfo) {
      fetchUserProfile();
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
    if (onClose) onClose();
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full mx-auto border border-gray-100">
          <p className="text-center text-gray-700 font-light text-lg mb-6">
            Please log in to view your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-4 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors uppercase tracking-widest font-light text-sm"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full mx-auto border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl text-black flex items-center tracking-wider font-light">
            <FiUser className="mr-2" /> PROFILE
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600 transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="space-y-6 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-black mb-2 uppercase text-xs tracking-widest font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-b ${
                  isEditing ? "border-black" : "border-gray-200"
                } focus:outline-none bg-white text-black`}
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-black mb-2 uppercase text-xs tracking-widest font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-b ${
                  isEditing ? "border-black" : "border-gray-200"
                } focus:outline-none bg-white text-black`}
                placeholder="Your Email"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-black mb-2 uppercase text-xs tracking-widest font-medium"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-b ${
                  isEditing ? "border-black" : "border-gray-200"
                } focus:outline-none bg-white text-black`}
                placeholder="Your Phone Number"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-black mb-2 uppercase text-xs tracking-widest font-medium"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                className={`w-full px-4 py-3 border-b ${
                  isEditing ? "border-black" : "border-gray-200"
                } focus:outline-none bg-white text-black resize-none`}
                placeholder="Your Address"
              />
            </div>
          </div>

          <div className="mt-10 w-full space-y-4">
            {isEditing ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all duration-300 uppercase tracking-widest font-light"
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <FiSave className="mr-2" /> SAVE CHANGES
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full flex justify-center items-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all duration-300 uppercase tracking-widest font-light"
              >
                <FiEdit2 className="mr-2" /> EDIT PROFILE
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex justify-center items-center bg-white text-black py-3 rounded-md border border-black hover:bg-gray-50 transition-all duration-300 uppercase tracking-widest font-light"
            >
              <FiLogOut className="mr-2" /> LOGOUT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
