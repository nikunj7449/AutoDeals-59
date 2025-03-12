"use client"

import { useState } from "react"
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus, FaFilter, FaSortAmountDown } from "react-icons/fa"

const cars = [
  {
    id: "CAR001",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: "$28,500",
    status: "Available",
    location: "New York",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "CAR002",
    brand: "Honda",
    model: "Accord",
    year: 2021,
    price: "$26,800",
    status: "Available",
    location: "Los Angeles",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "CAR003",
    brand: "Chevrolet",
    model: "Corvette",
    year: 2023,
    price: "$65,900",
    status: "Reserved",
    location: "Miami",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "CAR004",
    brand: "Volkswagen",
    model: "Golf",
    year: 2022,
    price: "$24,300",
    status: "Available",
    location: "Chicago",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "CAR005",
    brand: "Nissan",
    model: "Rogue",
    year: 2021,
    price: "$27,200",
    status: "Sold",
    location: "Dallas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "CAR006",
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    price: "$42,500",
    status: "Available",
    location: "Seattle",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "CAR007",
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: "$62,300",
    status: "Available",
    location: "Boston",
    image: "https://via.placeholder.com/150",
  },
]

const OurCars = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [selectedCar, setSelectedCar] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || car.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "newest") {
      return b.year - a.year
    } else if (sortBy === "oldest") {
      return a.year - b.year
    } else if (sortBy === "price-high") {
      return Number.parseFloat(b.price.replace(/[$,]/g, "")) - Number.parseFloat(a.price.replace(/[$,]/g, ""))
    } else if (sortBy === "price-low") {
      return Number.parseFloat(a.price.replace(/[$,]/g, "")) - Number.parseFloat(b.price.replace(/[$,]/g, ""))
    }
    return 0
  })

  const handleViewDetails = (car) => {
    setSelectedCar(car)
    setShowModal(true)
  }

  const handleDeleteClick = (car) => {
    setSelectedCar(car)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log("Deleting car:", selectedCar.id)
    setShowDeleteModal(false)
    // After successful deletion, you would update your state
    // For now, we'll just show an alert
    alert(`Car ${selectedCar.id} deleted successfully!`)
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-secondary">Our Cars</h1>
          <button className="mt-4 md:mt-0 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600">
            <FaPlus /> Add New Car
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="relative">
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sort By</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="price-low">Price (Low to High)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={car.image || "/placeholder.svg"}
                            alt={car.model}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-secondary">{car.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary">
                        {car.brand} {car.model}
                      </div>
                      <div className="text-sm text-gray-500">{car.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary">{car.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          car.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : car.status === "Reserved"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleViewDetails(car)} className="text-blue-600 hover:text-blue-800">
                          <FaEye />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteClick(car)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{sortedCars.length}</span> of{" "}
              <span className="font-medium">{cars.length}</span> cars
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary disabled:opacity-50"
                disabled={true}
              >
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-secondary">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary">Car Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedCar.image || "/placeholder.svg"}
                  alt={`${selectedCar.brand} ${selectedCar.model}`}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                </h3>
                <p className="text-gray-500 mb-4">ID: {selectedCar.id}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium text-secondary">{selectedCar.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedCar.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : selectedCar.status === "Reserved"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedCar.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-secondary">{selectedCar.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-600">Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-secondary mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedCar.brand} {selectedCar.model} ({selectedCar.year})? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OurCars

