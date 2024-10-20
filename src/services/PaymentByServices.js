import axios from 'axios';

export const BuyProductServices = async (orders) => {
    console.log(orders)
  try {
    const response = await axios.post("http://localhost:8080/orders", orders, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Order placed successfully:", response.data);
    return response.data; // Return the response data for further handling
  } catch (error) {
    console.error("Error in BuyProductServices:", error);
    return { error: error.message }; // Return the error message for further handling
  }
};
