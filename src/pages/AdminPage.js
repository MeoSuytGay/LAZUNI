import { useState } from "react";
import { AccountList } from "../components/Admin/AccountList";
import { ManagementCategories } from "../components/Admin/ManagementCatories";
import { ReportList } from "../components/Admin/ReportList";
import { SensorProduct } from "../components/Admin/SensorProduct";
import { FaList, FaChartBar, FaProductHunt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import LogoutModal from "../components/Popup/LogoutModal";
import { Navigate } from "react-router-dom";
import { Statistics } from "../components/Admin/Statistics";


export const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("accountList");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const components = {
    accountList: AccountList,
    managementCategories: ManagementCategories,
    reportList: ReportList,
    sensorProduct: SensorProduct,
    statistics: Statistics,
  };

 
  const RenderedComponent = components[activeComponent] || AccountList;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white h-[1200px] flex flex-col justify-between">
        <ul className="flex flex-col">
          <li
            className={`p-4 cursor-pointer ${activeComponent === "accountList" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveComponent("accountList")}
          >
            <GrUserAdmin className="inline-block mr-2" /> Account List
          </li>
          <li
            className={`p-4 my-3 cursor-pointer ${activeComponent === "managementCategories" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveComponent("managementCategories")}
          >
            <FaList className="inline-block mr-2" /> Management Categories
          </li>
          <li
            className={`p-4 cursor-pointer ${activeComponent === "reportList" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveComponent("reportList")}
          >
            <FaChartBar className="inline-block mr-2" /> Report List
          </li>
          <li
            className={`p-4 cursor-pointer ${activeComponent === "sensorProduct" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveComponent("sensorProduct")}
          >
            <FaProductHunt className="inline-block mr-2" /> Sensor Product
          </li>
          <li
             className={`p-4 cursor-pointer ${activeComponent === "statistics" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveComponent("statistics")}
          >
            <FaChartBar className="inline-block mr-2" /> Statistics
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="p-4 text-left text-sm text-white bg-red-600 hover:bg-red-700 w-full"
        >
          Log Out
        </button>
      </aside>

      {/* Main content */}
      <main className="w-4/5 px-2">
        <RenderedComponent />
      </main>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </div>
  );
};
