import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineReport } from 'react-icons/md';
import ReportPopup from '../components/Popup/ReportProduct';

export const ListProductListing = ({ displayedProducts }) => { // Destructure props correctly
  const [isReportPopupOpen, setReportPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
 console.log(displayedProducts)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const openReportPopup = (product) => {
    setSelectedProductId(product);
    setReportPopupOpen(true);
  };

  const closeReportPopup = () => {
    setReportPopupOpen(false);
    setSelectedProductId(null);
  };

  return (
    <>
      {!displayedProducts || displayedProducts.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span>Loading products...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 my-[20px]">
          {displayedProducts.map((product) => (
            <div key={product.productId} className="border border-gray-100 p-[10px]">
               <Link
                                        to={`/products/${product.productId}`}  // Use dynamic route here
                                        className="flex flex-col items-center justify-center transition-transform transform hover:scale-105 relative"
                                    >
                                        <div className="w-full text-left">
                                            {/* Display the first image from the images array or fallback */}
                                            <img
                                                src={product.images[0].path || '/default-image.png'}
                                                alt={product.productName}
                                                className="w-full h-[190px] object-cover"
                                                onError={(e) => { e.target.src = '/default-image.png'; }}
                                            />
                                        </div>
                                        <div className="mb-4 mt-2 w-full text-left flex justify-between p-2">
                                            {/* Product title with 2-line clamp */}
                                            <div className="w-9/12 h-[50px] text-ellipsis overflow-hidden line-clamp-2">
                                                {product.productName}
                                            </div>
                                            <div className="w-1/12 mt-[4px]" onClick={(e) => {
                                                e.preventDefault(); // Prevent default action
                                                openReportPopup(product.productId); // Pass product ID to open the report popup
                                            }}>
                                                <MdOutlineReport />
                                            </div>
                                        </div>
                                        <div className="text-red-500 font-semibold w-full text-left flex ml-[20px]">
                                            <span className="font-[2px] mr-[2px]">đ </span>{formatPrice(product.price)}
                                        </div>
                                    </Link>
            </div>
          ))}
        </div>
      )}

      {isReportPopupOpen && selectedProductId && (
      
      <ReportPopup 
      isOpen={isReportPopupOpen} 
      onClose={closeReportPopup} 
      productId={selectedProductId} 
    />
      )}
    </>
  );
};
