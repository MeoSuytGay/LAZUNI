import { useState } from "react";
import { AccountList } from "../components/Admin/AccountList";
import { ManagementCategories, ManagementCatories } from "../components/Admin/ManagementCatories";
import { ReportList } from "../components/Admin/ReportList";
import { SensorProduct } from "../components/Admin/SensorProduct";
import { FaList, FaChartBar, FaProductHunt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import LogoutModal from "../components/Popup/LogoutModal";

export const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("accountList");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Hàm render component dựa trên state
  const renderComponent = () => {
    switch (activeComponent) {
      case "accountList":
        return <AccountList />;
      case "managementCategories":
        return <ManagementCategories />;
      case "reportList":
        return <ReportList />;
      case "sensorProduct":
        return <SensorProduct />;
      default:
        return <AccountList />;
    }
  };

  // Hàm xử lý logout
  const handleLogout = () => {
    setShowLogoutModal(true); // Hiển thị modal khi nhấn nút log out
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Đóng modal
  };

  const confirmLogout = () => {
    // Logic để xử lý khi xác nhận logout
    console.log("Logged out");
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white h-[1000px] flex flex-col justify-between">
        {/* Danh sách các chức năng */}
        <ul className="flex flex-col">
          <li
            className={`p-4  cursor-pointer ${
              activeComponent === "accountList" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("accountList")}
          >
            <GrUserAdmin className="inline-block mr-2" /> Account List
          </li>
          <li
            className={`p-4 my-3 cursor-pointer ${
              activeComponent === "managementCategories" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("managementCategories")}
          >
            <FaList className=" inline-block mr-2" /> Management Categories
          </li>
          <li
            className={`p-4 cursor-pointer ${
              activeComponent === "reportList" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("reportList")}
          >
            <FaChartBar className="inline-block mr-2" /> Report List
          </li>
          <li
            className={`p-4 cursor-pointer ${
              activeComponent === "sensorProduct" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("sensorProduct")}
          >
            <FaProductHunt className="inline-block mr-2" /> Sensor Product
          </li>
        </ul>

        {/* Nút Log Out */}
        <button
          onClick={handleLogout}
          className="p-4 text-left text-sm text-white bg-red-600 hover:bg-red-700 w-full"
        >
          Log Out
        </button>
      </div>

      {/* Nội dung bên phải */}
      <div className="w-4/5 px-2 ">{renderComponent()}</div>

      {/* Modal Log Out */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </div>
  );
};
