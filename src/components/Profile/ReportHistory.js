import React, { useEffect, useState } from 'react';
import { HistoryReportProduct } from '../../services/ReportProductServices';

export const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
   
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await HistoryReportProduct(user.userId);
        setReports(data);
        setLoading(false);
      } catch (error) {
        setError('Not Found');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getStateColor = (state) => {
    return state === 'Đã giải quyết' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto ml-[50px]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-[13px] uppercase text-primary">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {report.title}
                </td>
                <td className="px-6 py-4">
                  {report.description}
                </td>
                <td className="px-6 py-4">
                  {report.productName}
                </td>
                <td className={`px-6 py-4 ${getStateColor(report.state)}`}>
                  {report.state}
                </td>
                <td className="px-6 py-4">
                  {report.response_message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
