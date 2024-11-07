import axios from 'axios';

export const ReportProductServices = async (reportData) => {
  console.log(reportData)
  try {
    const response = await axios.post('http://localhost:8080/reports/products', reportData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error reporting product:", error);
    throw error;
  }
};
export const ReportOrderServices = async (reportData) => {

  try {
    const response = await axios.post('http://localhost:8080/reports/orders', reportData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
    const response = await axios.get(`http://localhost:8080/reports/product_history?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Report history data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching report history:", error);
    // You could return an empty array or show a user-friendly message to the user
    return []; 
  }
};

export const HistoryReportOrder = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8080/reports/order_history?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Report history data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching report history:", error);
    // You could return an empty array or show a user-friendly message to the user
    return []; 
  }
};
