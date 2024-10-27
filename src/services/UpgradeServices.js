import axios from "axios";

export const UpgradeServices = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const data = {
    userId: user.userId,
    packageId:2,
  };
console.log(data)
  try {
    const response = await axios.put('http://localhost:8080/upgrade', data);
    localStorage.setItem("user", JSON.stringify(response.data)); // Stringify response data
    return response.data; 
  } catch (error) {
    console.error("Error upgrading account:", error);
    throw error;
  }
};
