import { DeleteProductServices } from "../../services/ManageProductServices";


export const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await DeleteProductServices(productId); // Call delete API service
      console.log(response);
      onDelete(productId); // Notify parent component about the deletion
    } catch (error) {
      console.error('Error deleting product:', error); // Handle any errors
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      Delete
    </button>
  );
};
