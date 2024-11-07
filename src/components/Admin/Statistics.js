import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { getYearlyStatistics } from '../../services/AdminStatisticsServices';

// Register necessary components for charting
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export const Statistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchYearlyStatistics = async () => {
            try {
                const year = new Date().getFullYear();
                const data = await getYearlyStatistics(year);
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchYearlyStatistics();
    }, []);

    if (loading) return <p>Loading statistics...</p>;
    if (error) return <p>Error: {error}</p>;

    const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));

    // Data for Transaction Amount and Upgrade Sales chart
    const transactionAndUpgradeData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Total Transaction Amount',
                data: statistics.totalTransactionAmount,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
            {
                label: 'Upgrade Sales',
                data: statistics.upgradeSales,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    };

    // Data for other charts
    const newUserRegistrationsData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'New User Registrations',
                data: statistics.newRegistrations,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    const completedTransactionsData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Completed Transactions',
                data: statistics.completedTransactions,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
            },
        ],
    };

    const productUploadsData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Product Uploads',
                data: statistics.productUploads,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="statistics-grid grid grid-cols-2 gap-4 p-6">
            <div className="chart-container p-4 bg-white shadow-md rounded">
                <h3 className="text-lg font-semibold mb-2">Total Transaction Amount & Upgrade Sales</h3>
                <Line data={transactionAndUpgradeData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
            <div className="chart-container p-4 bg-white shadow-md rounded">
                <h3 className="text-lg font-semibold mb-2">New User Registrations</h3>
                <Line data={newUserRegistrationsData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
            <div className="chart-container p-4 bg-white shadow-md rounded">
                <h3 className="text-lg font-semibold mb-2">Completed Transactions</h3>
                <Line data={completedTransactionsData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
            <div className="chart-container p-4 bg-white shadow-md rounded">
                <h3 className="text-lg font-semibold mb-2">Product Uploads</h3>
                <Line data={productUploadsData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
        </div>
    );
};
