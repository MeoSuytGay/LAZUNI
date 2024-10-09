// DepositService.js
import axios from 'axios';

export const depositMoney = async (amount) => {
    try {
        const Data={
            amount:amount,
            vnp_ReturnUrl:'http://localhost:3000/despositesucess'
        }
        
        const response = await axios.post('http://localhost:8080/payment/pay', Data);
         
        // const responseGet = await axios.get('http://localhost:8080/payment');
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error depositing money:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

