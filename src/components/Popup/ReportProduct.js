import React, { useState } from 'react';
import { ReportProductServices } from '../../services/ReportProductServices';

const ReportPopup = ({ isOpen, onClose, productId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get user from local storage and parse it
        const user = JSON.parse(localStorage.getItem('user')); // Adjust key as needed

        // Check if user exists and has userId
        if (!user || !user.userId) {
            console.error('User not found or userId is missing');
            return; // Optionally handle the error (e.g., notify the user)
        }

        // Prepare report data
        const reportData = {
            userId: user.userId, // Corrected to userId
            productId,
            title,
            state:"pending",
            description,
        
        };

        // Call the service to send the report
        await ReportProductServices(reportData);

        // Close the popup after submission
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 rounded shadow-lg">
                    <h2 className="text-lg font-semibold">Report Product</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div>
                            <label className="block mb-2">Title:</label>
                            <input 
                                type="text" 
                                className="border w-full p-2" 
                                required 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block mb-2">Description:</label>
                            <textarea 
                                className="border w-full p-2" 
                                rows="4" 
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button type="button" className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ReportPopup;
