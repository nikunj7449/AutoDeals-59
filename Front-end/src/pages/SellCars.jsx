import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SellCars = () => {
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    variant: "",
    year: "",
    owner: "",
    rtoLocation: "",
    kmDriven: "",
  });

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(carDetails)

    const userId = sessionStorage.getItem("UserID");

    if (!userId) {
      setError("Please log in to book an appointment.");
      return;
    }
   
    try {
      const response = await fetch("http://localhost:8080/addAppointment/seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...carDetails,
          userType: "seller",
          status: "Pending Inspection",
          userId: userId, // Replace with actual user ID from context or auth
          carId:"",
          date:new Date().toISOString().split('T')[0],
          time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if(data.success){
        setCarDetails({
          brand: "",
          rtoLocation: "",
          year: "",
          model: "",
          variant: "",
          owner: "",
          kmDriven: "",
        });
        setError("");
        setSuccessMsg("Appointment booked successfully!");
        setTimeout(() => {
          setSuccessMsg("");
        }, 4000);
      }else{
        setSuccessMsg("");
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 4000);

      }
      } else {
        const errorData = await response.json();
        setSuccessMsg("");
        setError(errorData.message || "Failed to book appointment.");
        setTimeout(() => {
          setError("");
        }, 4000);

      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      setSuccessMsg("")
      setError("An error occurred while booking the appointment.");
      setTimeout(() => {
        setError("");
      }, 4000);
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Quick <span className="text-primary">Sell</span>
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {Object.entries(carDetails).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              {successMsg && <div className="text-green-600 text-sm text-center">{successMsg}</div>}

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-primary rounded-md hover:bg-primary hover:text-white transition duration-200 ease-linear"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellCars;
