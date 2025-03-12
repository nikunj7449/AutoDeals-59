import React from "react";

const WhyUsCard = ({ icon, title }) => {
  return (
    <div className="text-center p-8 space-y-4 bg-slate-100 hover:bg-secondary hover:text-white transition duration-200 ease-in-out rounded-md cursor-pointer">
      {icon}
      <h1 className=" text-primary text-3xl font-bold">{title}</h1>
      <p className=" text-sm">
      Experience unparalleled reliability with a wide selection of vehicles and exceptional customer service. We offer flexible financing options, a proven track record of satisfied customers, and a fast, easy booking process to make your car-buying experience seamless and hassle-free. Your satisfaction is our top priority!
      </p>
    </div>
  );
};

export default WhyUsCard;
