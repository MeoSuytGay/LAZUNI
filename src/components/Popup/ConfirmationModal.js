import React from 'react';

const ConfirmationModal = ({ isVisible, onConfirm, onCancel, message }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-5 shadow-md">
                <h2 className="text-lg font-bold text-center mb-2">{message}</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => {
                            onConfirm();
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Xác nhận
                    </button>
                    <button
                        onClick={() => {
                            onCancel();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
