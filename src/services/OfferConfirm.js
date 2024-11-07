import axios from 'axios';

export const Offerconfirm = async (orderId, userId) => {

  
  try {
    const response = await axios.put(`http://localhost:8080/orders/confirm?orderId=${orderId}&userId=${userId}`);
    return response.data; // This will return the response from the backend
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
