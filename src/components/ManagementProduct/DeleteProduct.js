import { useState } from "react";
import { DeleteProductServices } from "../../services/ManageProductServices";

export const DeleteProduct = ({ productId, onDelete }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Popup visibility state

  const handleDelete = async () => {
    try {
      const response = await DeleteProductServices(productId); // Call delete API service
      console.log(response);
      onDelete(productId); // Notify parent component about the deletion
      setShowConfirmPopup(false); // Close popup after deletion
    } catch (error) {
      console.error("Error deleting product:", error); // Handle any errors
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowConfirmPopup(true)}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Delete
      </button>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
