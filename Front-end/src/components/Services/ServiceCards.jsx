import React from "react";

const ServiceCards = ({ icon, title }) => {
  return (
    <div className="text-center p-8 space-y-4 bg-slate-100 border-2 border-secondary hover:bg-secondary hover:text-white transition duration-300 ease-in-out rounded-md cursor-pointer">
      {icon}
      <h1 className=" text-primary text-3xl font-bold">{title}</h1>
      <p className=" text-sm">
      We offer a comprehensive range of services to keep your vehicle in top condition, including tire and wheel replacements, exhaust system repairs, regular car maintenance, brake repairs, body services, and engine servicing. Our expert team is dedicated to providing high-quality solutions for all your automotive needs, ensuring safety, reliability, and optimal performance for your vehicle.


      </p>
    </div>
  );
};

export default ServiceCards;
