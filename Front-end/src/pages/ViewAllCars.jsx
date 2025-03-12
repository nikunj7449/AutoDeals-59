import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import AdminCarsCard from "../components/Cars/AdminCarsCard";

const ViewAllCars = () => {
  const [carsData, setCarsData] = useState([]);

  const fetchCars = () => {
    fetch("http://localhost:8080/car/allCars")
      .then((response) => response.json())
      .then((data) => setCarsData(data))
      .catch((error) => console.error("Error fetching cars:", error));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const base64ToBlobUrl = (base64String) => {
    if (!base64String) return "";
    const byteCharacters = atob(base64String);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return URL.createObjectURL(new Blob([byteArray], { type: "image/jpeg" }));
  };

  return (
    <>
      <AdminNavbar />
      <div className="container pt-24">
        <h1 className="font-bold text-4xl text-center">
          Our <span className="text-primary">Cars</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {carsData.map((item) => (
            <div key={item.id}>
              <AdminCarsCard
                id={item.id}
                img={base64ToBlobUrl(item.img)}
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
                onCarDeleted={fetchCars}  // Pass the refresh function
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewAllCars;
