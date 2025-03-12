import React, { useEffect, useState } from "react";
import CarsCard from "./CarsCard";

const OurCars = () => {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/car/allCars") // Updated URL to include "/api"
      .then((response) => response.json())
      .then((data) => setCarsData(data))
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

  return (
    <div className="container pt-24">
      <div>
        <h1 className="font-bold text-4xl text-center">
          Our <span className="text-primary">Cars</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {carsData.map((item) => {
          const imageUrl = base64ToBlobUrl(item.img); // Convert Base64 to Blob URL

          return (
            <div key={item.id}>
              <CarsCard
                id={item.id}
                img={imageUrl}// Use the converted URL
                imgpass={item.img} 
                name={item.name}
                price={item.price}
                makeYear={item.makeYear}
                registrationYear={item.registrationYear}
                fuelType={item.fuelType}
                kmDriven={item.kmDriven}
                transmission={item.transmission}
                owner={item.owner}
                insuranceValidity={item.insuranceValidity}
                insuranceType={item.insuranceType}
                rto={item.rto}
                location={item.location}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurCars;
