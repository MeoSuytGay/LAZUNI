import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailServices } from "../services/ProductDetailServices";
import { FaTags } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbFreeRights } from "react-icons/tb";
import { AiOutlineSafety } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { PiHandshake } from "react-icons/pi";
import { FaHandHolding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { FeedBack } from "../components/Feedback";
import { MdOutlineReport } from "react-icons/md";

import ConfirmPurchasePopup from '../components/Popup/Confirm';
import ReportPopup from "../components/Popup/ReportProduct";
import { Carousel } from "../components/Other/HomeBanner";
export const ProductDetail = () => {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showExchangeList, setShowExchangeList] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState([]); // Track multiple selected products
    const [isReportPopupOpen, setReportPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const data = [
        {
            id: 1,
            img: "https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-110924-060849.jpg",
            name: "Product 1",
            price: "123"
        },
        {
            id: 2,
            img: "https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-110924-060849.jpg",
            name: "Product 2",
            price: "123"
        },
        {
            id: 3,
            img: "https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-110924-060849.jpg ",
            name: "Product 3",
            price: "123"
        }
        // Add more products as needed
    ];

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const data = await ProductDetailServices(productId);
                setProductDetail(data);
            } catch (error) {
                setError("Failed to load product details.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const increaseQuantity = () => {
        if (quantity < productDetail.minimumOrderQuantity) {
            setQuantity(quantity + 1);
        }
    };
    const openReportPopup = () => {
        setReportPopupOpen(true);
    };

    const closeReportPopup = () => {
        setReportPopupOpen(false);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const toggleExchangeList = () => {
        setShowExchangeList(!showExchangeList);
    };

    const toggleProductSelection = (id) => {
        if (selectedProductIds.includes(id)) {
            setSelectedProductIds(selectedProductIds.filter((itemId) => itemId !== id)); // Deselect
        } else {
            setSelectedProductIds([...selectedProductIds, id]); // Select
        }
    };

    const confirmExchange = () => {
        const selectedProducts = data.filter((item) => selectedProductIds.includes(item.id));
        if (selectedProducts.length > 0) {
            const selectedProductNames = selectedProducts.map((item) => item.name).join(", ");
            alert(`You have selected: ${selectedProductNames}`);
        } else {
            alert("No products selected for exchange.");
        }
        setSelectedProductIds([]);
        setShowExchangeList(false);
    };
    const handleBuyNow = () => {
        setConfirmPopupOpen(true);
    };

    const confirmPurchase = () => {
        // Logic to handle the purchase can go here
        alert(`You have purchased ${productDetail.title} (Quantity: ${quantity})`);
        setConfirmPopupOpen(false);
    };
    const handleAddToCart = () => {
        const productToAdd = {
            id: productDetail.productId,
            title: productDetail.productName,
            img: productDetail.images[0].path,
            price: productDetail.price,
            quantity: quantity,
        };
    
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.userId : 'guest'; // Use 'guest' if no user is logged in
    
        const existingCart = JSON.parse(sessionStorage.getItem(`cart_${userId}`)) || [];
    
        const productIndex = existingCart.findIndex(item => item.id === productDetail.id);
    
        if (productIndex !== -1) {
            // If the product exists, update its quantity
            existingCart[productIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            existingCart.push(productToAdd);
        }
    
        // Save the updated cart to sessionStorage
        sessionStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
    
        // Show a success message
        alert("Added to cart successfully!");
    };
    


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            {productDetail ? (
                <div className="container mx-auto  mt-[50px]">
                    <div className="border flex p-2  border-[5px]h-auto">
                        <div className="w-2/5 flex  justify-center">
                            <div className="h-[350px] text-center ">
                                <img src={productDetail.images[0].path} className="object-contain h-full max-w-full" alt={productDetail.productName} />

                                {/* <div className="mt-4">
                                   <Carousel  slides={productDetail.images}/>
                                    </div> */}
                            </div>
                        </div>
                        <div className="w-3/5">
                            <div className="font-semibold text-[24px] flex items-center justify-between">{productDetail.productName} <div className="w-1/12 cursor-pointer mt-[4px]" onClick={(e) => {
                                e.preventDefault(); // Prevent default action
                                openReportPopup();
                            }}>
                                <MdOutlineReport />
                            </div></div>
                            <div className="flex items-center uppercase my-[8px]"><FaTags /> <div className="mx-4">{productDetail.category.title}</div></div>
                            <div className="bg-[#FAFAFA]">
                                <div className="p-4 text-red-500 ml-[25px] text-[25px] font-medium">đ {productDetail.price}</div>
                            </div>
                            <div className="flex my-5">
                                <div className="w-1/6 text-[#757575]">Vận chuyển</div>
                                <div className="w-5/6 flex flex-col justify-start my-[8px] ml-[10px]">
                                    <div className="text-[#757575] flex items-center"><AiOutlineSafety className="text-[24px] mr-[10px]" />Đơn hàng sẽ được giao bởi người bán để giam thiểu kinh phí sản phẩm</div>
                                    <div className=" text-[#757575] flex items-center my-[10px]"><TbFreeRights className="text-[24px] mr-[10px]" />Miễn phí vận chuyển</div>
                                    <div className="text-[#757575] flex items-center"> <MdOutlineLocalShipping className="text-[24px] mr-[10px]" /> Vận chuyển tới {user.address}</div>
                                </div>
                            </div>
                            <div className="flex my-7">
                                <div className="w-1/6 text-[#757575]">Số lượng</div>
                                <div className="w-5/6 flex items-center ml-[10px] ">
                                    <button onClick={decreaseQuantity} className="px-3 py-1 border hover:bg-gray-300 rounded-l">-</button>
                                    <div className="text-[#757575] mx-2">{quantity}</div>
                                    <button onClick={increaseQuantity} className="px-3 py-1 border hover:bg-gray-300 rounded-r">+</button>
                                    <div className="text-[#757575] ml-2">{productDetail.quantity} sản phẩm có sẵn</div>
                                </div>
                            </div>
                            <div className=" my-7">
                                {/* Conditionally render buttons based on product type */}
                                <div className="flex items-center">

                                    {productDetail.type === 'sell' || productDetail.type === 'both' ? (
                                        <>
                                            <button onClick={handleBuyNow} className="mr-10 border p-4 w-auto flex bg-primary text-white">
                                                <FaHandHolding className="mr-4 text-[18px]" />Mua ngay
                                            </button>
                                            <ConfirmPurchasePopup
                                                isOpen={isConfirmPopupOpen}
                                                onClose={() => setConfirmPopupOpen(false)}
                                                onConfirm={confirmPurchase}
                                            />
                                            <button
                                                className="border p-4 w-auto flex items-center bg-primary text-white"
                                                onClick={handleAddToCart} // Call the function when the button is clicked
                                            >
                                                <IoCartOutline className="mr-2 text-[18px]" />
                                                Thêm vào giỏ hàng
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                                {productDetail.type === 'both' ? (
                                    <div className="my-2">
                                        <div className="my-3">OR</div>

                                    </div>
                                ) : null}

                                {productDetail.type === 'exchange' || productDetail.type === 'both' ? (
                                    <>
                                        <button onClick={toggleExchangeList} className="border p-4 w-auto flex items-center my-7 bg-primary text-white">
                                            <PiHandshake className="mr-2 text-[18px]" /> Trao đổi ngay
                                        </button>
                                        {showExchangeList && (
                                            <div className="my-5 border rounded p-4">
                                                <div className="font-semibold text-lg mb-2">Chọn sản phẩm để trao đổi:</div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {data.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className={`border p-2 flex items-center cursor-pointer ${selectedProductIds.includes(item.id) ? 'bg-gray-200' : ''}`}
                                                            onClick={() => toggleProductSelection(item.id)}
                                                        >
                                                            <img src={item.img} alt={item.name} className="w-12 h-12 object-cover " />
                                                            <div className="ml-2">{item.name}-</div>
                                                            <div className="text-red-500">đ{item.price}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button onClick={confirmExchange} className="mt-4 border p-3 bg-primary text-white">Xác nhận</button>
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </div>


                      
                        </div>
                    </div>
                    <div className="my-10">
                        <div className="text-[26px]  p-3 font-semibold bg-[#FAFAFA]">Mô tả sản phẩm</div>
                        <div className="my-4">{productDetail.description}</div>

                    </div>
                    <div className="my-10 flex ">
                        <div className="w-2/3">
                            <div className="text-[26px]  p-3 font-semibold bg-[#FAFAFA]">Đánh giá</div>
                            <div className="my-[25px]">
                                <FeedBack reviews={productDetail.feedBacks} />

                            </div>

                        </div>
                        <div className="w-1/3">
                            <div className="flex ml-[30px] mr-[50px] my-[20px] space-x-2 items-center ">
                                <Link to={`/shop/${productDetail.user.userId}`}>
                                    <img
                                        className="w-[100px] h-[100px] rounded-full object-cover w-2/5 cursor-pointer"
                                        src={productDetail.user.profilePicture}
                                        alt="Profile"
                                    />
                                </Link>
                                <div>
                                    <strong className="text-base font-[700px] text-primary">{productDetail.user.userName}</strong>
                                    <div className="flex mt-2">
                                        <button className="flex items-center border p-2 mr-2">
                                            <CiChat1 className="mr-1" />
                                            <div className="text-[12px]">Chat ngay</div>
                                        </button>
                                        <button className="flex items-center border p-2">
                                            <CiShop className="mr-1" />
                                            <div className="text-[12px]">Xem shop</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div>Product not found</div>
            )}
            <ReportPopup isOpen={isReportPopupOpen} onClose={closeReportPopup} />
        </>
    );



};
