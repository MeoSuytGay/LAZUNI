import React, { useState } from 'react';
import { depositMoney } from '../../services/DespositeServices'; // Import the service

const DepositMoney = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false); // To handle submission status

    const handleDeposit = async () => {
        setIsSubmitting(true); // Disable the button once deposit starts
        try {
            const response = await depositMoney(amount);
            console.log(response);

            // Redirect to a new page after successful deposit
            window.location.href = response; // Ensure response contains a valid URL

            // Reset the amount and close the modal
            setAmount('');
            onClose();
        } catch (err) {
            setError('Failed to deposit money. Please try again.');
        } finally {
            setIsSubmitting(false); // Re-enable button in case of error
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Deposit Money</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary mb-4"
                    disabled={isSubmitting} // Disable input while submitting
                />
                <div className="flex justify-between">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md" disabled={isSubmitting}>
                        Cancel
                    </button>
                    <button onClick={handleDeposit} className="px-4 py-2 bg-primary text-white rounded-md" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Deposit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositMoney;
