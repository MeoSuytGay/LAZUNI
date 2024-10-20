import axios from "axios";

export const AddCategoryServices = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8080/categories", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // For sending files (images)
            },
        });
        return response.data; // Return the response data (newly added category)
    } catch (error) {
        console.error("Error adding category:", error);
        throw error; // Re-throw error for the caller to handle
    }
};


export const DeleteCategoryServices = async (categoryId) => {
    try {
        console.log(categoryId)
        const response = await axios.delete(`http://localhost:8080/categories/${categoryId}`);
      
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error; // Re-throw error for the caller to handle
    }
};
