import axios from 'axios';

export const ReportProductServices = async (reportData) => {
  try {
    const response = await axios.post('http://localhost:8080/reports', reportData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error reporting product:", error);
    throw error;
  }
};

export const HistoryReportProduct = async (userId) => {
  try {
    // Fetch the report history using the userId
    const response = await axios.get(`http://localhost:8080/reports/history?userId=${userId}`, {
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

