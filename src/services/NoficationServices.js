import { initializeApp } from "firebase/app";
import { getDatabase, ref, push,set,onValue ,query,orderByChild,equalTo ,get,update} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCmnuMVFU3-miBcKwLGflvL26Se4fv0j5M",
  authDomain: "fire-base-au-tho.firebaseapp.com",
  databaseURL: "https://fire-base-au-tho-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fire-base-au-tho",
  storageBucket: "fire-base-au-tho.appspot.com",
  messagingSenderId: "583976886489",
  appId: "1:583976886489:web:d4f84f6581546fb9645ec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create Notification Function
export async function createNotification(senderID,recievedId, senderName, description,title,isRead) {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications'); // Reference to notifications node

    try {
      const newNotificationRef = push(notificationsRef); // Generate a new unique ID
      await set(newNotificationRef, {
        senderId: senderID,
        recievedId: recievedId,
        senderName: senderName,
        title:title,
        description: description,
        isRead:isRead,
     
        timestamp: new Date().toISOString(),
      });
      console.log("Notification added successfully");
    } catch (error) {
      console.error("Error adding notification to Firebase:", error);
    }
}

export async function getNotification(recievedId, setNotifications) {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications');

    // Định nghĩa một truy vấn để lấy tất cả thông báo theo recievedId
    const recievedIdQuery = query(notificationsRef, orderByChild('recievedId'), equalTo(recievedId));

    // Lắng nghe các cập nhật thời gian thực
    onValue(recievedIdQuery, (snapshot) => {
        if (snapshot.exists()) {
            const notifications = [];
            snapshot.forEach(childSnapshot => {
                const notificationData = { id: childSnapshot.key, ...childSnapshot.val() };
                // Chỉ thêm các thông báo chưa đọc
                if (notificationData.isRead === false) {
                    notifications.push(notificationData);
                }
            });
            setNotifications(notifications); // Cập nhật trạng thái thông báo
        } else {
            console.log("No notifications found with the given recievedId");
            setNotifications([]); // Xóa thông báo nếu không tìm thấy
        }
    }, (error) => {
        console.error("Error retrieving notifications:", error);
    });
}
export const updateNotificationsAsRead = async (userId) => {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications');

    try {
        const snapshot = await get(notificationsRef); // Lấy tất cả thông báo
        const updates = {};
        snapshot.forEach(notification => {
            if (notification.val().recievedId === userId) {
                updates[`/${notification.key}/isRead`] = true; // Đánh dấu là đã đọc
            }
        });
        await update(notificationsRef, updates); // Cập nhật tất cả thông báo
        console.log("Notifications marked as read successfully");
    } catch (error) {
        console.error("Error marking notifications as read:", error);
    }
};