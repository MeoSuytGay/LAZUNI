import React, { useEffect, useState } from 'react';
import { BlanceFlucationServices } from '../../services/BlanceFlucationServices';

export const BlanceFlucation = () => {
  const [fluctuations, setFluctuations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BlanceFlucationServices();
        setFluctuations(data); // Update the state with the fetched data
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto  ml-[20px]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-[13px] uppercase text-primary">
            <tr>
              <th className="px-4 py-3">Nội dung</th>
              <th className="px-4 py-3">Số tiền thay đổi</th>
              <th className="px-4 py-3">Loại giao dịch</th>
              <th className="px-4 py-3">Số dư hiện tại</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày</th>
            </tr>
          </thead>
          <tbody>
            {fluctuations.map((fluctuation, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-4 font-medium text-gray-900">{fluctuation.content}</td>
                <td className="px-4 py-4">{fluctuation.amount}</td>
                <td className="px-4 py-4">{fluctuation.transactionType}</td>
                <td className="px-4 py-4">{fluctuation.balance}</td>
                <td className={`px-4 py-4 ${fluctuation.state === "Giao dịch thành công" ? 'text-green-600 ' : 'text-red-600'}`}>
                  {fluctuation.state}
                </td>
                <td className="px-4 py-4">{fluctuation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
