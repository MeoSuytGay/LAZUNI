import axios from 'axios';



export const AdminReportServices = async () => {
    try {
      // Fetch the report history using the userId
      const response = await axios.get(`http://localhost:8080/reports/admin/history`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Log and return the response data
      console.log("Report history data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching report history:", error);
      throw error; // Re-throw the error after logging it
    }
  };
  