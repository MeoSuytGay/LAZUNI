import React from 'react';

const NotificationModal = ({ show, message, success, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-5 text-center">
        <p className={`text-lg font-bold mb-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default NotificationModal;
