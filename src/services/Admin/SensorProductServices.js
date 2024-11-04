import axios from 'axios';

// Fetch pending sensor products
export const fetchPendingProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/admin/pending');
    console.log(response.data)
    return response.data;  // Return the list of pending products
  } catch (error) {
    console.error('Error fetching pending products:', error);
    throw error;
  }
};
export const updateProductStatus = async (productId, status) => {
    try {
      const requestData = {
        productId: productId,  // ID of the product to update
        status: status         // New status (e.g., "ACCEPTED", "REJECTED")
      };
      console.log(requestData)
  
      const response = await axios.put('http://localhost:8080/admin/product', requestData);
      return response.data;  // Return the updated product data or success message
    } catch (error) {
      console.error('Error updating product status:', error);
      throw error;
    }
  };