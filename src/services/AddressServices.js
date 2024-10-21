import axios from "axios";

export const AddressServices = async () => {
  try {
    const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
    const cities = response.data;  // Assuming the data contains cities directly
    return cities;  // Return the cities data
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];  // Return an empty array in case of an error
  }
};
