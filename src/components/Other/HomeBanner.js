import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import '../../assets/css/style.css'

export const Carousel = ({ slides }) => {
  console.log(slides); // You can remove this after testing

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Automatically moves to the next slide
    speed: 3000, // Duration of tran  sition between slides (1 second)
    autoplaySpeed: 8000, 
    cssEase: "linear",
    nextArrow: <BsFillArrowRightCircleFill className="text-white text-3xl" />, // Custom next arrow icon
    prevArrow: <BsFillArrowLeftCircleFill className="text-white text-3xl" />, // Custom previous arrow icon
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.productImageId} className="h-auto">
          <img 
            src={slide.path} 
            className="object-cover w-full h-[450px ]" // Ensuring the image fills the available space
            alt={`Slide ${slide.productImageId}`} 
          />
        </div>
      ))}
    </Slider>
  );
};
