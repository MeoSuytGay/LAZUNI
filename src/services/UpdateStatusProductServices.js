import axios from "axios";

export const UpdateStatusService = async (productId, status) => {
    try {
        const response = await axios.put(`http://localhost:8080/products/update?productId=${productId}&status=${status}`);
        
        // Check if the backend response is "000", which indicates an error
      //   if (response.data.startsWith("000")) {
      //     throw new Error(response.data);  // Custom error message from the backend
      // }
        console.log(response);
        return response.data; // Return the updated product
    } catch (error) {
        console.error(error.message);
        throw new Error("Error updating product status: " + error.message);
    }
};
