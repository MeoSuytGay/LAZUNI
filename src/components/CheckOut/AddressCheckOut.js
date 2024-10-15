import { ImLocation2 } from "react-icons/im";

export const AddressCheckOut = () => {
  // Assuming user data is stored in localStorage as a JSON string
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="my-4 p-4 border-gray-200 rounded-lg">
      {/* Header: Location Icon and Title */}
      <div className="flex items-center text-red-500 text-lg mb-2">
        <ImLocation2 className="mr-2" />
        <span className="font-semibold">Địa Chỉ Nhận Hàng</span>
      </div>

      {/* User Information */}
      <div className="flex justify-between items-center">
        {/* Name and Phone Number */}
        <div className="flex items-center">
          <strong className="text-lg">
            {user?.userName} (+84) {user?.phoneNum}
          </strong>
          {/* Address */}
          <span className="ml-4 text-gray-600">{user?.address}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center">
          {/* Mặc định Button */}
          <div className="ml-4 px-2 py-1 border border-red-500 text-red-500 rounded text-sm">
            Mặc định
          </div>
          {/* Thay Đổi Button */}
          {/* <button className="ml-4 text-blue-500">Thay Đổi</button> */}
        </div>
      </div>
    </div>
  );
};
