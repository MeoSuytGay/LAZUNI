import { useState, useEffect } from "react";
import { CategoriesServices } from "../../services/CategoriesServices";
import { AddCategoryServices } from "../../services/AdminCategoryServices"; // Import AddCategoryServices
import { DeleteCategoryServices } from "../../services/AdminCategoryServices"; // Import DeleteCategoryServices

export const ManagementCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ title: "", image: "" });
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingImage, setEditingImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // To handle errors

    // Fetch categories data on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await CategoriesServices();
            setCategories(fetchedCategories || []);
        };

        fetchCategories();
    }, []);

    // Handle adding a new category
    const handleAddCategory = async () => {
        if (newCategory.title) {
            const formData = new FormData();
            formData.append("title", newCategory.title);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            try {
                // Call AddCategoryServices API
                const addedCategory = await AddCategoryServices(formData);

                if (addedCategory) {
                    // Add new category to state
                    setCategories([...categories, addedCategory]);
                    setNewCategory({ title: "", image: "" });
                    setImageFile(null); // Reset image file
                    setErrorMessage(null); // Clear any previous error message
                }
            } catch (error) {
                setErrorMessage("Failed to add category. Please try again."); // Handle error
            }
        }
    };

    // Handle deleting a category
    const handleDeleteCategory = async (categoryId) => {
        try {
            // Call DeleteCategoryServices API
            await DeleteCategoryServices(categoryId);
            setCategories(categories.filter((cat) => cat.id !== categoryId)); // Remove category from state
        } catch (error) {
            setErrorMessage("Failed to delete category. Please try again."); // Handle error
        }
    };

    // Handle editing a category
    const handleEditCategory = (category) => {
        setEditingCategory(category.title);
        setEditingImage(category.image);
        setShowModal(true); // Show modal when editing starts
    };

    // Handle updating a category
    const handleUpdateCategory = () => {
        if (editingCategory) {
            const updatedCategories = categories.map((cat) =>
                cat.title === editingCategory
                    ? { ...cat, title: editingCategory, image: imageFile ? URL.createObjectURL(imageFile) : editingImage }
                    : cat
            );
            setCategories(updatedCategories);
            setEditingCategory(null);
            setEditingImage("");
            setImageFile(null); // Reset image file after update
            setShowModal(false); // Close modal after update
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

            {/* Display category list */}
            <div className="grid grid-cols-7 gap-3">
                {categories.map((category) => (
                    <div
                        key={category.title}
                        className="border rounded-lg p-2 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
                    >
                        <img
                            src={category.image}
                            alt={category.title}
                            className="mb-4 w-24 h-24 object-cover rounded-full"
                        />
                        <h3 className="text-lg h-[50px] font-semibold mb-2 line-clamp-2 overflow-hidden text-ellipsis">
                            {category.title}
                        </h3>

                        <div className="flex mt-2 space-x-2">
                            <button
                                onClick={() => handleEditCategory(category)}
                                className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 active:bg-blue-700 transition-all"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCategory(category.categoryId)} // Send categoryId
                                className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600 focus:ring-4 focus:ring-red-300 active:bg-red-700 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add new category form */}
            <div className="flex items-center space-x-4 mt-6">
                <div>
                    <h3 className="text-lg font-bold mb-2">Add New Category</h3>
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.title}
                        onChange={(e) =>
                            setNewCategory({ ...newCategory, title: e.target.value })
                        }
                        className="border p-2 text-sm mr-2 rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 text-sm rounded"
                    />
                    <button
                        onClick={handleAddCategory}
                        className="bg-green-500 text-white mt-2 px-4 py-2 text-sm rounded hover:bg-green-600 focus:ring-4 focus:ring-green-300 active:bg-green-700 transition-all"
                    >
                        Add Category
                    </button>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </div>
            </div>

            {/* Edit Category Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Edit Category</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Category Name</label>
                            <input
                                type="text"
                                value={editingCategory}
                                onChange={(e) => setEditingCategory(e.target.value)}
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Category Image</label>
                            <img
                                src={editingImage}
                                alt={editingCategory}
                                className="mb-2 w-24 h-24 object-cover rounded-full"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateCategory}
                                className="bg-yellow-500 text-white px-4 py-2 text-sm rounded hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 active:bg-yellow-700 transition-all"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
