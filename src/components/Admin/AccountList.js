import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import axios from 'axios'; // Import axios to handle API calls
import { AdminAccountServices } from '../../services/AdminAccountServices';

export const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to handle search input

  // Fetch account list from AdminAccountServices API when component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await AdminAccountServices(); // Replace with your API service
        setAccounts(response); // Assuming the API returns a list of accounts
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  // Handle toggling of account status
  const handleToggleStatus = (username) => {
    setSelectedAccount(username);
    setShowPopup(true);
  };

  const confirmToggleStatus = async () => {
    try {
      // Call the API to toggle the account status
      await axios.put(`/api/admin/accounts/toggle-status`, { username: selectedAccount });
      setAccounts(prevAccounts =>
        prevAccounts.map(account =>
          account.userName === selectedAccount
            ? { ...account, state: account.state === 'active' ? 'inactive' : 'active' }
            : account
        )
      );
    } catch (error) {
      console.error('Error updating account status:', error);
    }

    setShowPopup(false);
    setSelectedAccount(null);
  };

  const cancelToggleStatus = () => {
    setShowPopup(false);
    setSelectedAccount(null);
  };

  // Filter accounts based on search input
  const filteredAccounts = accounts.filter(account =>
    account?.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto mt-[50px] ml-[20px]">
      <div className="mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-[13px] uppercase text-primary">
            <tr>
              <th className="px-4 py-3">Tên người dùng</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Địa chỉ</th>
              <th className="px-4 py-3">Số dư</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {account.userName}
                </td>
                <td className="px-4 py-4">{account.phoneNum}</td>
                <td className="px-4 py-4">{account.role}</td>
                <td className="px-4 py-4">{account.email}</td>
                <td className="px-4 py-4">{account.address}</td>
                <td className="px-4 py-4">{account.balance}</td>
                <td className={`px-4 py-4 ${account.state === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {account.state}
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => handleToggleStatus(account.userName)}>
                    {account.state === 'active' ? (
                      <FaToggleOn className="text-green-600" />
                    ) : (
                      <FaToggleOff className="text-red-600" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup xác nhận */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Xác nhận thay đổi trạng thái</h2>
            <p>Bạn có chắc chắn muốn thay đổi trạng thái tài khoản của {selectedAccount} không?</p>
            <div className="flex justify-end mt-4">
              <button onClick={cancelToggleStatus} className="mr-2 px-4 py-2 bg-gray-300 rounded">Hủy</button>
              <button onClick={confirmToggleStatus} className="px-4 py-2 bg-blue-500 text-white rounded">Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
