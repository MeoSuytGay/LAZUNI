import React, { useEffect, useState } from 'react';
import { CategoriesServices } from '../../services/CategoriesServices'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';

export const Categories = () => {
    const [categories, setCategories] = useState([]); // State to hold category data

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await CategoriesServices(); // Call the service to fetch categories
            setCategories(data); // Update state with fetched data
        };

        fetchCategories(); // Fetch categories when the component mounts
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div className="my-[30px] bg-white">
            <div className="font-semibold text-[20px] my-[20px] ml-[20px]">Danh mục</div>
            <div className="grid grid-cols-8 gap-1"> {/* Adjusted grid settings here */}
                {categories.map(item => (
                    <div key={item.categoryId} className="border border-gray-100">
                        <Link to={`/products?category=${item.categoryId}`} className="flex flex-col items-center justify-center p-4 transition-transform transform hover:scale-105">
                            <div>
                                <img src={item.image} alt={item.title} className="w-[84px] h-[84px]" />
                            </div>
                            <div className="mt-2 text-center">{item.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
