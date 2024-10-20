  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Link, useSearchParams } from 'react-router-dom';
  import { Range } from "react-range";
  import ReactPaginate from 'react-paginate';
  import { CiFilter } from "react-icons/ci";
  import { MdOutlineReport } from "react-icons/md";
  import ReportPopup from '../components/Popup/ReportProduct';

  export const Products = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [sortType, setSortType] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minPriceInput, setMinPriceInput] = useState(0);
    const [maxPriceInput, setMaxPriceInput] = useState(1000);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [isReportPopupOpen, setReportPopupOpen] = useState(false);
    const itemsPerPage = 20;
    
    const keyword = searchParams.get("keyword") || '';
    const page = searchParams.get("page") || 1;
    const skip = (page - 1) * itemsPerPage;


  
    useEffect(() => {
      setSearchTerm(keyword);
    }, [keyword]);

    // Fetch products based on searchTerm and pagination
    useEffect(() => {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}&q=${searchTerm}`);
          const productsList = data.products;
          const maxProductPrice = Math.max(...productsList.map(product => product.price));

          setProducts(productsList);
          setDisplayedProducts(productsList);
          setMaxPrice(maxProductPrice);
          setPriceRange([0, maxProductPrice]);
          setMinPriceInput(0);
          setMaxPriceInput(maxProductPrice);
          setPageCount(Math.ceil(data.total / itemsPerPage));
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching products", error);
          setIsLoading(false);
        }
      };
      fetchProducts();
    }, [skip, searchTerm]);

    // Filter products based on price and sort type
    useEffect(() => {
      let filteredProducts = products.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      if (sortType === 'asc') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortType === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }

      setDisplayedProducts(filteredProducts);
    }, [sortType, priceRange, products]);

    const applyPriceFilter = () => {
      setPriceRange([minPriceInput, maxPriceInput]);
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleSearch = (e) => {
      e.preventDefault();
      setSearchParams({ page: 1, q: searchTerm });
    };

    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage;
      setItemOffset(newOffset);
      setSearchParams({ page: event.selected + 1, q: searchTerm });
    };
    const openReportPopup = () => {
      setReportPopupOpen(true);
  };

  const closeReportPopup = () => {
      setReportPopupOpen(false);
  };

    return (
      <>
        <div className=''>
          <div className='container mx-auto mt-[20px]'>
            <div className='mb-4 flex'>
              {/* Filter Section */}
              <div className='w-[400px] flex flex-col p-6 rounded-lg'>
                <div className='border-b text-[26px] mb-4 flex items-center'>
                  <CiFilter className='mr-[10px]' /> Bộ lọc sản phẩm
                </div>

                {/* Filter price Section */}
                <div className='block my-2 border-b pb-4'>
                  <div className='my-2 text-[20px] font-semibold'>Khoảng giá</div>
                  <div className='flex items-center space-x-4'>
                    <input
                      type="number"
                      className='border p-2 rounded-lg w-[100px]'
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(Number(e.target.value))}
                      placeholder="Min price"
                    />
                    <span className="text-lg">-</span>
                    <input
                      type="number"
                      className='border p-2 rounded-lg w-[100px]'
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(Number(e.target.value))}
                      placeholder="Max price"
                    />
                  </div>
                  <button
                    onClick={applyPriceFilter}
                    className='my-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-[100px] '
                  >
                    Áp dụng
                  </button>

                </div>
                <div className="block my-2 border-b pb-4">
                <div className="my-2 text-[20px] font-semibold">Thành phố</div>
                <select
                  className="border p-2 rounded-lg w-full"
                  // value={selectedCity}
                  // onChange={(e) => setSelectedCity(e.target.value)
                    
                  // }
                >
                  <option>Đà Nẵng</option>
                  
                </select>
              </div>

                {/* Price Range Filter */}
                <div>
                  <label className='block my-4 text-lg'>
                    Khoảng giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Range
                    step={10}
                    min={0}
                    max={maxPrice}
                    values={priceRange}
                    onChange={(values) => setPriceRange(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '12px',
                          width: '12px',
                          borderRadius: '12px',
                          backgroundColor: '#999',
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Products Section */}
              <div className="w-full ml-4">
                {/* Sort Dropdown */}
                <div className="flex justify-end items-center mb-3">
                  <div className="mr-[10px] text-gray-700">Sắp xếp theo:</div>
                  <select
                    className="border p-2 rounded-lg"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="asc">Giá: Tăng dần</option>
                    <option value="desc">Giá: Giảm dần</option>
                  </select>
                </div>

                {/* Products List */}
                {isLoading ? (
                  <div className="flex justify-center items-center h-64 ">
                    <span>Loading products...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 my-[20px]">
                    {displayedProducts.length > 0 ? (
                      displayedProducts.map((product) => (
                        <div key={product.id} className="border border-gray-100 p-[10px]">
                          <Link
                            to={`/products/${product.id}`}
                            className="flex flex-col items-center justify-center transition-transform transform  hover:scale-105 relative"
                          >
                            <div className="w-full text-left">
                              <img
                                src={product.images[0] || '/default-image.png'}
                                alt={product.title}
                                className="w-full h-[190px] object-cover"
                                onError={(e) => { e.target.src = '/default-image.png'; }}
                              />
                            </div>
                            <div className="mb-4 mt-2 w-full text-left flex justify-between p-2">
                                              {/* Product title with 2-line clamp */}
                                              <div className="w-9/12 text-ellipsis overflow-hidden line-clamp-2">
                                                  {product.title}
                                              </div>
                                              <div className="w-1/12 mt-[4px]" onClick={(e) => {
                                                  e.preventDefault(); // Prevent default action
                                                  openReportPopup();
                                              }}>
                                                  <MdOutlineReport />
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
                        <span>Không có sản phẩm nào được tìm thấy.</span>
                      </div>
                    )}
                  </div>
                )}
                {/* Pagination */}
                <div className='my-[20px] '>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination flex justify-center mt-4"
                  pageLinkClassName="p-3 border rounded mx-1"
                  previousLinkClassName="p-3 border rounded mx-1"
                  nextLinkClassName="p-3 border rounded mx-1"
                  activeLinkClassName="bg-primary text-white"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReportPopup isOpen={isReportPopupOpen} onClose={closeReportPopup} /> 
      </>
    );
  };
