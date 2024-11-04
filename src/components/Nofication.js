import React, { useState, useEffect } from 'react';
import { getNotification, updateNotificationsAsRead } from '../services/NoficationServices';

import { FaCheckDouble } from "react-icons/fa6";

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Phân tích cú pháp từ JSON
        if (user && user.userId) {
            getNotification(user.userId, setNotifications);
        }
    }, []);

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const notificationDate = new Date(timestamp);
        const timeDiff = now - notificationDate; // Tính khoảng cách thời gian

        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        if (daysDiff > 0) {
            return notificationDate.toLocaleDateString(); // Nếu quá 24h, hiển thị ngày
        } else {
            return notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Nếu trong 24h, hiển thị giờ
        }
    };

    const handleMarkAsRead = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng
        if (user && user.userId) {
            // Gọi hàm cập nhật thông báo là đã đọc
            await updateNotificationsAsRead(user.userId);
          
            setNotifications(prevNotifications => 
                prevNotifications.map(notification => ({
                    ...notification,
                    isRead: true, // Đánh dấu tất cả thông báo là đã đọc
                }))
            );
        }
    };

    return (
        <div className="absolute right-[580px] top-16 w-1/5 max-h-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-y-auto">
            <div className=''>
                <div className='flex justify-between items-center p-4'>
                    <div className='font-bold'>Notifications</div>
                    <div className='text-green-500 flex items-center cursor-pointer' onClick={handleMarkAsRead}>
                        <FaCheckDouble className='mr-1' /> Marks all as read
                    </div>
                </div>
                <div className='bg-gray-300 text-gray-500 font-[600px] py-1 border-b border-t border-gray-400 '>
                    <div className='ml-5 '>Detail</div>
                </div>
                <div className='p-4'>
                    {notifications.length > 0 ? (
                        notifications
                            .slice() 
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
                            .map(notification => (
                                <div key={notification.id} className="py-2">
                                    <div className='font-semibold text-[14px] flex justify-between '>
                                        {notification.title.toUpperCase()}    
                                        <span className="text-sm text-gray-500 ">{formatTimestamp(notification.timestamp)}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='text-[14px]'>{notification.description}</div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="p-2 text-gray-500">No notifications</div>
                    )}
                </div>
            </div>
        </div>
    );
};
