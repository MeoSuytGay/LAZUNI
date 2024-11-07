import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { OfferUpdateServices } from '../../services/OfferUpdateServices';
import NotificationModal from '../Popup/Notice';

import { MdSupportAgent } from 'react-icons/md';
import { FaChevronRight, FaAngleDoubleDown } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { ReportOrder } from '../Popup/ReportOrder';


export const ProductDeliverByRecived = (data) => {
    const [notification, setNotification] = useState({ show: false, message: '', success: false });
    const [showSupport, setShowSupport] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false); // State for report modal

    const handleConfirm = async (orderId) => {
        try {
            const response = await OfferUpdateServices(orderId, "done");
            if (response === "Order has been successful") {
                setNotification({ show: true, message: "Nhận hàng thành công", success: true });
            } else {
                setNotification({ show: true, message: "Lỗi", success: false });
            }
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const closeNotification = () => {
        setNotification({ show: false, message: '', success: false });
    };

    const toggleSupport = () => {
        setShowSupport(!showSupport);
    };

    const openReportModal = () => {
        setIsReportOpen(true);
    };

    const closeReportModal = () => {
        setIsReportOpen(false);
    };

    return (
        <>
            <div key={data.orderId} className="w-full rounded-xl border-2 py-6 px-2 border-primary mb-4 my-[40px]">
                {/* Order information */}
                <div className="border-b border-gray-300 mb-[20px]">
                    <div className="flex items-center justify-center mb-[20px]">
                        <div className="w-3/5">
                            <div className="font-semibold text-[12px]">
                                Sản phẩm sẽ được giao chậm chất trong vòng 7 ngày
                            </div>
                            <div className="font-bold mt-[10px]">
                                {data.data.seller.userName} đang tiến hành chuẩn bị hàng vào giao đến cho bạn
                            </div>
                        </div>
                        <div className="w-1/5">
                            <img
                                className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
                                src={data.data.seller.profilePicture}
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="border-b border-gray-300 mb-[20px]">
                    <div className="mx-[40px] flex justify-between mb-[20px]">
                        <div>
                            <div className="text-[14px] flex items-center">
                                <GoDotFill className="text-green-500" /> Từ
                            </div>
                            <div className="font-semibold">{data.data.seller.address}</div>
                        </div>
                        <div>
                            <div className="text-[14px] flex items-center">
                                <GoDotFill className="text-red-600" /> Đến
                            </div>
                            <div className="font-semibold">
                                {data.data.buyer.address} - {data.data.buyer.userName}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order details */}
                <div className="mb-[20px] mx-[40px]">
                    <div className="font-bold text-[24px]">Thông tin đơn hàng</div>
                    <div className="flex my-[20px] justify-between">
                        <div className="flex text-center">
                            <img
                                src={data.data.orderDetails[0].product.images[0].path}
                                alt="Product"
                                className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="mx-2">{data.data.orderDetails[0].quantity} x</div>
                            <div>{data.data.orderDetails[0].product.productName}</div>
                        </div>
                        {data.data.total !== "0" && (
                            <div className="font-bold">Tổng giá : {data.data.total}</div>
                        )}
                    </div>

                    {/* Support Section */}
                    <div>
                        <div className=" cursor-pointer flex items-center " onClick={toggleSupport}>
                            <div className="font-bold text-[18px] mr-[10px]">Bạn cần hỗ trợ?</div>
                            <FaAngleDoubleDown />
                        </div>
                        <div className={showSupport ? "" : "hidden"}>
                            <div className="text-center flex p-4 border-b" onClick={openReportModal}>
                                <MdSupportAgent className="mr-[8px] text-[24px]" />
                                <div className="mr-[340px]">Liên hệ với người bán</div>
                                <FaChevronRight className=" text-[20px]" />
                            </div>
                            <div className="text-center flex p-4 border-b" onClick={openReportModal}>
                                <RiArrowGoBackLine className="mr-[8px] text-[24px]" />
                                <div className="mr-[290px]">Báo cáo tình trạng sản phẩm</div>
                                <FaChevronRight className=" text-[20px]" />
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Section */}
                    <div className="flex my-[20px] justify-between mt-[10px] text-center">
                        <div className="font-semibold">
                            Vui lòng bấm xác nhận hàng khi đã kiểm tra đơn hàng đã <strong> nhận thành công</strong>
                        </div>
                        <button
                            className="p-4 text-white bg-primary rounded-lg"
                            onClick={() => handleConfirm(data.data.orderId)}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
            
            <NotificationModal
                show={notification.show}
                message={notification.message}
                success={notification.success}
                onClose={closeNotification}
            />

            {/* ReportOrder modal */}
            {isReportOpen && (
                <ReportOrder
                    isOpen={isReportOpen}
                    onClose={closeReportModal}
                    productId={data.data.orderId} 
                />
            )}
        </>
    );
};
