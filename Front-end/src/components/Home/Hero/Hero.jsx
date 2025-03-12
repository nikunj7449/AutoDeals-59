import React from "react";
import img from "../../../assets/img/hero.jpg";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate=useNavigate();
  const handleButton1 = () =>{
    navigate('/sellcars');
  };
  const handleButton2 = () =>{
    navigate('/cars');
  };
 
  return (
    <div className=" bg-black text-white">
      <div className=" h-screen container flex flex-col justify-center md:flex-row items-center">
        {/* content section  */}
        <div className=" w-full md:w-2/4 space-y-5 mt-10">
          <h1 className=" text-4xl lg:text-6xl font-bold leading-tight">
          Find Your Dream Car or Sell with Ease
          </h1>
          <p className=" text-lg lg:text-2xl font-medium">
          Over 1000+ Certified Cars Waiting for You
          </p>
          <p className=" text-sm lg:text-base">
          Explore a wide variety of vehicles, from affordable choices to premium models. Whether you're buying or selling, AutoDeals makes it effortless and transparent.
          </p>

          <div className="flex gap-8">
            <button className=" bg-primary py-1 px-4 rounded-md hover:scale-95 transition duration-150 ease-linear" onClick={handleButton1}>
            Quick Sell
            </button>
            <button className="border-2 border-primary py-1 px-4 rounded-md hover:bg-primary transition duration-200 ease-linear" onClick={handleButton2}>
            Explore Cars
            </button>
          </div>
        </div>

        {/* img section  */}
        <div className=" w-full md:w-2/4 mt-4">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
