import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListProductByUserIdServices } from '../services/ListProductByUserIdServices';

export const ListProductByidUse = ({ userId, status }) => {
  const [products, setProducts] = useState([]); // Store the list of products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Store the displayed products after filtering and sorting
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term
  const [sortType, setSortType] = useState(''); // Store the sort type
  const [isLoading, setIsLoading] = useState(true); // Loading state for the product list

  // Fetch products from API when userId or status changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Set loading true before API call
        const data = await ListProductByUserIdServices(userId, status)
        console.log(data);
        setProducts(data); // Set the fetched products
        setDisplayedProducts(data); // Initially show all products
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setIsLoading(false); // Set loading false after API call completes
      }
    };

    fetchProducts();
  }, [userId, status]); // Only re-fetch when `userId` or `status` changes

  // Sort products based on selected sort type
  useEffect(() => {
    if (!sortType) {
      setDisplayedProducts(products); // If no sort type, show original products
    } else {
      let sortedProducts = [...products];
      if (sortType === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortType === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      setDisplayedProducts(sortedProducts); // Update the displayed products with sorted ones
    }
  }, [sortType, products]); // Depend on `sortType` and `products` only, not `userId` or `status`

  // Format price for VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price); // Format price for VND
  };

  return (
    <div className='mb-4 flex w-full'>
      {/* Products Section */}
      <div className="w-full">
        {/* Search and Sort Header */}
        <div className="flex justify-between items-center mb-4">
          {/* Search Form - on the left */}
          <div className="flex items-center space-x-2 w-1/2">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="border p-2 rounded-lg w-full text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown - on the right */}
          <div className="flex items-center space-x-2 w-1/2 justify-end">
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
        </div>

        {/* Products List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span>Loading products...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 border border-gray-100">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product.productId} className="border border-gray-100 p-[10px]">
                  <Link
                    to={`/products/${product.productId}`}
                    className="flex flex-col items-center justify-center transition-transform transform hover:scale-105 relative"
                  >
                    <div className="w-full text-left">
                      <img
                        src={product.images[0]?.path || '/default-image.png'}
                        alt={product.productName}
                        className="w-full h-[190px] object-cover"
                        onError={(e) => { e.target.src = '/default-image.png'; }}
                      />
                    </div>
                    <div className="mb-4 mt-2 w-full text-left flex justify-between p-2">
                      <div className="w-9/12 text-ellipsis overflow-hidden line-clamp-2">
                        {product.productName}
                      </div>
                    
                    </div>
                    <div className="text-red-500 font-semibold w-full text-left flex ml-[20px]">
                      <span className="font-[2px] mr-[2px]">đ </span>{formatPrice(product.price)}
                    </div>
                  </Link>
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
