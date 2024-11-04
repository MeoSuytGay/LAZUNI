import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { MdSupportAgent } from 'react-icons/md';
import { FaChevronRight, FaAngleDoubleDown } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { ReportOrder } from '../Popup/ReportOrder';


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
    console.log(data);
    return (
        <>
            <div key={data.orderId} className="w-full rounded-xl border-2 py-6 px-2 border-primary mb-4 my-[40px]">



                <div className="border-b border-gray-300 mb-[20px]">
                    <div className="mx-[40px] mb-[20px]">
                        <div className="text-[16px] flex items-center font-bold">
                            <GoDotFill className="text-red-600" />
                            Vui lòng giao hàng đến:
                        </div>
                        <ul className="">
                            <li className="font-[400]">Địa chỉ người nhận: <strong>{data.data.buyer.address}</strong></li>
                            <li className="font-[400]">Tên người nhận: <strong>{data.data.buyer.userName}</strong></li>
                            <li className="font-[400]">Số điện thoại người nhận:<strong> {data.data.buyer.phoneNum}</strong></li>
                        </ul>
                    </div>
                </div>

                <div className="mb-[20px] mx-[40px]">
                    <div className="font-bold text-[24px]">Thông tin đơn hàng</div>
                    <div className=" my-[20px] ">
                        <div className=''>
                            <div className='font-semibold text-[16px]'>Đơn hàng bạn cần gởi :</div>
                            <div className='justify-between flex my-[20px]'>
                                <div className="flex text-center ">
                                    <div><img
                                        src={data.data.orderDetails[0].product.images[0].path}
                                        alt="Product"
                                        className="w-full h-10 object-cover rounded-lg"
                                    /></div>
                                    <div className="mx-2">{data.data.orderDetails[0].quantity} x</div>
                                    <div>{data.data.orderDetails[0].product.productName}</div>
                                </div>
                                <div className="font-bold">
                                    Tổng giá : {data.data.total}

                                </div>
                            </div>

                        </div>
                        <div className=''>
                            <div className='font-semibold text-[16px]'>Đơn hàng bạn nhận được :</div>
                            <div className='justify-between flex my-[20px]'>
                                <div className="flex text-center ">
                                    <div><img
                                        src={data.data.orderDetails[0].product.images[0].path}
                                        alt="Product"
                                        className="w-full h-10 object-cover rounded-lg"
                                    /></div>
                                    <div className="mx-2">{data.data.orderDetails[0].quantity} x</div>
                                    <div>{data.data.orderDetails[0].product.productName}</div>
                                </div>
                                <div className="font-bold">
                                    Tổng giá : {data.data.total}

                                </div>
                            </div>

                        </div>




                    </div>
                    <div>
                        <div className=" cursor-pointer flex items-center " onClick={toggleSupport}>
                            <div className="font-bold text-[18px] mr-[10px]">Bạn cần hỗ trợ?</div>
                            <FaAngleDoubleDown />
                        </div>
                        <div className={showSupport ? "" : "hidden"}>
                            <div className="text-center flex p-4 border-b" onClick={openReportModal}>
                                <MdSupportAgent className="mr-[8px] text-[24px]" />
                                <div className="mr-[340px]">Liên hệ với người mua</div>
                                <FaChevronRight className=" text-[20px]" />
                            </div>
                            <div className="text-center flex p-4 border-b" onClick={openReportModal}>
                                <RiArrowGoBackLine className="mr-[8px] text-[24px]" />
                                <div className="mr-[290px]">Báo cáo tình trạng sản phẩm</div>
                                <FaChevronRight className=" text-[20px]" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {isReportOpen && (
                <ReportOrder
                    isOpen={isReportOpen}
                    onClose={closeReportModal}
                    productId={data.data.orderId}
                />
            )}
        </>
    )


}