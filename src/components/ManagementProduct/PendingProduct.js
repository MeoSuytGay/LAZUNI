import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListProductByUserIdServices } from '../../services/ListProductByUserIdServices';
import { DeleteProduct } from './DeleteProduct';

export const PendingProduct = ({ userId, status }) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [hiddenProducts, setHiddenProducts] = useState(new Set());
  const [menuOpen, setMenuOpen] = useState(null); // Track opened menu

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await ListProductByUserIdServices(userId, status);
        const maxProductPrice = Math.max(...data.map(product => product.price));
        setProducts(data);
        setDisplayedProducts(data);
        setMaxPrice(maxProductPrice);
        setPriceRange([0, maxProductPrice]);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [userId, status]);

  useEffect(() => {
    let filteredProducts = products.filter(product =>
      !hiddenProducts.has(product.productId) &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortType === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filteredProducts);
  }, [searchTerm, sortType, priceRange, products, hiddenProducts]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleHideClick = (productId) => {
    setHiddenProducts((prev) => new Set(prev).add(productId));
  };

  const handleDeleteClick = async (productId) => {
    // Here, you would call your delete service and then update state
    try {
      await axios.delete(`/api/products/${productId}`); // Assuming a DELETE API
      setProducts((prev) => prev.filter(product => product.productId !== productId));
      setDisplayedProducts((prev) => prev.filter(product => product.productId !== productId));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const toggleMenu = (productId) => {
    setMenuOpen(menuOpen === productId ? null : productId);
  };

  return (
    <div className="mb-4 flex mx-auto w-full">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="border p-2 rounded-lg w-[400px] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span>Loading products...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 border border-gray-100">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product.productId} className="border border-gray-100 p-[10px] flex items-center relative">
                  <div className="flex items-center justify-start w-full transition-transform transform hover:scale-105">
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
                        <DeleteProduct productId={product.productId} onDelete={handleDeleteClick} />
                      </div>
                    )}
                  </div>

                  <div className="block w-2/5 px-4 py-2 text-sm text-gray-700 mt-10 border text-center">
                    <span className="text-gray-500">{product.status}</span>
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
