import { useState } from "react";
import { OfferYouMade } from "../components/Offer/OfferYouMade";
import { OfferYouReceived } from "../components/Offer/OfferYouReceived";
import { FaBoxOpen } from "react-icons/fa";
import { IoLogoDropbox } from "react-icons/io5";

export const OfferPage = () => {
  const [selectedArea, setSelectedArea] = useState("OfferYouMade");

  // Function to handle area switch
  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  // Assuming user data comes from a context or state management
  const user = { userId: 1 }; // Example user object for demonstration

  return (
    <>
      <div className="container mx-auto mt-[50px]">
        <h2 className="font-bold text-[30px]">Offer management</h2>

        <div className="my-[50px] p-4  flex items-center space-x-4">
          {/* Offer You Made as clickable div */}
          <div
            className={`p-3 w-1/6 border-b-2 cursor-pointer flex items-center space-x-2 ${
              selectedArea === "OfferYouMade"
                ? "border-primary text-primary font-bold"
                : "border-gray-300 text-gray-600"
            }`}
            onClick={() => handleAreaClick("OfferYouMade")}
          >
            <FaBoxOpen className="mr-2" />
            <div>Offer You Made</div>
          </div>

          {/* Offer You Received as a clickable div */}
          <div
            className={`p-3 w-1/6 border-b-2 cursor-pointer flex items-center space-x-2 w-[200px] ${
              selectedArea === "OfferYouRecieve"
                ? "border-primary text-primary font-bold"
                : "border-gray-300 text-gray-600"
            }`}
            onClick={() => handleAreaClick("OfferYouRecieve")}
          >
            <IoLogoDropbox className="mr-2" />
            <div>Offer You Received</div>
          </div>
        </div>

        <div>
          {selectedArea === "OfferYouMade" && user?.userId && <OfferYouMade />}
          {selectedArea === "OfferYouRecieve" && user?.userId && <OfferYouReceived />}
        </div>
      </div>
    </>
  );
};
