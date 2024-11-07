import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { MdSupportAgent } from 'react-icons/md';
import { FaChevronRight, FaAngleDoubleDown } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { ReportOrder } from '../Popup/ReportOrder';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
export const ProducDeliveryByMade = (data) => {
    const [isReportOpen, setIsReportOpen] = useState(false); // State for report modal
    const [showSupport, setShowSupport] = useState(false);

    const openReportModal = () => {
        setIsReportOpen(true);
    };

    const closeReportModal = () => {
        setIsReportOpen(false);
    };

    const toggleSupport = () => {
        setShowSupport(!showSupport);
    };

    return (
        <>
            <div key={data.orderId} className="w-full rounded-xl border-2 py-6 px-2 border-primary mb-4 my-[40px]">
                <div className="border-b border-gray-300 mb-[20px]">
                    <div className="mx-[40px] mb-[20px]">
                        <div className="text-[16px] flex items-center font-bold">
                            <GoDotFill className="text-red-600" />
                            Vui lòng giao hàng đến:
                        </div>
                        <ul>
                            <li className="font-[400]">Địa chỉ người nhận: <strong>{data.data.buyer.address}</strong></li>
                            <li className="font-[400]">Tên người nhận: <strong>{data.data.buyer.userName}</strong></li>
                            <li className="font-[400]">Số điện thoại người nhận:<strong> {data.data.buyer.phoneNum}</strong></li>
                        </ul>
                    </div>
                </div>

                <div className="mb-[20px] mx-[40px]">
                    <div className="font-bold text-[24px]">Thông tin đơn hàng</div>
                    <div className="my-[20px]">
                        <div className='flex justify-between items-center'>
                            <div className=''>
                                <div className="font-semibold text-[16px]">Vật phẩm bạn cần gởi :</div>
                                <div className="justify-between flex my-[20px]">
                                    <div className="flex text-center">
                                        <img
                                            src={data.data.orderDetails[0].product.images[0].path}
                                            alt="Product"
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="mx-2">{data.data.orderDetails[0].quantity}x</div>
                                        <div>{data.data.orderDetails[0].product.productName}</div>
                                    </div>
                                </div>
                            </div>
                            {data.data.type === "exchange" && (
                                <div className=''>
                                    <div className="text-[30px]"><FaArrowRightArrowLeft /></div>

                                </div>
                            )}


                            {/* Conditional rendering for exchange order */}
                            {data.data.type === "exchange" ? (

                                <div>
                                    <div className="font-semibold text-[16px]">Vật phẩm bạn nhận được :</div>
                                    <div className="justify-between flex my-[20px]">
                                        <div className="flex text-center">
                                            <img
                                                src={data.data.orderDetails[0].productTrade.images[0].path}
                                                alt="Product"
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="mx-2">{data.data.orderDetails[0].quantity}x</div>
                                            <div>{data.data.orderDetails[0].productTrade.productName}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="font-bold mt-4">
                                    Tổng giá : {data.data.total}
                                </div>
                            )}


                        </div>
                    </div>

                    <div>
                        <div className="cursor-pointer flex items-center" onClick={toggleSupport}>
                            <div className="font-bold text-[18px] mr-[10px]">Bạn cần hỗ trợ?</div>
                            <FaAngleDoubleDown />
                        </div>
                        <div className={showSupport ? "" : "hidden"}>
                            <div className="text-center flex p-4 border-b" onClick={openReportModal}>
                                <MdSupportAgent className="mr-[8px] text-[24px]" />
                                <div className="mr-[340px]">Liên hệ với người mua</div>
                                <FaChevronRight className="text-[20px]" />
                            </div>
                            <div className="text-center flex p-4 border-b" onClick={openReportModal}>
                                <RiArrowGoBackLine className="mr-[8px] text-[24px]" />
                                <div className="mr-[294px]">Báo cáo tình trạng sản phẩm</div>
                                <FaChevronRight className="text-[20px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isReportOpen && (
                <ReportOrder
                    isOpen={isReportOpen}
                    onClose={closeReportModal}
                    orderId={data.data.orderId}
                />
            )}
        </>
    );
};
