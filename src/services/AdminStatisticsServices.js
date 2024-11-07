import axios from 'axios';

const fetchMonthlyStatistics = async () => {
  setLoading(true); // Start loading
  try {
      const data = await getMonthlyStatistics({ month: selectedMonth, year }); // Ensure you're passing both
      setStatistics(prev => ({ ...prev, monthly: data })); // Update the state properly
  } catch (error) {
      console.error('Error fetching monthly statistics:', error);
      setError(error.message);
  } finally {
      setLoading(false); // End loading
  }
};

export const getYearlyStatistics = async (year) => {
    const response = await axios.post('http://localhost:8080/admin/statistics/yearly', {
        year,
    });
    return response.data; // Ensure this returns the structure expected by your component
};
