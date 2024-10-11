import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const AccountBanner = ({ images }) => {
  // Define the responsive settings for different screen sizes
  console.log(images)
  const responsive = {
    desktop: {
      breakpoint: { max: 2400, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
  
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={false} 
    //   infinite={true}
      autoPlay={true} // Autoplay is enabled
      autoPlaySpeed={1000} // Speed of autoplay
 
    //   customTransition="all .5"
      transitionDuration={500}
    //   containerClass="carousel-container"
    //   removeArrowOnDeviceType={["tablet", "mobile"]}
    //   dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-20-px"
    >
      {/* Map over images to display them in carousel */}
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.path} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
        </div>
      ))}
    </Carousel>
  );
};
