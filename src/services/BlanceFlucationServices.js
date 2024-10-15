import axios from 'axios';

export const BlanceFlucationServices = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user')); // Parse the user data from localStorage
      const response = await axios.get(`http://localhost:8080/payment/${user.userId}`); // Use backticks for string interpolation
      console.log(response.data);
    return response.data; // Assuming the API returns the balance fluctuation data
  } catch (error) {
    console.error('Error fetching balance fluctuations:', error);
    throw error;
  }
};
