import React, { useState } from 'react';
import { UpgradeServices } from '../../services/UpgradeServices';

export const UpgradeAccount = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only two packages: Gói Cơ Bản (default) and Gói Bán Chuyên (selectable)
  const packages = [
    {
      id: 1,
      name: 'Gói Cơ Bản',
      price: 'Miễn phí',
      duration: 'Mặc định',
      details: 'Đây là gói cơ bản được cung cấp mặc định cho tất cả người dùng mới. Nó phù hợp với cá nhân và người dùng không thường xuyên mua bán.',
      isClickable: false
    },
    {
      id: 2,
      name: 'Gói Bán Chuyên',
      price: '89.000đ',
      duration: '1 tháng',
      details: 'Phù hợp với người dùng có nhu cầu mua bán thường xuyên hoặc các tiểu thương muốn mở rộng hoạt động trên nền tảng.',
      isClickable: true
    },
    {
      id: 3,
      name: 'Gói  Chuyên nghiệp ',
      price: '219.000đ',
      duration: '1 tháng',
      details: 'Gói này dành cho các doanh nghiệp hoặc những người kinh doanh quy mô lớn, cần tận dụng tối đa các tính năng của nền tảng để quản lý kho hàng, quảng bá sản phẩm, và nâng cao trải nghiệm khách hàng.',
      isClickable: true
    }
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
      const data = await UpgradeServices(selectedPackage.id); // Sending selected package ID
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
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ml-[50px]">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg text-center"
            onClick={() => handlePackageClick(pkg)}
          >
            <h2 className="text-xl font-bold">{pkg.name}</h2>
            <p className="mt-2 text-lg">{pkg.price}</p>
            <p className="text-sm text-gray-500">{pkg.duration}</p>
            <p className="mt-4">{pkg.details}</p>
            {pkg.isClickable && (
              <button
                className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2"
                onClick={handleBuyClick}
              >
                Mua
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h2 className="text-lg font-bold mb-2">Xác nhận mua</h2>
            <p className="mb-2">Bạn đang mua: <strong>{selectedPackage.name}</strong></p>
            <p className="mb-4">Giá: <strong>{selectedPackage.price}</strong></p>
            <div className="flex justify-between">
              <button className="bg-red-500 text-white rounded-lg px-4 py-2" onClick={cancelPurchase}>Hủy</button>
              <button className="bg-green-500 text-white rounded-lg px-4 py-2" onClick={confirmPurchase}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
