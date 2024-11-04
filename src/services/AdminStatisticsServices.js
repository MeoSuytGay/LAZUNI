// src/services/AdminStatisticsServices.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/statistics/monthly';
 

export const getMonthlyStatistics = async (month, year) => {
  try {
    const response = await axios.post(API_URL, { month, year });
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly statistics:", error);
    throw error;
  }
};
