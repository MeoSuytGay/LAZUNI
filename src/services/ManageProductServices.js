import axios from 'axios';

export const DeleteProductServices = async (productId) => {
  try {
    console.log(productId)
    const response = await axios.delete(`http://localhost:8080/products/${productId}`); // Assuming the delete endpoint is like this
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; // Throw error so it can be handled by the calling component
  }
};
