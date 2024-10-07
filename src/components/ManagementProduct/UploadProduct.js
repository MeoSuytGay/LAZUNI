import { AiOutlinePicture } from "react-icons/ai";
import { useState } from "react";
import { InputField } from "../Authenfication/InputField";
import axios from "axios";
import { UploadProductServices } from "../../services/UploadProductServices";

export const UploadProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('fashion');
    const [condition, setCondition] = useState('new');
    const [transactionType, setTransactionType] = useState('sale'); 
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [error, setError] = useState('');

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) =>
            prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
        );
    };

    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length > 4) {
            setError("You can only upload up to 4 images.");
            return;
        } else {
            setError('');
        }

        setImages(files);
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            urls.push(URL.createObjectURL(files[i]));
        }
        setPreviewUrls(urls);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("condition", condition);
        formData.append("transactionType", transactionType);
        formData.append("quantity", quantity);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            const response = await UploadProductServices(formData);
            console.log("Product uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    };

    return (
        <>
            <div className="mx-auto flex p-4  ">
                <div className="mr-16 w-2/5">
                    <label className="block text-sm font-medium text-gray-700">
                        Picture of product
                    </label>
                    <div className="mt-5 flex justify-center p-4 bg-[#FAFAFA] border-2 border-dashed border-gray-300 rounded-md">
                        <div className="space-y-1 text-center p-6 justify-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex items-center justify-center"
                            >
                                <AiOutlinePicture className="mr-2 text-3xl" />
                                <span>Upload images</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <p className="text-xs text-gray-500">Upload up to 4 images</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {previewUrls.length > 0 && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Preview Picture
                            </label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                {previewUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Preview ${index}`}
                                        className="h-32 w-32 object-cover border"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col w-3/5">
                    <label className="block text-sm font-medium text-gray-700">
                        Product Category
                    </label>
                    <select
                        className="my-5 block w-full py-2 px-3 border border-primary bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="fashion">Fashion, Accessories - Clothes</option>
                    </select>

                    <div className="text-primary text-[32px] font-bold">Thông tin chi tiết</div>

                    <div className="my-5">
                        <div className="text-[18px] mb-2 text-gray-700">Tình trạng </div>
                        <div className="flex items-center">
                            <label className="mr-[20px] text-[14px]">
                                <input
                                    type="radio"
                                    name="condition"
                                    value="new"
                                    checked={condition === 'new'}
                                    onChange={() => setCondition('new')}
                                />
                                New
                            </label>
                            <label className="text-[14px]">
                                <input
                                    type="radio"
                                    name="condition"
                                    value="used"
                                    checked={condition === 'used'}
                                    onChange={() => setCondition('used')}
                                />
                                Used
                            </label>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="text-[18px] mb-2 text-gray-700">Transaction Type</div>
                        <div className="flex items-center">
                            <label className="mr-[20px] text-[14px]">
                                <input
                                    type="radio"
                                    name="transactionType"
                                    value="sale"
                                    checked={transactionType === 'sale'}
                                    onChange={() => setTransactionType('sale')}
                                />
                                For Sale
                            </label>
                            <label className="mr-[20px] text-[14px]">
                                <input
                                    type="radio"
                                    name="transactionType"
                                    value="exchange"
                                    checked={transactionType === 'exchange'}
                                    onChange={() => setTransactionType('exchange')}
                                />
                                For Exchange
                            </label>
                            <label className="text-[14px]">
                                <input
                                    type="radio"
                                    name="transactionType"
                                    value="both"
                                    checked={transactionType === 'both'}
                                    onChange={() => setTransactionType('both')}
                                />
                                Both Sale and Exchange
                            </label>
                        </div>
                    </div>

                    <div className="flex mb-4">
                        <div className="w-1/6 text-[#757575]">Số lượng</div>
                        <div className="w-5/6 flex items-center ml-[10px]">
                            <button
                                onClick={decreaseQuantity}
                                className="px-3 py-1 border hover:bg-gray-300 rounded-l"
                            >
                                -
                            </button>
                            <div className="text-[#757575] mx-2">{quantity}</div>
                            <button
                                onClick={increaseQuantity}
                                className="px-3 py-1 border hover:bg-gray-300 rounded-r"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <InputField
                        title="Product Name"
                        type="text"
                        id="name"
                        content="Iphone 16"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />

                    <InputField
                        title="Product Price"
                        type="text"
                        id="price"
                        content="250.000 đ"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />

                    <div className="text-primary text-[32px] font-bold">Mô tả chi tiết</div>

                    <div className="my-5">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            rows="5" // Specify the number of rows
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button
                        className="py-2 px-4 w-1/3 bg-gray-500 text-white rounded hover:bg-primary"
                        onClick={handleSubmit}
                    >
                        Upload Product
                    </button>
                </div>
            </div>
        </>
    );

};
