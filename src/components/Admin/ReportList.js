import React, { useState } from 'react';


import { FaBoxOpen } from 'react-icons/fa';
import { IoLogoDropbox } from 'react-icons/io5';
import { ReportOrderAdmin } from './Report/ReportOrderAdmin';
import {ReportProductAdmin} from './Report/ReportProductAdmin';
 
export const ReportList = () => {
  const [selectedArea, setSelectedArea] = useState("ReportOrder");

  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  const user = { userId: 1 }; // Example user object for demonstration

  return (
    <>
      <div className="container mx-auto ">
        <h2 className="font-bold text-[30px]">History report</h2>

        <d  iv className="my-[10px] p-4 flex items-center space-x-4">
          {/* Report Order Tab */}
          <div
            className={`p-3 w-1/6 border-b-2 cursor-pointer flex items-center space-x-2 ${
              selectedArea === "ReportOrder"
                ? "border-primary text-primary font-bold"
                : "border-gray-300 text-gray-600"
            }`}
            onClick={() => handleAreaClick("ReportOrder")}
          >
            <FaBoxOpen className="mr-2" />
            <div>Report order</div>
          </div>

          {/* Report Product Tab */}
          <div
            className={`p-3 w-1/6 border-b-2 cursor-pointer flex items-center space-x-2 ${
              selectedArea === "ReportProduct"
                ? "border-primary text-primary font-bold"
                : "border-gray-300 text-gray-600"
            }`}
            onClick={() => handleAreaClick("ReportProduct")}
          >
            <IoLogoDropbox className="mr-2" />
            <div>Report product</div>
          </div>
        </d>

        <div>
          {/* Conditionally render the selected report */}
          {selectedArea === "ReportOrder" && user?.userId && <ReportOrderAdmin />}
          {selectedArea === "ReportProduct" && user?.userId && <ReportProductAdmin />}
        </div>
      </div>
    </>
  );
};
