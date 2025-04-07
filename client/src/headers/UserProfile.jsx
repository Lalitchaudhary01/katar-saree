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
        // const response = await fetch('/api/user/profile', {
        //   headers: {
        //     Authorization: `Bearer ${userInfo.token}`,
        //   },
        // });
        // const data = await response.json();

        // For now, we'll just use the data from Redux
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
      // Implement your API call to update user profile
      // const response = await fetch('/api/user/profile/update', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      //   body: JSON.stringify(profileData),
      // });

      // const data = await response.json();

      // if (response.ok) {
      //   toast.success('Profile updated successfully');
      // } else {
      //   toast.error(data.message || 'Update failed');
      // }

      // Mock success for now
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
      <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full">
        <p className="text-center text-gray-700">
          Please log in to view your profile
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-[#8b5e3c] text-white py-2 rounded hover:bg-[#6d4c41] transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full font-cardo">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5d4037] flex items-center">
          <FiUser className="mr-2" /> My Profile
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#5d4037] hover:text-[#8b5e3c]"
          >
            <FiArrowLeft size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-[#5d4037] font-medium mb-1"
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
              className={`w-full px-3 py-2 border ${
                isEditing ? "border-[#c98a5e]" : "border-gray-300 bg-gray-50"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b5e3c]`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-[#5d4037] font-medium mb-1"
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
              className={`w-full px-3 py-2 border ${
                isEditing ? "border-[#c98a5e]" : "border-gray-300 bg-gray-50"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b5e3c]`}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-[#5d4037] font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border ${
                isEditing ? "border-[#c98a5e]" : "border-gray-300 bg-gray-50"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b5e3c]`}
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-[#5d4037] font-medium mb-1"
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
              className={`w-full px-3 py-2 border ${
                isEditing ? "border-[#c98a5e]" : "border-gray-300 bg-gray-50"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b5e3c]`}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {isEditing ? (
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center bg-[#8b5e3c] text-white py-2 rounded hover:bg-[#6d4c41] transition-colors"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full flex justify-center items-center bg-[#c98a5e] text-white py-2 rounded hover:bg-[#8b5e3c] transition-colors"
            >
              <FiEdit2 className="mr-2" /> Edit Profile
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex justify-center items-center bg-gray-200 text-[#5d4037] py-2 rounded hover:bg-gray-300 transition-colors"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
