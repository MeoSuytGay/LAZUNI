
import axios from "axios";


export const UpdateStatusService= async (productId,status)=>{
    try {

        const response = await axios.get(`http://localhost:8080/products/shop?productId=${productId}&status=${status}`);
  
  
        console.log(response.data)
        return response.data; // Return the list of products
      } catch (error) {
        throw new Error("Error fetching products: " + error.message);
      }
}