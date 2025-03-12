"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaGasPump, FaTachometerAlt, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaCog } from "react-icons/fa"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom";

const CarPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    variant: "",
    year: "",
    owner: "",
    rtoLocation: "",
    kmDriven: "",
  });


  const location = useLocation();
  const car = location.state; // Access passed object
  

  // // Mock car data
  // const mockCars = [
  //   {
  //     id: "1",
  //     name: "Honda City",
  //     location: "Mumbai, Maharashtra",
  //     price: "850000",
  //     makeYear: "2019",
  //     registrationYear: "2019",
  //     fuelType: "Petrol",
  //     kmDriven: "45000",
  //     transmission: "Automatic",
  //     owner: "1st Owner",
  //     insuranceValidity: "Dec 2025",
  //     insuranceType: "Comprehensive",
  //     rto: "MH-02",
  //     img: null // You can add a base64 image here if needed
  //   },
  //   {
  //     id: "2",
  //     name: "Maruti Swift",
  //     location: "Delhi, NCR",
  //     price: "650000",
  //     makeYear: "2020",
  //     registrationYear: "2020",
  //     fuelType: "Petrol",
  //     kmDriven: "30000",
  //     transmission: "Manual",
  //     owner: "1st Owner",
  //     insuranceValidity: "Nov 2025",
  //     insuranceType: "Comprehensive",
  //     rto: "DL-01",
  //     img: null
  //   },
  //   {
  //     id: "3",
  //     name: "Hyundai Creta",
  //     location: "Bangalore, Karnataka",
  //     price: "1250000",
  //     makeYear: "2021",
  //     registrationYear: "2021",
  //     fuelType: "Diesel",
  //     kmDriven: "25000",
  //     transmission: "Automatic",
  //     owner: "1st Owner",
  //     insuranceValidity: "Oct 2026",
  //     insuranceType: "Comprehensive",
  //     rto: "KA-01",
  //     img: null
  //   }
  // ];

  // useEffect(() => {
  //   // Use mock data instead of backend
  //   const fetchMockCarDetails = () => {
  //     // Use a default car if ID isn't provided
  //     const defaultCar = mockCars[0];
      
  //     setTimeout(() => {
  //       if (!id) {
  //         // If no ID is provided in URL, show the first car
  //         setCar(defaultCar);
  //       } else {
  //         // Try to find the car with matching ID
  //         const foundCar = mockCars.find(car => car.id === id);
          
  //         if (foundCar) {
  //           setCar(foundCar);
  //         } else {
  //           // For testing - if no car is found, show the first one instead of error
  //           // Remove this line and uncomment the setError line to show error instead
  //           setCar(defaultCar);
            
  //           // setError("Car not found");
  //         }
  //       }
  //       setLoading(false);
  //     }, 800); // Simulate loading delay
  //   };

  //   fetchMockCarDetails();
  // }, [id])

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

const handleBook =  async () => {
  
  const userId = sessionStorage.getItem("UserID");

  if (!userId) {
    alert("Please login for book an appointment.");
    return;
  }
 
  try {
    const response = await fetch("http://localhost:8080/addAppointment/buyer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...carDetails,
        userType: "buyer",
        status: "Scheduled",
        userId: userId, // Replace with actual user ID from context or auth
        carId:car.id,
        date:new Date().toISOString().split('T')[0],
        time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      if(data.success){
      alert("Appointment booked successfully!");
     
    }else{
     alert("You Already Book One Appointment for Buy")
    }
    } else {
      const errorData = await response.json();
      
      alert(errorData.message || "Failed to book appointment.");

    }
  } catch (err) {
    console.error("Error booking appointment:", err);

    alert("An error occurred while booking the appointment.");
   
  }
};

  
  return (
    <div>
    <Navbar />
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 pb-10">
        <button
          onClick={() => navigate("/cars")}
          className="flex items-center gap-2 text-primary mb-6 hover:underline"
        >
          <FaArrowLeft /> Back to Cars
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={base64ToBlobUrl(car.imgpass)} // Convert Base64 to Blob URL
                alt={car.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-secondary mb-2">{car.name}</h1>
              <div className="flex items-center text-gray-500 mb-4">
                <FaMapMarkerAlt className="mr-1" /> {car.location}
              </div>
              <div className="text-3xl font-bold text-primary mb-6">₹{car.price} Lakh</div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Make Year</p>
                    <p className="font-medium">{car.makeYear}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Registration Year</p>
                    <p className="font-medium">{car.registrationYear}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaGasPump className="text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaTachometerAlt className="text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">KM Driven</p>
                    <p className="font-medium">{car.kmDriven} km</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCog className="text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUser className="text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Owner</p>
                    <p className="font-medium">{car.owner}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-orange-600 transition duration-200" onClick={handleBook}>
                Book Test Drive
              </button>
            </div>
          </div>

          <div className="p-6 border-t">
            <h2 className="text-xl font-bold text-secondary mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Insurance Validity</p>
                <p className="font-medium">{car.insuranceValidity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Insurance Type</p>
                <p className="font-medium">{car.insuranceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">RTO</p>
                <p className="font-medium">{car.rto}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CarPage