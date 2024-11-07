import React, { useEffect, useState } from 'react';
import { HistoryReportOrder } from '../../../services/ReportProductServices';


export const ReportOrder = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await HistoryReportOrder(user.userId); // Fetch order reports
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
        return state === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800';
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mx-auto ml-[50px]">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[13px] uppercase text-primary">
                        <tr>
                       
                            <th className="px-6 py-3">Order title</th>
                            <th className="px-6 py-3">Description</th>
                           
                            <th className="px-6 py-3">Report Image</th>
                            <th className="px-6 py-3">State</th>
                            <th className="px-6 py-3">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index} className="border-b border-gray-200">
                              
                                <td className="px-6 py-4">
                                    {report.title}
                                </td>
                                <td className="px-6 py-4">
                                    {report.description}
                                </td>
                               
                                <td className="px-6 py-4 flex">
    {report.images && report.images.length > 0 ? (
        report.images.map((image, index) => (
            <img
                key={index} // Ensure to use a unique key for each element in the list
                src={image.path}
                className="w-[40px] h-[40px] mr-2" // Add some margin between images if needed
                alt={`Order Report ${index + 1}`} // Use a dynamic alt text for accessibility
            />
        ))
    ) : (
        <span>No images available</span> // Handle the case where there are no images
    )}
</td>

                                <td className={`px-6 py-4 ${getStateColor(report.state)}`}>
                                    {report.state}
                                </td>
                                <td className="px-6 py-4 font-bold text-primary">
                                    {report.responseMessage}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
