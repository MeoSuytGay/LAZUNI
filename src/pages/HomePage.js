

import { Categories } from "../components/Catagories/Categories";
import { Carousel } from "../components/Other/HomeBanner";

import { SuggestProduct } from "../components/SuggestProduct";

export const HomePage = () => {
   let slides = [
      "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      "https://wallpapercave.com/wp/wp3386769.jpg",
      "https://wallpaperaccess.com/full/809523.jpg",
      "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
    ];

  return (
    <>
     
      <div className="h-auto bg-[#F5F5F5] my-[20px] ">
      <div className="container mx-auto ">
       <div className="h-[30px]"></div>
         <Carousel  slides={slides} />
   
        
            <Categories />
      
          <SuggestProduct/>
      </div>
      </div>
     
     
    </>
  );
};