import React, { useState } from 'react';
import { UpgradeServices } from '../../services/UpgradeServices';
import { createNotification } from '../../services/NoficationServices';
import NotificationModal from '../Popup/Notice';


export const UpgradeAccount = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', success: false });
  
  const user = JSON.parse(localStorage.getItem("user"));
  const packages = [
    {
      id: 3,
      name: 'Gói Cơ Bản',
      price: 'Miễn phí',
      duration: 'Mặc định',
      details: 'Đây là gói cơ bản được cung cấp mặc định cho tất cả người dùng mới. Nó phù hợp với cá nhân và người dùng không thường xuyên mua bán.',
      isClickable: false
    },
    {
      id: 1,
      name: 'Gói Bán Chuyên',
      price: '89.000đ',
      duration: '1 tháng',
      details: 'Phù hợp với người dùng có nhu cầu mua bán thường xuyên hoặc các tiểu thương muốn mở rộng hoạt động trên nền tảng.',
      isClickable: true
    },
    {
      id: 2,
      name: 'Gói Chuyên nghiệp',
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
      const data = await UpgradeServices(selectedPackage.id);
      console.log(data)
      if (data === "upgrade account fail") {
        setNotification({ show: true, message: "Nâng cấp tài khoản thất bại", success: false });
      } else if (data === "upgrade account succesfull") {
        setNotification({ show: true, message: "Bạn đã nâng cấp tài khoản thành công", success: true });
        await createNotification(
          user.userId, // senderId
          user.userId, // receivedId
          user.userName, // senderName
          "Bạn đã nâng cấp tài khoản thành công", 
          "Nâng cấp tài khoản", // title
          false // isRead
        );
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Purchase failed:", error);
      setNotification({ show: true, message: "Lỗi khi thực hiện giao dịch", success: false });
    }
  };

  const cancelPurchase = () => {
    setIsModalOpen(false);
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', success: false });
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ml-[50px]">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`p-6 border rounded-lg text-center ${pkg.isClickable ? 'cursor-pointer' : ''}`}
            onClick={() => handlePackageClick(pkg)}
          >
            <h2 className="text-xl font-bold">{pkg.name}</h2>
            <p className="mt-2 text-lg">{pkg.price}</p>
            <p className="text-sm text-gray-500">{pkg.duration}</p>
            <p className="mt-4">{pkg.details}</p>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <button
          className="mt-8 bg-primary w-1/4 text-white ml-[338px] rounded-lg px-4 py-2 justify-center"
          onClick={handleBuyClick}
        >
          Mua
        </button>
      )}

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

      {/* Notification Modal */}
      <NotificationModal
        show={notification.show}
        message={notification.message}
        success={notification.success}
        onClose={closeNotification}
      />
    </div>
  );
};
