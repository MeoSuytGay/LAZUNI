import { useState } from "react";
import { OfferCompleted } from "./OfferCompleted";
import { OfferFailed } from "./OfferFailed";
import { OfferInProgress } from "./OfferInProgress";
import { OfferPending } from "./OfferPending";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaExclamationTriangle, FaSpinner, FaCheckCircle } from "react-icons/fa";

import { CiDeliveryTruck } from "react-icons/ci";
export const OfferYouReceived=()=>{
  const [selectedStatus, setSelectedStatus] = useState("pending");

  // Function to handle status change
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="container mx-auto mt-[20px]">
      <h2 className="font-semibold text-[24px]">Offer You Received</h2>

      {/* Status buttons */}
      <div className="my-[50px] mt-[30px] flex justify-start space-x-4">
        {/* Pending button */}
        <button
          className={`p-3 px-7 flex items-center border-2 ${
            selectedStatus === "pending"
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-primary"
          } rounded-3xl`}
          onClick={() => handleStatusClick("pending")}
        >
          <MdOutlinePendingActions className="mr-2" status="recive"/>
          Pending
        </button>

        {/* Failed button */}
        <button
          className={`p-3 px-7 flex items-center border-2 ${
            selectedStatus === "failed"
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-primary"
          } rounded-3xl`}
          onClick={() => handleStatusClick("failed")}
        >
          <FaExclamationTriangle className="mr-2" status="recive"/>
          Failed
        </button>

        {/* In Progress button */}
        <button
          className={`p-3 px-7 flex items-center border-2 ${
            selectedStatus === "inprogress"
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-primary"
          } rounded-3xl`}
          onClick={() => handleStatusClick("inprogress")}
        >
          <CiDeliveryTruck className="mr-2" status="recive"/>
          In Progress
        </button>

        {/* Completed button */}
        <button
          className={`p-3 px-7 flex items-center border-2 ${
            selectedStatus === "completed"
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-primary"
          } rounded-3xl`}
          onClick={() => handleStatusClick("completed")}
        >
          <FaCheckCircle className="mr-2" status="recive"/>
          Completed
        </button>
      </div>

      {/* Render the selected status component */}
      <div>
        {selectedStatus === "pending" && <OfferPending status="receive"/>}
        {selectedStatus === "failed" && <OfferFailed  status="receive"/>}
        {selectedStatus === "inprogress" && <OfferInProgress  status="receive"/>}
        {selectedStatus === "completed" && <OfferCompleted  status="receive"/>}
      </div>
    </div>
  );
}