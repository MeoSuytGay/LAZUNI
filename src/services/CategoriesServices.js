import axios from 'axios';

export const CategoriesServices = async () => {
    try {
        const response = await axios.get('http://localhost:8080/categories'); // Replace with your actual endpoint
  
        return response.data; // Return the data you receive
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Return an empty array in case of an error
    }
};
