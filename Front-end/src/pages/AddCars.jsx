"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUpload } from "react-icons/fa"
import AdminNavbar from "../components/AdminNavbar"

const AddCars = () => {
  const [carDetails, setCarDetails] = useState({
    name: "",
    price: "",
    makeYear: "",
    registrationYear: "",
    fuelType: "",
    kmDriven: "",
    transmission: "",
    owner: "",
    insuranceValidity: "",
    insuranceType: "",
    rto: "",
    location: "",
    img: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCarDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      setError("Please select an image.")
      return
    }

    setLoading(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = async () => {
      const base64String = reader.result.split(",")[1]
      const carData = { ...carDetails, img: base64String }

      try {
        const response = await fetch("http://localhost:8080/car/addCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carData),
        })

        if (response.ok) {
          setCarDetails(Object.fromEntries(Object.keys(carDetails).map((key) => [key, ""])))
          setSelectedFile(null)
          setPreview(null)
          setSuccess(true)
          setTimeout(() => setSuccess(false), 3000)
        } else {
          setError("Failed to upload car. Please try again.")
        }
      } catch (error) {
        console.error("Error uploading car:", error)
        setError("An error occurred while adding the car. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    reader.readAsDataURL(selectedFile)
  }

  return (
    <div>
      <AdminNavbar />
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 pb-10">
        <h1 className="text-3xl font-bold text-secondary mb-6">Add New Car</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {success && <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">Car added successfully!</div>}

          {error && <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="name">
                  Car Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={carDetails.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Toyota Camry"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={carDetails.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 25000"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="makeYear">
                  Make Year
                </label>
                <input
                  type="text"
                  id="makeYear"
                  name="makeYear"
                  value={carDetails.makeYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 2022"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="registrationYear">
                  Registration Year
                </label>
                <input
                  type="text"
                  id="registrationYear"
                  name="registrationYear"
                  value={carDetails.registrationYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 2022"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="fuelType">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={carDetails.fuelType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="kmDriven">
                  KM Driven
                </label>
                <input
                  type="number"
                  id="kmDriven"
                  name="kmDriven"
                  value={carDetails.kmDriven}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 15000"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="transmission">
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={carDetails.transmission}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="owner">
                  Owner
                </label>
                <select
                  id="owner"
                  name="owner"
                  value={carDetails.owner}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select owner</option>
                  <option value="1st Owner">1st Owner</option>
                  <option value="2nd Owner">2nd Owner</option>
                  <option value="3rd Owner">3rd Owner</option>
                  <option value="4+ Owner">4+ Owner</option>
                </select>
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="insuranceValidity">
                  Insurance Validity
                </label>
                <input
                  type="text"
                  id="insuranceValidity"
                  name="insuranceValidity"
                  value={carDetails.insuranceValidity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 2025-12-31"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="insuranceType">
                  Insurance Type
                </label>
                <select
                  id="insuranceType"
                  name="insuranceType"
                  value={carDetails.insuranceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select insurance type</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Third Party">Third Party</option>
                  <option value="Zero Dep">Zero Dep</option>
                </select>
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="rto">
                  RTO
                </label>
                <input
                  type="text"
                  id="rto"
                  name="rto"
                  value={carDetails.rto}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. MH01"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary font-medium mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={carDetails.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Mumbai"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-secondary font-medium mb-2">Car Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input type="file" id="img" accept="image/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="img" className="cursor-pointer">
                  <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500">Click to upload image or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF (Max. 5MB)</p>
                </label>
              </div>

              {preview && (
                <div className="mt-4">
                  <p className="text-secondary font-medium mb-2">Selected Image:</p>
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full max-h-64 object-contain rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => {
                  setCarDetails(Object.fromEntries(Object.keys(carDetails).map((key) => [key, ""])))
                  setSelectedFile(null)
                  setPreview(null)
                }}
                className="px-6 py-2 border border-gray-300 rounded-md text-secondary font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "Adding Car..." : "Add Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddCars

