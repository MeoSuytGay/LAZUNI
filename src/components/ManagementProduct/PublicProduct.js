import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListProductByUserIdServices } from '../../services/ListProductByUserIdServices';
import { UpdateStatusService } from '../../services/UpdateStatusProductServices';
import { DeleteProduct } from './DeleteProduct';
import { EditProduct } from './EditProduct';

export const PublicProduct = ({ userId, status }) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [hiddenProducts, setHiddenProducts] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null); // Track open menu

  const navigate = useNavigate();

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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
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

  const handleHideClick = async (productId) => {
    try {
      await UpdateStatusService(productId, 'hide');
      setHiddenProducts((prev) => new Set(prev).add(productId));
    } catch (error) {
      console.error('Error hiding product:', error);
    }
  };

  const handleProductDelete = (productId) => {
    setDisplayedProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
    setProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
  };

  const toggleMenu = (productId) => {
    setMenuOpen((prev) => (prev === productId ? null : productId)); // Toggle the specific menu
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
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
                  <Link
                    to={`/products/${product.productId}`}
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
                    <div className="ml-4 flex-grow w-1/3">
                      <div className="text-ellipsis overflow-hidden line-clamp-2 w-[300px]">
                        <h2 className="font-semibold text-[18px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {product.productName}
                        </h2>
                      </div>
                      <div className="flex flex-col items-center mt-4">
                        <span className="text-gray-500 font-semibold text-left">
                          Số lượng: {product.quantity}
                        </span>
                        <span className="text-red-500 font-semibold">
                          <span className="mr-1">đ</span>{formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
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
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => openModal(product.productId)}
                        >
                          Edit
                        </button>
                        <DeleteProduct productId={product.productId} onDelete={handleProductDelete} />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleHideClick(product.productId)}
                    className="block w-full px-4 border py-2 text-sm text-gray-700 hover:bg-gray-100 mt-10"
                  >
                    Ẩn sản phẩm
                  </button>
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-3/5 max-h-[95vh] mt-[42px] mb-4 overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-red-500">✕</button>
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa sản phẩm</h2>
            <EditProduct productId={selectedProductId} />
          </div>
        </div>
      )}
    </div>
  );
};
