import axios from "axios";  // Correct the import to use axios

export const UserServices = async (userId) => {  // Remove `await` from the function declaration
  
    try {
        // Use userId directly in the request URL, and ensure the endpoint is correct
        const response = await axios.get(`http://localhost:8080/byid/${userId}`); 
        console.log(response.data);  // Log the response data for debugging
        return response.data;  // Return the response data to be used in the calling component
    } catch (error) {
        console.error('Error fetching user data:', error);  // More descriptive error message
        throw error;  // Throw the error for handling in the calling component
    }
};
