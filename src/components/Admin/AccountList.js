import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { AdminAccountServices } from '../../services/AdminAccountServices';
import { AdminUpdateAccountServices } from '../../services/AdminUpdateAccountServices';

export const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user ID
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
  const handleToggleStatus = (account) => {
    setSelectedAccount(account.userName);
    setSelectedUserId(account.userId); // Set selected user ID
    setShowPopup(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedUserId) return; // Ensure there's a selected user ID
  
    // Find the account to update
    const accountToUpdate = accounts.find(account => account.userId === selectedUserId);
    if (!accountToUpdate) return; // Check if the account exists
  
    // Determine the new status
    const newStatus = accountToUpdate.state === 'active' ? 'inactive' : 'active'; 
  
    try {
      // Call the API to toggle the account status, passing userId and new status
      await AdminUpdateAccountServices(selectedUserId, newStatus); // Update with userId and new status
  
      // Update local state
      setAccounts(prevAccounts =>
        prevAccounts.map(account =>
          account.userId === selectedUserId
            ? { ...account, state: newStatus } // Update account state in local state
            : account
        )
      );
    } catch (error) {
      console.error('Error updating account status:', error);
    }
  
    // Reset popup state
    setShowPopup(false);
    setSelectedAccount(null);
    setSelectedUserId(null); // Clear the selected user ID
  };
  

  const cancelToggleStatus = () => {
    setShowPopup(false);
    setSelectedAccount(null);
    setSelectedUserId(null); // Clear the selected user ID
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
                  <button onClick={() => handleToggleStatus(account)}>
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
