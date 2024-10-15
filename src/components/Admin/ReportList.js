import React, { useState, useEffect } from 'react';
import { FaReply } from 'react-icons/fa'; 
import { AdminReportServices } from '../../services/AdminReportServices'; // Import your service

export const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch reports from AdminReportServices on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await AdminReportServices(); // Call the AdminReportServices function
        setReports(data); // Set the fetched data to reports state
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Function to determine background color based on report status
  const getStateColor = (state) => {
    return state === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800';
  };

  // Handle respond to report
  const handleRespond = (report) => {
    setSelectedReport(report); // Set the report to respond to
    setIsPopupOpen(true); // Open popup
  };

  // Handle submit response
  const handleSubmitResponse = () => {
    if (selectedReport) {
      // Update the report with response and set status to 'Đã giải quyết'
      const updatedReport = {
        ...selectedReport,
        responseMessage: responseText, // Use responseMessage to match your object
        state: 'Đã giải quyết',
      };

      // Update the report in the list
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.title === updatedReport.title ? updatedReport : report
        )
      );

      // Clear the response text and close popup
      setResponseText('');
      setIsPopupOpen(false);
      setSelectedReport(null);
    }
  };

  return (
    <div className="mx-auto ml-[20px] mt-[50px]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-[13px] uppercase text-primary">
            <tr>
              <th className="px-6 py-3">Tiêu đề</th>
              <th className="px-6 py-3">Mô tả</th>
              <th className="px-6 py-3">Tên sản phẩm</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Kết quả</th>
              <th className="px-6 py-3">Phản hồi</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {report.title}
                </td>
                <td className="px-6 py-4">{report.description}</td>
                <td className="px-6 py-4">{report.productName}</td>
                <td className={`px-6 py-4 ${getStateColor(report.state)}`}>
  {report.state === 'pending' ? 'Chưa giải quyết' : report.state}
</td>

                <td className="px-6 py-4">{report.responseMessage || 'Chưa có phản hồi'}</td>
                <td   d className="px-6 py-4">
                  {report.state === 'pending' && (
                    <button
                      onClick={() => handleRespond(report)}
                      className="text-blue-500"
                    >
                      <FaReply  />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup to enter the response */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 shadow-md">
            <h2 className="text-lg font-bold">Phản hồi cho báo cáo</h2>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Nhập phản hồi của bạn ở đây..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitResponse}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Gửi
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
