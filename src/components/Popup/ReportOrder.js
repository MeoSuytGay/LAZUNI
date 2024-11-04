import React, { useState } from 'react';
import { ReportProductServices } from '../../services/ReportProductServices';

export const ReportOrder = ({ isOpen, onClose, productId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.userId) {
            console.error('User not found or userId is missing');
            return;
        }

        const formData = new FormData();
        formData.append('userId', user.userId);
        formData.append('productId', productId);
        formData.append('title', title);
        formData.append('state', 'pending');
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        }

        await ReportProductServices(formData);

        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 rounded shadow-lg w-2/5">
                    <h2 className="text-lg font-semibold">Báo cáo tình trạng đơn hàng</h2>
                    <form onSubmit={handleSubmit} className="mt-4" encType="multipart/form-data">
                        <div>
                            <label className="block mb-2">Title:</label>
                            <select
                                className="border w-full p-2"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                                <option value="" disabled>Select a title</option>
                                <option value="Spam or misleading">Spam or misleading</option>
                                <option value="Inappropriate content">Inappropriate content</option>
                                <option value="Counterfeit product">Counterfeit product</option>
                                <option value="Wrong information">Wrong information</option>
                                <option value="Other">Other</option>
                            </select>
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
                        <div className="mt-2">
                            <label className="block mb-2">Attach Image (optional):</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="border w-full p-2"
                            />
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


