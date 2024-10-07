export const Catagories = () => {
    const catagory = [
        { id: 1, title: "Thời trang nam", imgSrc: "path_to_image_1.jpg" },
        { id: 2, title: "Thời trang nữ", imgSrc: "path_to_image_2.jpg" },
        { id: 3, title: "Điện thoại", imgSrc: "path_to_image_3.jpg" },
        { id: 4, title: "Giày dép", imgSrc: "path_to_image_4.jpg" },
        { id: 6, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
        { id: 7, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
        { id: 8, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
        { id: 9, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
        { id: 10, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
        { id: 11, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
        { id: 12, title: "Phụ kiện", imgSrc: "path_to_image_5.jpg" },
    ];

    return (
        <>
            <div className="my-[30px] bg-white">
                <div className="font-semibold text-[20px] my-[20px] ml-[20px]">Danh mục</div>
                <div className="grid grid-cols-8 border border-gray-100">
                    {catagory.map(item => (
                        <div key={item.id} className="border border-gray-100">
                            <a className="flex flex-col items-center justify-center p-4 transition-transform transform hover:scale-105 " href="#">
                                <div>
                                    <img src={item.imgSrc} alt={item.title} className="w-[84px] h-[84px]" />
                                </div>
                                <div className="mt-2 text-center">{item.title}</div>
                            </a>
                        </div>
                    ))}
                </div>  
            </div>
        </>
    );
};
