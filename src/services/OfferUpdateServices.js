import axios from 'axios';

export const OfferUpdateServices = async (orderId, state) => {
  console.log(orderId + state);
  
  try {
    const response = await axios.put(`http://localhost:8080/orders?orderId=${orderId}&state=${state}`);
    return response.data; // This will return the response from the backend
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
