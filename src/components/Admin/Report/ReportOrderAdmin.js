import { useState, useEffect } from 'react';
import { FaReply } from 'react-icons/fa'; // Assuming you are using react-icons
import { AdminReportOrderServices, AdminResponseServices } from '../../../services/Admin/AdminReportServices';


export const ReportOrderAdmin = () => {
  const [reports, setReports] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch reports from AdminReportServices on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await AdminReportOrderServices(); // Call the AdminReportServices for order reports
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
  const handleSubmitResponse = async () => {
    if (selectedReport && responseText.trim() !== '') {
      // Update the report with response and set status to 'Đã giải quyết'
      const updatedReport = {
        ...selectedReport,
        responseMessage: responseText, // Use responseMessage to match your object
        state: 'Đã giải quyết',
      };

      try {
        // Send the updated report details to the AdminResponseServices
        await AdminResponseServices(updatedReport.reportId, responseText);

        // Update the report in the list after a successful response
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.reportId === updatedReport.reportId ? updatedReport : report
          )
        );

        // Clear the response text and close popup
        setResponseText('');
        setIsPopupOpen(false);
        setSelectedReport(null);
      } catch (error) {
        console.error('Error submitting response:', error);
      }
    } else {
      alert('Please enter a response before submitting.');
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
              <th className="px-6 py-3">Người giao dịch</th>
              <th className="px-6 py-3">Loại giao dịch</th>
              {/* <th className="px-6 py-3">Sản phẩm giao dịch</th> */}

              <th className="px-6 py-3">Hình ảnh báo cáo</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Phản hồi</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{report.title}</td>
                <td className="px-6 py-4">{report.description}</td>
                <td className="px-6 py-4">{report.order.buyer.userId}-{report.order.buyer.userName},{report.order.seller.userId}-{report.order.seller.userName}</td>
                <td className="px-6 py-4">{report.order.type}</td>


                {/* <td className="px-6 py-4 flex">
  <div>
    {report.order.orderdetails?.[0]?.product?.images?.[0]?.path ? (
      <img src={report.order.orderDetails[0].product.images[0].path} alt="Product Image" />
    ) : (
      <span>No image available</span>
    )}
  </div>
  {report.order.type === "exchange" && (
    <div>
      {report.order.orderdetails?.[0]?.productTrade?.images?.[0]?.path ? (
        <img src={report.order.orderDetails[0].productTrade.images[0].path} alt="Trade Product Image" />
      ) : (
        <span>No trade image available</span>
      )}
    </div>
  )}
</td> */}










                <td className="px-6 py-4 flex">
                  {report.images && report.images.length > 0 ? (
                    report.images.map((image, index) => (
                      <img
                        key={index} // Ensure to use a unique key for each element in the list
                        src={image.path}
                        className="w-[40px] h-[40px] mr-2 cursor-pointer" // Add some margin and make images clickable
                        alt={`Order Report ${index + 1}`} // Use a dynamic alt text for accessibility
                        onClick={() => window.open(image.path, '_blank')} // Open image in a new tab
                      />
                    ))
                  ) : (
                    <span>No images available</span> // Handle the case where there are no images
                  )}
                </td>
                <td className={`px-6 py-4 ${getStateColor(report.state)}`}>
                  {report.state === 'pending' ? 'Chưa giải quyết' : report.state}
                </td>
                <td className="px-6 py-4">{report.responseMessage || 'Chưa có phản hồi'}</td>
                <td className="px-6 py-4">
                  {report.state === 'pending' && (
                    <button onClick={() => handleRespond(report)} className="text-blue-500">
                      <FaReply />
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
          <div className="bg-white rounded-lg p-5 shadow-md w-2/5">
            <h2 className="text-lg font-bold">Phản hồi cho báo cáo đơn hàng</h2>
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
                onClick={() => {
                  setIsPopupOpen(false);
                  setResponseText(''); // Clear the text when closing the popup
                }}
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
