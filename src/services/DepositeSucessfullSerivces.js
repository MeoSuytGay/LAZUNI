import axios from 'axios';

export const DepositeSuccessfullServices = async (data) => {
    try {
        console.log(data)
        // Replace '/api/deposit-success' with your actual API endpoint
        const response = await axios.post('http://localhost:8080/payment/call_back', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Return the response data
        return response.data;
    } catch (error) {
        console.error('Error submitting deposit:', error);
        throw error;
    }
};
