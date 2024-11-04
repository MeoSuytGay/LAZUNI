import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa'; // Import the close and check icons
import { fetchPendingProducts, updateProductStatus } from '../../services/Admin/SensorProductServices'; // Import services
import ConfirmationModal from '../../components/Popup/ConfirmationModal'; // Import ConfirmationModal component

export const SensorProduct = () => {
    const [products, setProducts] = useState([]); // Store the fetched products
    const [selectedImage, setSelectedImage] = useState(null); // Store the selected image for modal
    const [isModalVisible, setIsModalVisible] = useState(false); // State to show/hide the modal
    const [selectedProductId, setSelectedProductId] = useState(null); // To store the product ID for confirmation
    const [action, setAction] = useState(""); // Store the action (accept/reject)

    // Fetch products from the backend using the service function
    const getPendingProducts = async () => {
        try {
            const response = await fetchPendingProducts(); // Call service method
            setProducts(Array.isArray(response) ? response : []); // Ensure products is always an array
        } catch (error) {
            console.error('Error fetching pending products:', error);
            setProducts([]); // Set an empty array in case of an error
        }
    };

    useEffect(() => {
        getPendingProducts(); // Fetch products on component mount
    }, []);

    const handleAccept = (id) => {
        setSelectedProductId(id);
        setAction('accept');
        setIsModalVisible(true);
    };

    const handleReject = (id) => {
        setSelectedProductId(id);
        setAction('reject');
        setIsModalVisible(true);
    };

    const confirmAction = async () => {
        if (action === 'accept') {
            await updateProductStatus(selectedProductId, 'public');
        } else if (action === 'reject') {
            await updateProductStatus(selectedProductId, 'rejected');
        }
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.productId === selectedProductId ? { ...product, status: action === 'accept' ? 'public' : 'Rejected' } : product
            )
        );
        setIsModalVisible(false);
    };

    const cancelAction = () => {
        setIsModalVisible(false);
    };

    // Open modal to view the image
    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    // Close image modal
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="mx-auto ml-[20px] mt-[50px]">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[13px] uppercase text-primary">
                        <tr>
                            <th className="px-6 py-3">Tên sản phẩm</th>
                            <th className="px-6 py-3">Danh mục</th>
                            <th className="px-6 py-3">Giá</th>
                            <th className="px-6 py-3">Mô tả</th>
                            <th className="px-6 py-3">Trạng thái</th>
                            <th className="px-6 py-3">Hình ảnh</th>
                            <th className="px-6 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.productId} className="border-b border-gray-200">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {product.productName}
                                    </td>
                                    <td className="px-6 py-4">{product.productName}</td>
                                    <td className="px-6 py-4">{product.price} VNĐ</td>
                                    <td className="px-6 py-4">{product.description}</td>
                                    <td className="px-6 py-4">{product.status}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            {product.images.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img.path}
                                                    alt={`Product ${product.productName}`}
                                                    className="w-14 h-14 object-cover cursor-pointer"
                                                    onClick={() => openImageModal(img)}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleAccept(product.productId)} // Update to use productId
                                                className="bg-green-500 text-white p-2 rounded flex items-center justify-center"
                                            >
                                                <FaCheck size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleReject(product.productId)} // Update to use productId
                                                className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                                            >
                                                <FaTimes size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-6 py-4">Không có sản phẩm</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for displaying the selected image */}
            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white rounded-lg p-5 shadow-md">
                        <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={24} />
                        </button>
                        <h2 className="text-lg font-bold text-center mb-2">Hình ảnh sản phẩm</h2>
                        <img src={selectedImage.path} alt="Selected Product" className="w-80 h-auto mt-2 mx-auto" />
                        <div className="mt-4 flex justify-end">
                            <button onClick={closeImageModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isVisible={isModalVisible}
                onConfirm={confirmAction}
                onCancel={cancelAction}
                message="Bạn có chắc chắn muốn thực hiện hành động này?"
            />
        </div>
    );
};
