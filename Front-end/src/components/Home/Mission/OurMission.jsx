import React from "react";
import img from "../../../assets/img/mission.jpg";

const OurMission = () => {
  return (
    <div className="container my-10">
      <div>
        <h1 className=" font-bold text-4xl text-center">
          Our <span className=" text-primary">Mission</span>
        </h1>
      </div>

      <div className=" flex flex-col justify-center md:flex-row items-center gap-5 mt-8">
        {/* img section  */}
        <div className="w-full md:w-2/4">
          <img className=" rounded-lg" src={img} alt="img" />
        </div>

        {/* content section  */}
        <div className="w-full md:w-2/4 space-y-4">
          <h1 className=" font-bold text-primary text-xl lg:text-3xl">
            To create a community where every journey is extraordinary.
          </h1>
          <h2 className=" font-semibold text-lg lg:text-2xl">
            Empower individuals to achieve sustainable mobility solutions and
            inspire a positive impact on the environment.
          </h2>
          <p className=" text-sm lg:text-base">
            
          </p>
          <p className=" text-sm lg:text-base">
          We are dedicated to improving lives by offering innovative transportation solutions while focusing on environmental sustainability. Our efforts aim to provide seamless and eco-friendly mobility for a better future.


          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
