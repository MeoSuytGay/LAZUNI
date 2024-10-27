
import axios from "axios";

export const AdminAccountServices= async ()=>{
    try {
        const response = await axios.get("http://localhost:8080/admin/users");
    
        console.log( response.data);
        return response.data; // Return the response data for further handling
      } catch (error) {
        console.error("Error in BuyProductServices:", error);
        return { error: error.message }; // Return the error message for further handling
      }
}

