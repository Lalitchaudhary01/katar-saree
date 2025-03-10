import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Search your actual products
  const searchProducts = async (query) => {
    if (!query || query.length < 2) return [];

    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get(
        `/api/products/search?q=${encodeURIComponent(query)}`
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      setIsLoading(false);
      return [];
    }
  };

  // Handle search input change
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      setIsSearchOpen(true);
      const results = await searchProducts(value);
      setSearchResults(results);
    } else {
      setIsSearchOpen(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon and Input Field */}
      <div className="flex items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-amber-600 text-white p-2 rounded-r-md hover:bg-amber-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Search Results Dropdown */}
      {isSearchOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-2">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <ul className="py-1">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultClick(product.id)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={product.image || product.images[0]}
                        alt={product.name || product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {product.name || product.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.category || product.collection}
                      </p>
                      <p className="text-sm font-semibold text-amber-600">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              <li className="px-4 py-2 text-center border-t">
                <button
                  onClick={handleSearchSubmit}
                  className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                >
                  View all results
                </button>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Full search results page component
const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Get search query from URL
  const query = new URLSearchParams(window.location.search).get("q");

  useEffect(() => {
    // Function to fetch actual products
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          `/api/products/search?q=${encodeURIComponent(query)}`
        );
        setSearchResults(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-1">
          {searchResults.length}{" "}
          {searchResults.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-8 w-8 text-amber-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="h-56 bg-gray-200">
                <img
                  src={product.image || product.images[0]}
                  alt={product.name || product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  {product.category || product.collection}
                </p>
                <h3 className="mt-1 text-lg font-medium text-gray-900">
                  {product.name || product.title}
                </h3>
                <p className="mt-1 text-lg font-semibold text-amber-600">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/collections")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Browse Collections
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchComponent, SearchResultsPage };
