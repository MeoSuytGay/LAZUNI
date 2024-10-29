import axios from 'axios';

export const ProductDetailServices = async (productId) => {
    try {
       console.log(productId)
        // Fetch product data using a GET request
        const response = await axios.get(`http://localhost:8080/products/${productId}`); // Use backticks here
        console.log(response.data)
        if (response.data) {
            return response.data;
        } else {
            console.log('Product not found');
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch product details:', error);
        throw error;
    }
};

export const deleteProductImgServices= async(imgId)=>{
    try {
        console.log(imgId)
         // Fetch product data using a GET request
         const response = await axios.delete(`http://localhost:8080/image/${imgId}`); // Use backticks here
         console.log(response.data)
       
             return response.data;
        
     } catch (error) {
         console.error('Failed to fetch product details:', error);
         throw error;
     }
}

export const UpdateProductServices = async (productId, formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/products/update/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.error('Failed to update product details:', error);
      throw error;
    }
  };