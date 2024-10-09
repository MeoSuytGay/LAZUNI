import axios from 'axios';

export const VerifyEmailServices = async (otpUser) => {
    // Retrieve stored OTP, stored data, and email from sessionStorage and localStorage
    const storedOtp = sessionStorage.getItem('otp');
    const storedData = JSON.parse(sessionStorage.getItem('Data'));
    let email = localStorage.getItem('email');

    // Clean up the email if it has extra quotes
    if (email) {
        email = email.replace(/^"|"$/g, ''); // Remove extra quotes
    }

    // Log for debugging
    console.log('OTP entered by user:', otpUser);
    console.log('Stored OTP:', storedOtp);
    console.log('Stored email:', email);
    console.log('Stored Data:', storedData);

    // Check if the email exists in localStorage and if OTP matches
    if (email && storedOtp === otpUser) {
        // If both conditions are met, return success and remove the OTP
       
        sessionStorage.removeItem('otp');
      if (storedData) {
        // If OTP doesn't match but we have storedData, make the POST request
        try {
            const response = await axios.post('http://localhost:8080/client/verify', storedData);
            sessionStorage.removeItem('Data'); // Remove OTP after posting
            return response.data;  // Return the response from the POST request
        } catch (error) {
            console.error('Error verifying email:', error);
            throw new Error('Verification failed. Please try again.');
        }   

       
    } 

    
}else {
        throw new Error('Invalid OTP or missing data. Please try again.');
    }
};
