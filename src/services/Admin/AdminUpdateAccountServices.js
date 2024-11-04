import axios from "axios";

export const AdminUpdateAccountServices = async (selectedUserId, newStatus) => {
  try {
    const url = `http://localhost:8080/admin/${newStatus === "active" ? "unbanUser" : "banUser"}`;
    const response = await axios.put(url, null, {
      params: { userId: selectedUserId } // Pass userId as a query parameter
    });
    return response.data; 
  } catch (error) {
    console.error('Error updating account status:', error.response ? error.response.data : error.message);
    throw error; // Throw the error to be handled where this function is called
  }
};
