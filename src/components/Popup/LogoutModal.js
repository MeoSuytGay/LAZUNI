import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Nếu modal không mở, không hiển thị gì
//  sessionStorage.removeItem(`cart_${currentUserId}`);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[300px]">
                <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
