import React, { useState } from "react";
import axios from "axios";

const InputField = ({ label, name, value, placeholder, onChange }) => (
  <div className="flex flex-col text-sm space-y-1">
    <label className="text-primary font-medium text-sm">{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-1 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
    />
  </div>
);

const AdminCarsCard = ({
  id,
  img: initialImg,
  name: initialName,
  price: initialPrice,
  makeYear: initialMakeYear,
  registrationYear: initialRegistrationYear,
  fuelType: initialFuelType,
  kmDriven: initialKmDriven,
  transmission: initialTransmission,
  owner: initialOwner,
  insuranceValidity: initialInsuranceValidity,
  insuranceType: initialInsuranceType,
  rto: initialRto,
  location: initialLocation,
  onCarDeleted,  // New prop for refresh callback
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [carDetails, setCarDetails] = useState({
    id,
    img: initialImg,
    name: initialName,
    makeYear: initialMakeYear,
    registrationYear: initialRegistrationYear,
    fuelType: initialFuelType,
    kmDriven: initialKmDriven,
    transmission: initialTransmission,
    owner: initialOwner,
    insuranceValidity: initialInsuranceValidity,
    insuranceType: initialInsuranceType,
    rto: initialRto,
    location: initialLocation,
    price: initialPrice,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = ({ target: { name, value } }) => {
    setCarDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(
        `http://localhost:8080/car/updateCar/${id}`,
        { ...carDetails, img: null }
      );
      setMessage("✅ Car details updated successfully!");
      console.log("Update successful:", response.data);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("❌ Failed to update car details.");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    setLoading(true);
    setMessage("");

    try {
      await axios.delete(`http://localhost:8080/car/deleteCar/${id}`);
      setMessage("✅ Car deleted successfully!");
      console.log(`Car with ID ${id} deleted.`);
      setTimeout(() => setMessage(""), 2000);
      onCarDeleted();
    } catch (error) {
      console.error("Delete failed:", error);
      setMessage("❌ Failed to delete car.");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-secondary bg-slate-100 text-black rounded-xl mb-2 cursor-pointer hover:drop-shadow-2xl hover:scale-105 hover:duration-300 hover:border-primary hover:border-3">
      {showDetail ? (
        <div className="mt-4 px-4 py-2 grid grid-cols-2 gap-3">
          {[
            { label: "Car Name", name: "name" },
            { label: "Make Year", name: "makeYear" },
            { label: "Registration Year", name: "registrationYear" },
            { label: "Fuel Type", name: "fuelType" },
            { label: "Kilometers Driven", name: "kmDriven" },
            { label: "Transmission", name: "transmission" },
            { label: "Owner", name: "owner" },
            { label: "Insurance Validity", name: "insuranceValidity" },
            { label: "RTO", name: "rto" },
            { label: "Car Location", name: "location" },
            { label: "Price (in Lakh)", name: "price" },
          ].map(({ label, name }) => (
            <InputField
              key={name}
              label={label}
              name={name}
              value={carDetails[name]}
              placeholder={`Enter ${label}`}
              onChange={handleInputChange}
            />
          ))}
        </div>
      ) : (
        <>
          <img src={carDetails.img} alt="Car" className="w-full h-auto object-cover rounded-t-xl" />
          <h1 className="font-bold text-xl pl-5 text-primary">{carDetails.name}</h1>
          <p><strong className="pl-5 text-primary">Make Year:</strong> {carDetails.makeYear}</p>
          <p><strong className="pl-5 text-primary">Fuel Type:</strong> {carDetails.fuelType}</p>
          <p><strong className="pl-5 text-primary">Kilometers Driven:</strong> {carDetails.kmDriven}</p>
        </>
      )}

      <div className="flex justify-between items-center px-6 pb-2">
        {showDetail ? (
          <div className="flex space-x-3">
            <button
              className="bg-green-500 text-white text-base px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 ease-linear"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Car"}
            </button>
            <button
              className="bg-red-500 text-white text-base px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-linear"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Car"}
            </button>
          </div>
        ) : (
          <h3 className="font-semibold text-xl">₹{carDetails.price} Lakh</h3>
        )}
        <button
          className="bg-secondary text-white text-base px-3 py-1 rounded-md hover:bg-primary transition duration-200 ease-linear"
          onClick={() => setShowDetail((prev) => !prev)}
        >
          {showDetail ? "Hide Details" : "Edit Details"}
        </button>
      </div>

      {message && (
        <p className={`text-center font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminCarsCard;
