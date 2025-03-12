import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarsCard = ({ 
  id, 
  img,
  imgpass, 
  name, 
  price, 
  makeYear, 
  registrationYear, 
  fuelType, 
  kmDriven, 
  transmission, 
  owner, 
  insuranceValidity, 
  insuranceType, 
  rto, 
  location 
}) => {
  const car = { 
    id, 
    imgpass, 
    name, 
    price, 
    makeYear, 
    registrationYear, 
    fuelType, 
    kmDriven, 
    transmission, 
    owner, 
    insuranceValidity, 
    insuranceType, 
    rto, 
    location 
  };
  const navigate = useNavigate();
 
  const handleshowdetailbutton = () => {
    navigate("/carpage", { state: car })
  };
 

  


  return (
    <div
      className="border-2 border-secondary bg-slate-100 text-black rounded-xl mb-2 cursor-pointer hover:drop-shadow-2xl hover:scale-105 hover:duration-300 hover:border-primary hover:border-3"
      key={id}
     
    >
      <img src={img} alt="img" className="w-full h-auto object-cover rounded-t-xl"/>
      <h1 className=" font-bold text-xl pl-5 text-primary">{name}</h1>
      <p><strong className="  pl-5 pb-4 text-primary">Make Year:</strong> {makeYear}</p>
      <p><strong className="  pl-5 text-primary">Fuel Type:</strong> {fuelType}</p>
      <p><strong className="  pl-5 text-primary">Kilometers Driven:</strong> {kmDriven}</p>
    
     <div className=" flex justify-between px-6 pb-2">
        <h3 className=" font-semibold text-xl">₹{price} Lakh</h3>
        <button className=" bg-secondary text-white text-base md:text-lg px-2 md:px-3 py-1 rounded-md hover:bg-primary transition duration-200 ease-linear" onClick={handleshowdetailbutton}>
        Show Details
        </button>
      </div>
      
    </div>
  );
};

export default CarsCard;
