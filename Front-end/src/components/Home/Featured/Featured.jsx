import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeatureCard from "./FeatureCard";

const Featured = () => {
   const [carsData, setCarsData] = useState([]);
   useEffect(() => {
      fetch("http://localhost:8080/car/allCars") 
        .then((response) => response.json())
        .then((data) => setCarsData(data.slice(0, 5)))
        .catch((error) => console.error("Error fetching cars:", error));
    }, []);
    
  
    // Function to convert Base64 to a Blob URL
    const base64ToBlobUrl = (base64String) => {
      if (!base64String) return ""; // If empty, return nothing
  
      const byteCharacters = atob(base64String); // Decode Base64
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Change type as needed
      return URL.createObjectURL(blob);
    };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className=" container mt-14">
      <h1 className=" font-bold text-4xl text-center">
        Featured <span className=" text-primary">Cars</span>
      </h1>

      <p className=" text-center">
      Explore the most popular and trending cars, handpicked just for you!
      </p>

      <div className=" mt-8">
        <Slider {...settings}>
          
          {carsData.map((item) => {
          const imageUrl = base64ToBlobUrl(item.img); // Convert Base64 to Blob URL

          return (
            <div key={item.id}>
              <FeatureCard
              key={item.id}
              img={imageUrl}
              name={item.name}
              price={item.price}
            />
            </div>
          );
        })}
        </Slider>
      </div>
    </div>
  );
};

export default Featured;
