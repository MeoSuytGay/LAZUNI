import React, { useState, useEffect } from 'react';
import { deleteProductImgServices, ProductDetailServices, UpdateProductServices } from '../../services/ProductDetailServices';
import { CategoriesServices } from '../../services/CategoriesServices';
import { AiOutlinePicture, AiOutlineClose } from 'react-icons/ai';
import { InputField } from '../Authenfication/InputField';

export const EditProduct = ({ productId }) => {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [newImages, setNewImages] = useState([]); // Store new images
  const [oldImages, setOldImages] = useState([]); // Store old images

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const productResponse = await ProductDetailServices(productId);
        setProductData(productResponse);
       
        setCategory(productResponse.category?.categoryId || '');
        setCondition(productResponse.state || 'new');
        setTransactionType(productResponse.type || 'sell');
        
        setOldImages(productResponse.images || []);
        
        const categoryData = await CategoriesServices();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching product or categories:', error);
        setError('Failed to load product data.');
      }
    };

    if (productId) fetchProductAndCategories();
  }, [productId]);

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteProductImgServices(imageId);
      setOldImages((prev) => prev.filter((img) => img.imageId !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Failed to delete image.');
    }
  };

  const handleSubmit = async () => {
    console.log(category)
    try {
      const formData = new FormData();
      formData.append('categoryId', category);

      formData.append('state', condition);
      formData.append('type', transactionType);
      formData.append('quantity', productData.quantity);
      formData.append('productName', productData.productName);
      formData.append('price', productData.price);
      formData.append('description', productData.description);

      // Append only the new images
      newImages.forEach((file) => {
        formData.append("images", file);
      });
  
      await UpdateProductServices(productId, formData);
      console.log('Updated product details');
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...newPreviewUrls],
    }));
  };

  const decreaseQuantity = () => {
    setProductData((prev) => ({
      ...prev,
      quantity: Math.max(prev.quantity - 1, 1),
    }));
  };

  const increaseQuantity = () => {
    setProductData((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  if (!productData) return <p>Loading...</p>;

  return (
    <div className="mx-auto flex p-4">
      <div className="mr-16 w-2/5">
        <label className="block text-sm font-medium text-gray-700">Picture of product</label>
        <div className="mt-5 flex justify-center p-4 bg-[#FAFAFA] border-2 border-dashed border-gray-300 rounded-md">
          <div className="space-y-1 text-center p-6 justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
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
                onChange={handleImageUpload}
              />
            </label>
            <p className="text-xs text-gray-500">Upload up to 4 images</p>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Old Images</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {oldImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.path}
                  alt={`Preview ${index}`}
                  className="h-32 w-32 object-cover border"
                />
                <button
                  onClick={() => handleDeleteImage(image.imageId)}  
                  className="absolute top-[-10px] right-[-10px] text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                  aria-label="Delete image"
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">New Images</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {newImages.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`New Image ${index}`}
                className="h-32 w-32 object-cover border"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-3/5">
      <select
                        className="my-5 block w-full py-2 px-3 border border-primary bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                         <option value={productData.category.categoryId}>{productData.category.title}</option>
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.title}
                                </option>
                            ))
                        ) : (
                            <option value="">No categories available</option>
                        )}
                    </select>
     

        {/* Other fields */}
        <div className="my-5">
          <div className="text-[18px] mb-2 text-gray-700">Condition</div>
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
                value="sell"
                checked={transactionType === 'sell'}
                onChange={() => setTransactionType('sell')}
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
          <div className="w-1/6 text-[#757575]">Quantity</div>
          <div className="w-5/6 flex items-center ml-[10px]">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 border hover:bg-gray-300 rounded-l"
            >
              -
            </button>
            <div className="text-[#757575] mx-2">{productData.quantity}</div>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 border hover:bg-gray-300 rounded-r"
            >
              +
            </button>
          </div>
        </div>

        {/* Product details inputs */}
        <InputField
          title="Product Name"
          type="text"
          id="name"
          content="Product Name"
          value={productData.productName}
          onChange={(e) => setProductData({ ...productData, productName: e.target.value })}
        />

        <InputField
          title="Product Price"
          type="text"
          id="price"
          content="Product Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
        />

<div className="my-5">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows="5"
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          />
        </div>

        <button
          className="py-2 px-4 w-1/3 bg-gray-500 text-white rounded hover:bg-primary"
          onClick={handleSubmit}
        >
          Edit Product
        </button>
      </div>
    </div>
  );
};
