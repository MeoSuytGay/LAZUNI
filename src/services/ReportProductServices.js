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

export const HistoryReportProduct = async (data) => {
  console.log(data);
  try {
    const response = await axios.get(`http://localhost:8080/reports/${data}`, {  // Use template literals to insert the data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching report history:", error);
    throw error;
  }
};

