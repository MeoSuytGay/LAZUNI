import axios from 'axios';

export const UploadProductServices = async (formData) => {
    try {
        // Retrieve userId from localStorage
        const user = JSON.parse(localStorage.getItem('user')); // Assuming user is an object stored in localStorage
        const userId = user?.userId;

        if (!userId) {
            throw new Error('User not logged in or userId not found');
        }

        // Append userId to the formData
        formData.append("userId", userId);

        // Log the images in formData

        // Send a POST request to your backend API
        const response = await axios.post('http://localhost:8080/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Handle success response
        console.log('Product uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        // Handle error response
        console.error('Error uploading product:', error);
        throw error;
    }
};
