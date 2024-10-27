import axios from "axios"
export const OfferPendingRecievedServices= async (state)=>{
    const user = JSON.parse(localStorage.getItem('user'));
  
    try {
      const response = await axios.get(`http://localhost:8080/orders/receive`, {
        params: {
            sell_id:user.userId,
          state: state
        }
      });
      console.log(response.data)
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error; // Throw error so it can be handled by the calling component
    }


}