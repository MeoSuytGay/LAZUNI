// Statistics.js
import React, { useEffect, useState } from 'react';
import { getMonthlyStatistics } from '../../services/AdminStatisticsServices';

export const Statistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                // You may want to use the current month and year
                const month = new Date().getMonth() + 1;
                const year = new Date().getFullYear();
                
                const data = await getMonthlyStatistics(month, year); // Call the statistics service
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) return <p>Loading statistics...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="statistics-container bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Admin Statistics</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="stat-box bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">New Users</h3>
              <p className="text-3xl font-bold">{statistics.newRegistrations}</p>
            </div>
            <div className="stat-box bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Products Uploaded</h3>
              <p className="text-3xl font-bold">{statistics.productUploads}</p>
            </div>
            <div className="stat-box bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Completed Transactions</h3>
              <p className="text-3xl font-bold">{statistics.completedTransactions}</p>
            </div>
            <div className="stat-box bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Revenue</h3>
              <p className="text-3xl font-bold">${statistics.totalTransactionAmount}</p>
            </div>
            <div className="stat-box bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Revenue from Upgrades</h3>
              <p className="text-3xl font-bold">${statistics.upgradeSales}</p>
            </div>

          </div>
        </div>
    );
};
