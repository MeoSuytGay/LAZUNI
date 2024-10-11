import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListProductByUserIdServices } from '../../services/ListProductByUserIdServices';

export const PendingProduct = ({ userId, status }) => {
  console.log(userId, status);
  const [products, setProducts] = useState([]); // Store all products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Store filtered and sorted products
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [sortType, setSortType] = useState(''); // Sorting type: 'asc' or 'desc'
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Price range filter (default to a high max)
  const [maxPrice, setMaxPrice] = useState(10000000); // Maximum price from the products
  const [hiddenProducts, setHiddenProducts] = useState(new Set()); // Hidden products set

  // Fetch products from API using userId and status
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Set loading true before fetching
        const data = await ListProductByUserIdServices(userId, status); // Fetch products using userId and status

        const maxProductPrice = Math.max(...data.map(product => product.price)); // Get max price from the fetched products
        setProducts(data); // Set all products
        setDisplayedProducts(data); // Initially show all products
        setMaxPrice(maxProductPrice); // Set max price
        setPriceRange([0, maxProductPrice]); // Initialize price range
        setIsLoading(false); // Set loading false after fetching
      } catch (error) {
        console.error('Error fetching products', error);
        setIsLoading(false); // Handle error and stop loading
      }
    };

    fetchProducts();
  }, [userId, status]); // Fetch products when userId or status changes

  // Handle search and price filtering
  useEffect(() => {
    let filteredProducts = products.filter(product =>
      !hiddenProducts.has(product.productId) && // Exclude hidden products
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) && // Search filter
      product.price >= priceRange[0] && product.price <= priceRange[1] // Price range filter
    );

    // Handle sorting
    if (sortType === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filteredProducts); // Update displayed products
  }, [searchTerm, sortType, priceRange, products, hiddenProducts]); // Re-filter when any dependency changes

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price); // Format price for Vietnam currency
  };

  // Hide product
  const handleHideClick = (productId) => {
    setHiddenProducts((prev) => new Set(prev).add(productId)); // Add product ID to hidden set
  };

  // Toggle the edit/delete menu
  const [menuOpen, setMenuOpen] = useState(null);
  const toggleMenu = (productId) => {
    setMenuOpen(menuOpen === productId ? null : productId); // Toggle menu open/close
  };

  return (
    <div className="mb-4 flex mx-auto w-full">
      <div className="w-full">
        {/* Search and Sort Header */}
        <div className="flex justify-between items-center mb-4">
          {/* Search Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="border p-2 rounded-lg w-[400px] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            className="border p-2 rounded-lg"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Products List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span>Loading products...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 border border-gray-100">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product.productId} className="border border-gray-100 p-[10px] flex items-center relative">
                  {/* Product Link */}
                  <div
                    className="flex items-center justify-start w-full transition-transform transform hover:scale-105"
                  >
                    <div className="flex-shrink-0 w-[150px]">
                      <img
                        src={product.images[0]?.path || '/default-image.png'}
                        alt={product.productName}
                        className="w-full h-[150px] object-cover"
                        onError={(e) => { e.target.src = '/default-image.png'; }}
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="w-9/12 text-ellipsis overflow-hidden line-clamp-2">
                        <h2 className="font-semibold">{product.productName}</h2>
                        <div className="text-red-500 font-semibold mt-2">
                          <span className="font-[2px] mr-[2px]">đ </span>{formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edit/Delete Menu */}
                  <div className="absolute right-0 top-0 mt-10 mr-3">
                    <button
                      className="font-semibold focus:outline-none text-[20px]"
                      onClick={() => toggleMenu(product.productId)}
                    >
                      ⋮
                    </button>
                    {menuOpen === product.productId && (
                      <div className="absolute right-0 bg-white shadow-lg border border-gray-200 rounded-lg mt-1 z-10">
                        <button
                          onClick={() => {}}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {}}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pending Approval Text */}
                  <div className="block w-2/5 px-4 py-2 text-sm text-gray-700 mt-10 border text-center">
                    <span className="text-gray-500">Chờ duyệt</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <span>No products found.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
