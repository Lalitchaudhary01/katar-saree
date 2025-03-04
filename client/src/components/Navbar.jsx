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

const Navbar = () => {
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
            className="w-12 h-12  ml-12 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-[#c98a5e]">
            Home
          </a>

          {/* Dropdown Menus */}
          {[
            {
              title: "Sarees",
              items: ["Silk Sarees", "Cotton Sarees", "Banarasi Sarees"],
            },
            { title: "Lehengas", items: ["Bridal Lehengas", "Party Wear"] },
          ].map((menu, index) => (
            <div key={index} className="relative group">
              <button className="hover:text-[#c98a5e]">{menu.title} ▾</button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-40">
                {menu.items.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <a href="#" className="hover:text-[#c98a5e]">
            Collections
          </a>
          <a href="#" className="hover:text-[#c98a5e]">
            About Us
          </a>
          <a href="#" className="hover:text-[#c98a5e]">
            Contact
          </a>
        </nav>

        {/* Right Side Icons */}
        <div className="flex space-x-4 text-gray-600">
          <div className="flex space-x-4 text-gray-600">
            <FaSearch
              className="cursor-pointer hover:text-[#c98a5e]"
              size={20}
            />
            <FaUser className="cursor-pointer hover:text-[#c98a5e]" size={20} />
            <FaHeart
              className="cursor-pointer hover:text-[#c98a5e]"
              size={20}
            />

            <Link to="/cart">
              <FaShoppingCart
                className="cursor-pointer hover:text-[#c98a5e]"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
