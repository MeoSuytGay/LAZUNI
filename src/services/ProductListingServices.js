import axios from "axios";

export const ProductListingServices = async (page, sortType, category,minPrice,maxPrice, address, productName) => {
  try {
    const queryParams = new URLSearchParams();
 console.log(address)
    if (page) queryParams.append("page", page);
    if (sortType) queryParams.append("sortType", sortType);
    if (category) queryParams.append("category", category);
    if (minPrice) queryParams.append("minPrice", minPrice); // Add minPrice filter
    if (maxPrice) queryParams.append("maxPrice", maxPrice); // Add maxPrice filter
    if (address) queryParams.append("address", address);
    if (productName) queryParams.append("productName", productName);

    const url = `http://localhost:8080/products/listing?${queryParams.toString()}`;

    console.log("API Request URL:", url);

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Product listing retrieved successfully:", response.data);
    return response.data; // Return the response data for further handling
  } catch (error) {
    console.error("Error in ProductListingServices:", error);
    return { error: error.message }; // Return the error message for further handling
  }
};
