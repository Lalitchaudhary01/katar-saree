import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { useCurrency } from "../context/currencyContext";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const { selectedCurrency, convertPrice } = useCurrency();

  // Fetch all products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Replace with your actual API endpoint
        const response = await fetch("/api/products");
        const data = await response.json();

        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when search query or category filter changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.tags &&
          product.tags.some((tag) => tag.toLowerCase().includes(query)));

      const matchesCategory =
        filterCategory === "all" || product.category === filterCategory;

      return matchesQuery && matchesCategory;
    });

    setSearchResults(filtered);
  }, [searchQuery, allProducts, filterCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "sarees", label: "Sarees" },
    { value: "fabric", label: "Fabrics" },
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-3xl font-cardo text-center mb-8">Search Products</h1>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative flex">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-4 pl-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent transition-all"
            />
            <div className="absolute left-4 top-4 text-gray-400">
              <FaSearch size={20} />
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle size={20} />
              </button>
            )}
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-4 border border-l-0 border-gray-300 rounded-r-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5e3c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Search Results */}
      {!loading && searchQuery && (
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">
            {searchResults.length > 0
              ? `Found ${searchResults.length} results for "${searchQuery}"`
              : `No results found for "${searchQuery}"`}
          </h2>

          {searchResults.length === 0 && searchQuery && !loading && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">
                No matching products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try different keywords or browse our categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setFilterCategory(category.value);
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative pb-[125%]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10"></div>
                  </Link>
                </div>
                <div className="mt-3">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-base font-medium mb-1 truncate hover:text-[#8b5e3c] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 truncate">
                      {product.category}
                    </p>
                    <div className="flex items-center">
                      <span className="font-medium">
                        {selectedCurrency.symbol}
                        {convertPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {selectedCurrency.symbol}
                          {convertPrice(product.comparePrice)}
                        </span>
                      )}
                      {product.comparePrice && (
                        <span className="ml-2 text-sm text-green-600">
                          {Math.round(
                            ((product.comparePrice - product.price) /
                              product.comparePrice) *
                              100
                          )}
                          % off
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Products (when no search) */}
      {!searchQuery && !loading && (
        <div>
          <h2 className="text-xl font-medium mb-6">Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative pb-[125%]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10"></div>
                  </Link>
                </div>
                <div className="mt-3">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-base font-medium mb-1 truncate hover:text-[#8b5e3c] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 truncate">
                      {product.category}
                    </p>
                    <div className="flex items-center">
                      <span className="font-medium">
                        {selectedCurrency.symbol}
                        {convertPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {selectedCurrency.symbol}
                          {convertPrice(product.comparePrice)}
                        </span>
                      )}
                      {product.comparePrice && (
                        <span className="ml-2 text-sm text-green-600">
                          {Math.round(
                            ((product.comparePrice - product.price) /
                              product.comparePrice) *
                              100
                          )}
                          % off
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
