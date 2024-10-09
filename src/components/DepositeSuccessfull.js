import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DepositeSuccessfullServices } from '../services/DepositeSucessfullSerivces';

export const DepositSuccessful = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const hasSentData = useRef(false);  // Use useRef to track if the API call has already been made

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        // Check if user and necessary query params are available
        if (user && searchParams.get('vnp_Amount') && searchParams.get('vnp_PayDate') && searchParams.get('vnp_ResponseCode')) {
            const data = {
                userId: user.userId,
                vnp_Amount: parseFloat(searchParams.get('vnp_Amount')),
                vnp_PayDate: searchParams.get('vnp_PayDate'),
                vnp_ResponseCode: searchParams.get('vnp_ResponseCode'),
                vnp_OrderInfo: searchParams.get('vnp_OrderInfo'),
            };

            // Only call the API if hasSentData is false (first run)
            if (!hasSentData.current) {
                const sendDepositData = async () => {
                    try {
                        const response = await DepositeSuccessfullServices(data);
                        localStorage.setItem('user', JSON.stringify(response));
                    } catch (error) {
                        console.error("Error sending deposit data:", error);
                    }
                };

                sendDepositData();
                hasSentData.current = true; // Set to true after the first API call
            }
        }
    }, [searchParams]);

    const handleNavigate = () => {
        navigate('/'); // Update this path to your desired route
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Deposit Successful!</h1>
            <p className="text-lg text-gray-700 mb-8">Your deposit has been successfully processed.</p>
            <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                onClick={handleNavigate}
            >
                Go to Homepage
            </button>
        </div>
    );
};
