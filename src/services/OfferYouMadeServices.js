import axios from "axios";

export const OfferPendingMadeServices = async (state) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  try {
    const response = await axios.get(`http://localhost:8080/orders/make`, {
      params: {
        buy_id: user.userId,
        state: state
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; // Throw error so it can be handled by the calling component
  }
};
