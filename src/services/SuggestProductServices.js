import axios from 'axios';

// Export the service function to fetch suggested products from the API
export const SuggestProductServices = async () => {
    try {
        // Destructure the data from the response
        const { data } = await axios.get('http://localhost:8080/products');
        
        // Return the list of products from the data
        return data;
    } catch (error) {
        // Provide a detailed error message and throw it
        console.error("Error fetching suggested products from the API: ", error.message);
        throw error;
    }
};
