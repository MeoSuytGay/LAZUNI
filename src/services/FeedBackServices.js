
import axios from "axios"



export const DeleteFeedbackServices= async(feedbackId)=>{
    try {
        // Corrected the URL format to use query string syntax
        const response = await axios.delete(`http://localhost:8080/feedbacks/${feedbackId}`);
        console.log(response.data);
        return response.data; // Assuming the API returns the response data after deletion
      } catch (error) {
        console.error('Error deleting offer:', error);
        throw error; // Rethrow the error for handling in the calling component
      }
}

export const CreateFeedbackServices= async(data)=>{
    try {
        console.log(data)
        // Corrected the URL format to use query string syntax
        const response = await axios.post(`http://localhost:8080/feedbacks`,data);
        console.log(response.data);
        return response.data; // Assuming the API returns the response data after deletion
      } catch (error) {
        console.error('Error deleting offer:', error);
        throw error; // Rethrow the error for handling in the calling component
      }
}