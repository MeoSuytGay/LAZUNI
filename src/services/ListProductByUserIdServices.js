import axios from "axios"


export const ListProductByUserIdServices = async (userId, status) => {
    try {

      const response = await axios.get(`http://localhost:8080/products/shop?userId=${userId}&status=${status}`);


      console.log(response.data)
      return response.data; // Return the list of products
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  };
  