import React, { useState } from 'react';
import AvatarImage from '../assets/images/avatar-default.jpg';
import { PublicProduct } from '../components/ManagementProduct/PublicProduct';
import { InventoryProduct } from '../components/ManagementProduct/InventoryProduct';
import { PendingProduct } from '../components/ManagementProduct/PendingProduct';
import { UploadProduct } from '../components/ManagementProduct/UploadProduct'; // Assuming this is your product upload component

export const ManageProducts = () => {
  const [selectedArea, setSelectedArea] = useState('published'); // Default to 'published'
  const [showModal, setShowModal] = useState(false); // State for controlling the modal
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  const handleCreateProduct = () => {
    setShowModal(true); // Open the modal when button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal when called
  };

  return (
    <>
      <div className="container mx-auto mt-[50px]">
        <div className="flex">
          <div className="w-full bg-[#FAFAFA]">
            <div className="flex justify-between items-center mx-[30px] my-[20px]">
              <a href="#" title="User Profile" className="flex space-x-2 items-center">
                <img className="w-[100px] h-[100px] rounded-full object-cover w-2/5" src={AvatarImage} alt="Profile" />
                <div>
                  <strong className="text-base font-[700px] text-primary">Cửa hàng của bạn</strong>
                  <div className="flex mt-2"></div>
                </div>
              </a>
              {/* Create Product Button */}
              <button 
                onClick={handleCreateProduct} 
                className="bg-primary text-white px-6 py-2 rounded"
              >
                Tạo sản phẩm
              </button>
            </div>
          </div>
        </div>
        

        <div className='my-[50px] p-4 bg-[#FAFAFA]'>
         <div className='font-[1000px] text-red-500'> Lưu Ý: Chỉ xóa những sản phẩm chưa tiến hành giao dịch, không thể xóa các sản phẩm đã giao dịch!</div>
        </div>


        <div className='my-[50px] p-4 bg-[#FAFAFA]'>
          <input
            type="button"
            value="Public"
            className={`p-3 w-1/6 border-primary border ${selectedArea === 'published' ? 'bg-primary text-white' : 'bg-white text-primary'} rounded`}
            onClick={() => handleAreaClick('published')}
          />
          <input
            type="button"
            value="Inventory"
            className={`mx-4 p-3 border-primary border w-1/6 ${selectedArea === 'stock' ? 'bg-primary text-white' : 'bg-white text-primary'} rounded`}
            onClick={() => handleAreaClick('stock')}
          />
          <input
            type="button"
            value="Waiting for sensor "
            className={`p-3 w-1/6 border-primary border ${selectedArea === 'underReview' ? 'bg-primary text-white' : 'bg-white text-primary'} rounded`}
            onClick={() => handleAreaClick('underReview')}
          />
        </div>

        <div>
          {selectedArea === 'published' && user?.userId && <PublicProduct userId={user.userId} status="public" />}
          {selectedArea === 'stock' && user?.userId && <InventoryProduct userId={user.userId} status="hide" />}
          {selectedArea === 'underReview' && user?.userId && <PendingProduct userId={user.userId} status="pending" />}
        </div>
      </div>

      {/* Modal for Creating Product */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-3/5 max-h-[95vh] mt-[42px] mb-4 overflow-y-auto"> {/* Thêm max-h và overflow */}
            <button onClick={closeModal} className="absolute top-4 right-4 text-red-500">✕</button>
            <h2 className="text-lg font-bold mb-4">Tạo sản phẩm mới</h2>
            <UploadProduct />
          </div>
        </div>
      )}
    </>
  );
};
