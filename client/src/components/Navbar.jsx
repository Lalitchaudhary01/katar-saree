import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.length;
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navbar */}
      <div className="top-0 left-0 w-full bg-[#c98a5e] text-white py-2 px-4 flex justify-between items-center z-50">
        {/* Contact Info */}
        <div className="text-sm">
          <span className="mr-4">📞 +91 7860783350</span>
          <span>📧 contact@katanbanaras.com</span>
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:opacity-75">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:opacity-75">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:opacity-75">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 left-0 w-full bg-white shadow-md py-3 px-6 flex justify-between items-center z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/KatanBanarasp.png"
            alt="Katan Saree Logo"
            className="w-12 h-12 ml-12 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-[#c98a5e]">
            Home
          </Link>

          {/* Dropdown for Sarees */}
          <div className="relative group">
            <button className="hover:text-[#c98a5e]">Sarees ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-40">
              <Link
                to="/sarees/silk"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Silk Sarees
              </Link>
              <Link
                to="/sarees/cotton"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Cotton Sarees
              </Link>
              <Link
                to="/sarees/banarasi"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Banarasi Sarees
              </Link>
            </div>
          </div>

          <Link to="/collection" className="hover:text-[#c98a5e]">
            Collections
          </Link>
          <Link to="#" className="hover:text-[#c98a5e]">
            About Us
          </Link>
          <Link to="#" className="hover:text-[#c98a5e]">
            Contact
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex space-x-4 text-gray-600 relative">
          <FaSearch className="cursor-pointer hover:text-[#c98a5e]" size={20} />
          <FaUser className="cursor-pointer hover:text-[#c98a5e]" size={20} />
          <FaHeart className="cursor-pointer hover:text-[#c98a5e]" size={20} />
          <Link to="/cart" className="relative">
            <FaShoppingCart
              className="cursor-pointer hover:text-[#c98a5e]"
              size={20}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c98a5e] text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
