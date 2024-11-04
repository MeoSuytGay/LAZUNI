import React, { useState } from 'react';
import { depositMoney } from '../../services/DespositeServices'; // Import the service

const DepositMoney = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const [error, setError] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false); // To handle submission status

    const amountOptions = [100, 500, 1000, 5000, 50000, 100000, 200000, 300000];

    const handleAmountClick = (value) => {
        setAmount(value);
        setCalculatedAmount(value * 1000); // Assuming unit conversion for display
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setCalculatedAmount(value * 1000); // Update calculated amount based on input
    };

    const handleDeposit = async () => {
        setIsSubmitting(true); // Disable the button once deposit starts
        try {
            const response = await depositMoney(calculatedAmount);
            console.log(response);

            // Redirect to a new page after successful deposit
            window.location.href = response; // Ensure response contains a valid URL

            // Reset the amount and close the modal
            setAmount('');
            setCalculatedAmount(0);
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
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">VÍ LAZUNI</h2>
                <p className="mb-2 text-gray-600">Hạn mức nạp 10 - 300000 VND(k)</p>
                
                {error && <p className="text-red-500 mb-2">{error}</p>}
                
                <input
                    type="number"
                    value={amount}
                    onChange={handleCustomAmountChange}
                    placeholder="Nhập số tiền"
                    className="w-full text-xl font-semibold mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                    disabled={isSubmitting} // Disable input while submitting
                />

                <div className="grid grid-cols-4 gap-2 mb-4">
                    {amountOptions.map((value) => (
                        <button 
                            key={value}
                            onClick={() => handleAmountClick(value)}
                            className={`px-4 py-2 border rounded ${amount === value.toString() ? 'bg-primary text-white' : 'bg-gray-100'}`}
                            disabled={isSubmitting}
                        >
                            {value}
                        </button>
                    ))}
                </div>

                <p className="mb-4 text-gray-600">Số tiền bạn nhận được: {calculatedAmount.toLocaleString()} VND</p>

                <label className="block mb-4">
                    Ngân Hàng Nhận Tiền
                    <select className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md">
                        <option value="bank">Bank</option>
                        {/* Add other bank options if necessary */}
                    </select>
                </label>

                <p className="text-red-500 text-sm mb-4">
                    Lời nhắc nhở: Mỗi lần giao dịch không nên vượt quá 350 triệu để bảo đảm ngân hàng của bạn không bị ngân hàng nhà nước kiểm soát, giao dịch dưới 350 triệu bảo đảm mức an toàn.
                </p>

                <div className="flex justify-between">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md" disabled={isSubmitting}>
                        Cancel
                    </button>
                    <button onClick={handleDeposit} className="px-4 py-2 bg-primary text-white rounded-md" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Tiến hành'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositMoney;
