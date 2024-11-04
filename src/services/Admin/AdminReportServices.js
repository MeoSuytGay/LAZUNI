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
  

  export const AdminResponseServices = async (reportId, responseMessage) => {
    try {
        // Send reportId and responseMessage as query parameters using RequestParam
        const response = await axios.post(
            `http://localhost:8080/reports/answerReport`,
            null, // No request body, using query parameters instead
            {
                params: {
                    reportId, // Query param for report ID
                    responseMessage, // Query param for response message
                },
            }
        );
        return response.data; // Return the updated report data
    } catch (error) {
        console.error("Error answering report:", error);
        throw error; // Re-throw error for the caller to handle
    }
};