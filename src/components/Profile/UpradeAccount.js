import React, { useState } from 'react';
import { UpgradeServices } from '../../services/UpgradeServices';

export const UpgradeAccount = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Updated packages to include only two options
  const packages = [
    { id: 1, name: 'Gói Cơ Bản', price: 'Miễn phí', duration: 'Mặc định', details: 'Đây là gói cơ bản được cung cấp mặc định cho tất cả người dùng mới. Nó phù hợp với cá nhân và người dùng không thường xuyên mua bán. Gói này cho phép người dùng đăng một số lượng giới hạn sản phẩm, chủ yếu tập trung vào các nhu cầu trao đổi hoặc bán nhỏ lẻ.', isClickable: false },
    { id: 2, name: 'Gói Bán Chuyên', price: '89.000đ', duration: '1 tháng', details: 'Phù hợp với người dùng có nhu cầu mua bán thường xuyên hoặc các tiểu thương muốn mở rộng hoạt động trên nền tảng. Gói bán chuyên cung cấp thêm các tính năng giúp tăng hiệu quả bán hàng và quản lý sản phẩm.', isClickable: true },
    { id: 3, name: 'Gói Chuyên Nghiệp', price: '219.000đ', duration: '1 tháng', details: 'Gói này dành cho các doanh nghiệp hoặc những người kinh doanh quy mô lớn, cần tận dụng tối đa các tính năng của nền tảng để quản lý kho hàng, quảng bá sản phẩm, và nâng cao trải nghiệm khách hàng.', isClickable: true },
  ];

  const handlePackageClick = (pkg) => {
    if (pkg.isClickable) {
      setSelectedPackage(pkg);
    }
  };

  const handleBuyClick = () => {
    if (selectedPackage) {
      setIsModalOpen(true);
    }
  };

  const confirmPurchase = async () => {
    try {
      const data = await UpgradeServices();
      console.log("Upgrade successful:", data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  const cancelPurchase = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ml-[50px]">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`p-6 border rounded-lg text-center ${
              selectedPackage?.name === pkg.name ? 'bg-primary text-white' : 'bg-white text-gray-900'
            }`}
            onClick={() => handlePackageClick(pkg)}
          >
            <h2 className="text-xl font-bold">{pkg.name}</h2>
            <p className="mt-2 text-lg">{pkg.price}</p>
            <p className="text-sm text-gray-500">{pkg.duration}</p>
            <p className="mt-4">{pkg.details}</p>
            <button
              className={`mt-6 p-2 w-full ${
                selectedPackage?.name === pkg.name ? 'bg-white text-primary' : 'bg-primary text-white'
              } rounded-lg`}
              onClick={handleBuyClick}
            >
              {selectedPackage?.name}
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h2 className="text-lg font-bold mb-2">Confirm Purchase</h2>
            <p className="mb-2">You are about to purchase: <strong>{selectedPackage.name}</strong></p>
            <p className="mb-4">Price: <strong>{selectedPackage.price}</strong></p>
            <div className="flex justify-between">
              <button className="bg-red-500 text-white rounded-lg px-4 py-2" onClick={cancelPurchase}>Cancel</button>
              <button className="bg-green-500 text-white rounded-lg px-4 py-2" onClick={confirmPurchase}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
