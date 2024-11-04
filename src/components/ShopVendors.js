import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarImage from '../assets/images/avatar-default.jpg';
import { CiChat1 } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { MdLocalPhone } from "react-icons/md";
import { ListProductByidUse } from "./ListProductByidUser";
import { UserServices } from "../services/UserServices"; // Ensure UserServices is correctly implemented
export const ShopVendors = () => {
    const { userId } = useParams(); // Extract userId from URL
    const [vendorData, setVendorData] = useState(null); // For storing the fetched user data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch vendor data using UserServices
    useEffect(() => {
        const fetchVendorData = async () => {
            setLoading(true);
            try {
                const data = await UserServices(userId); // Fetch vendor data based on userId
                setVendorData(data); // Store the fetched vendor data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
                setLoading(false);
            }
        };

        fetchVendorData();
    }, [userId]); // Re-run when userId changes

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
    }

    return (
        <div className="container mx-auto">
            <div className="flex my-[50px]">
                <div className="w-2/5 bg-[#FAFAFA]">
                    <a href="#" title="User Profile" className="flex ml-[30px] my-[20px] space-x-2 items-center">
                        <img
                            className="w-[100px] h-[100px] rounded-full object-cover"
                            src={vendorData?.profilePicture || AvatarImage}
                            alt="Profile"
                        />
                        <div>
                            <strong className="text-base font-bold text-primary">
                                {vendorData?.userName || 'Guest'}
                            </strong>
                            <div className="flex mt-2">
                                <button className="flex items-center border p-2 mr-2">
                                    <CiChat1 className="mr-1" />
                                    <div className="text-[12px]">Chat ngay</div>
                                </button>
                                {/* <button className="flex items-center border p-2">
                                    <FaPlus className="mr-1 text-[10px]" />
                                    <div className="text-[12px]">Follow shop</div>
                                </button> */}
                            </div>
                        </div>
                    </a>
                </div>
                <div className="w-3/5 ml-12 flex mt-[10px]">
                    <div className="flex flex-col text-left mr-[150px]">
                        {/* Tình trạng thay vì sản phẩm */}
                        <div className="flex items-center mb-[30px] text-[14px]">
                            <CiShop className="text-[18px]" />
                            <div className="mx-[10px]">Trạng thái :</div>
                            {/* Hiển thị "Cá nhân" hoặc "Bán chuyên" tùy theo role */}
                            {vendorData?.role === 'user' ? 'Cá nhân' : 'Bán chuyên'}
                        </div>
                        <div className=" text-[14px]">
                            <div className="flex items-center">
                            <FaRegAddressBook className="text-[14px]" />
                            <div className="mx-[10px]">Địa chỉ:</div>
                            </div>
                            
                            {vendorData?.address || 'Chưa có địa chỉ'}
                        </div>
                    </div>
                    <div className="flex flex-col text-left">
                        <div className="flex items-center mb-[30px] text-[14px]">
                            <FiUserCheck className="text-[18px]" />
                            <div className="mx-[10px]">Tham gia:</div>
                            {vendorData?.createdAt ? new Date(vendorData.createdAt).toLocaleDateString() : '..'}
                        </div>
                        <div className="flex items-center text-[14px]">
                            <MdLocalPhone  className="text-[14px]" />
                            <div className="mx-[10px]">Số điện thoại:</div>
                            {vendorData?.phoneNum || '..'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pass the userId and status as props to ListProductByidUse */}
            <div>
                <ListProductByidUse userId={userId} status="public"  className="w-full"/>
            </div>
        </div>
    );
};
