import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Range } from "react-range";
import ReactPaginate from 'react-paginate';
import { CiFilter } from "react-icons/ci";
import { ListProductListing } from '../components/ListProductListing';
import { ProductListingServices } from '../services/ProductListingServices';
import { AddressServices } from '../services/AddressServices';
import { CategoriesServices } from '../services/CategoriesServices';

export const Products = () => {

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minPriceInput, setMinPriceInput] = useState(0);
  const [maxPriceInput, setMaxPriceInput] = useState(1000);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageCount, setPageCount] = useState(0);

  const productName = searchParams.get("q") || 'null';
  const page = searchParams.get("page") || 1;
  const category = searchParams.get("category") || 'null';
  const address = searchParams.get("address") || 'null';
  const sortType = searchParams.get("sortType") || 'null'; // Default to 'asc'
  const minPriceQuery = searchParams.get("minPrice") || 0;
  const maxPriceQuery = searchParams.get("maxPrice") || 20000000000;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const fetchCities = async () => {
    try {
      const cityData = await AddressServices();
      setCities(cityData);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryData = await CategoriesServices();
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await ProductListingServices(page, sortType, category, minPriceQuery, maxPriceQuery, address, productName);
      setSearchTerm(productName);
      setDisplayedProducts(data.content || []);
      setPageCount(data.totalPages || 0);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchCategories();
    fetchProducts();
  }, [page, sortType, productName, category, address, minPriceQuery, maxPriceQuery]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), address: selectedCity });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), category: selectedCategory });
  };

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;
    const sortType = selectedSortType === 'desc' ? 'desc' : 'asc';
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), sortType: sortType });
  };

  const applyPriceFilter = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      minPrice: minPriceInput,
      maxPrice: maxPriceInput
    });
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // ReactPaginate uses 0-indexed pages, so add 1
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: newPage });
  };


  return (
    <div className=''>
      <div className='container mx-auto mt-[20px]'>
        <div className='mb-4 flex'>
          {/* Filter Section */}
          <div className='w-[400px] flex flex-col p-6 rounded-lg'>
            <div className='border-b text-[26px] mb-4 flex items-center'>
              <CiFilter className='mr-[10px]' /> Bộ lọc sản phẩm
            </div>

            {/* Category Dropdown */}
            <div className="block my-2 border-b pb-4">
              <div className="my-2 text-[20px] font-semibold">Danh mục</div>
              <select className="border p-2 rounded-lg w-full" onChange={handleCategoryChange}>
                <option value="">Chọn Danh mục</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.categoryId}>{cat.title}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="block my-2 border-b pb-4">
              <div className="my-2 text-[20px] font-semibold">Thành phố</div>
              <select className="border p-2 rounded-lg w-full" onChange={handleCityChange}>
                <option value="">Chọn thành phố</option>
                {cities.map((city, index) => (
                  <option key={index} value={city.Name}>{city.Name}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
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
          </div>

          {/* Products Section */}
          <div className="w-full ml-4">
            {/* Sort Dropdown */}
            <div className="flex justify-end items-center mb-3">
              <div className="mr-[10px] text-gray-700">Sắp xếp theo:</div>
              <select
                className="border p-2 rounded-lg"
                value={sortType}
                onChange={handleSortChange}
              >
                <option value="asc">Giá: Tăng dần</option>
                <option value="desc">Giá: Giảm dần</option>
              </select>
            </div>

            {/* Products List */}
            {isLoading ? (
              <div className="loading-spinner">Loading...</div> // Customize this based on your style
            ) : displayedProducts.length === 0 ? (
              <div className="text-center">No products found.</div>
            ) : (
              <ListProductListing displayedProducts={displayedProducts} />
            )}

            {/* Pagination */}
            {pageCount > 0 && (
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
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
