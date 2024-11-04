import axios from "axios";

export const UpgradeServices = async (packageId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const data = {
    userId: user?.userId,
    packageId,
  };
  
 console.log(data);
  try {
    const response = await axios.put('http://localhost:8080/upgrade', data);

    return response.data;
  } catch (error) {
    console.error("Error upgrading account:", error.message || error);
    throw error;
  }
};
