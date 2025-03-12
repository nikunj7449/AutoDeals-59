"use client"

import { useEffect, useState } from "react";
import { FaSearch, FaCalendarAlt, FaCheck, FaTimes, FaEye, FaFilter, FaDollarSign } from "react-icons/fa"
import AdminNavbar from "../components/AdminNavbar"
import axios from "axios";




const SellersAppoinment = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerAmount, setOfferAmount] = useState("")
  const [appointments, setAppointments] = useState([]);
  
   const fetchappointment = () => {
      fetch("http://localhost:8080/getAppointment/seller") // Updated URL to include "/api"
      .then((response) => response.json())
      .then((data) => setAppointments(data.appointments))
      .catch((error) => console.error("Error fetching cars:", error));
    };
  
    useEffect(() => {
      fetchappointment();
    }, []);
  

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.carDetails.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || appointment.status === statusFilter

    // Simple date filter for demo purposes
    const matchesDate = dateFilter === "" || appointment.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setShowDetailsModal(true)
  }

  const handleStatusChange = (appointment, status) => {
    setSelectedAppointment(appointment)
    setNewStatus(status)
    setShowStatusModal(true)
  }

  

  const confirmStatusChange = () => {
    // Here you would typically send a request to your backend
    const extractNumber = (input) => parseInt(input.replace(/\D+/g, ""), 10);
    axios.patch(`http://localhost:8080/updateAppointmentStatus/${extractNumber(selectedAppointment.id)}?status="${newStatus}"`)
        .then(response => {
            console.log(response.data.message);
            setShowStatusModal(false);
            alert(`Appointment status updated to ${newStatus}!`);
            fetchappointment()
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`Appointment status not updated!`);
        });
    //console.log(`Changing status of appointment ${selectedAppointment.id} to ${newStatus}`)
    setShowStatusModal(false)
    // After successful update, you would update your state
    // For now, we'll just show an alert
    
  }

  const handleMakeOffer = (appointment) => {
    setSelectedAppointment(appointment)
    // setOfferAmount(appointment.price.replace(/[$,]/g, ""))
    setShowOfferModal(true)
  }

  const confirmOffer = () => {
    // Here you would typically send a request to your backend
    console.log(`Making offer of $${offerAmount} for appointment ${selectedAppointment.id}`)
    setShowOfferModal(false)
    // After successful update, you would update your state
    // For now, we'll just show an alert
    alert(`Offer of $${offerAmount} made successfully!`)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Pending Inspection":
        return "bg-yellow-100 text-yellow-800"
      case "Offer Made":
        return "bg-purple-100 text-purple-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
    <AdminNavbar />
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-secondary">Sellers Appointments</h1>
          <button className="mt-4 md:mt-0 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600">
            <FaCalendarAlt /> Schedule Appointment
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
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
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending Inspection">Pending Inspection</option>
                  <option value="Offer Made">Offer Made</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Dates</option>
                  <option value="2025-03-08">Mar 8, 2025</option>
                  <option value="2025-03-09">Mar 9, 2025</option>
                  <option value="2025-03-10">Mar 10, 2025</option>
                  <option value="2025-03-11">Mar 11, 2025</option>
                  <option value="2025-03-12">Mar 12, 2025</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offered Price
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary">{appointment.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary">{appointment.name}</div>
                      <div className="text-sm text-gray-500">{appointment.email}</div>
                      <div className="text-sm text-gray-500">{appointment.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary">{appointment.carDetails}</div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary">{appointment.price}</div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {(appointment.status === "Scheduled" || appointment.status === "Pending Inspection") && (
                          <button
                            onClick={() => handleMakeOffer(appointment)}
                            className="text-purple-600 hover:text-purple-800"
                            title="Make Offer"
                          >
                            <FaDollarSign />
                          </button>
                        )}
                        {appointment.status !== "Completed" && appointment.status !== "Cancelled" && (
                          <button
                            onClick={() => handleStatusChange(appointment, "Completed")}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as Completed"
                          >
                            <FaCheck />
                          </button>
                        )}
                        {appointment.status !== "Cancelled" && (
                          <button
                            onClick={() => handleStatusChange(appointment, "Cancelled")}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel Appointment"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredAppointments.length}</span> of{" "}
              <span className="font-medium">{appointments.length}</span> appointments
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
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary">Seller Appointment Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Seller Information</h3>
                <p className="mb-2">
                  <span className="font-medium">Name:</span> {selectedAppointment.name}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Email:</span> {selectedAppointment.email}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Phone:</span> {selectedAppointment.phone}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Appointment Details</h3>
                <p className="mb-2">
                  <span className="font-medium">ID:</span> {selectedAppointment.id}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Date:</span> {selectedAppointment.date}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Time:</span> {selectedAppointment.time}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedAppointment.status)}`}
                  >
                    {selectedAppointment.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">Car Information</h3>
              <p className="mb-2">
                <span className="font-medium">Details:</span> {selectedAppointment.carDetails}
              </p>
              <p className="mb-2">
                <span className="font-medium">Variant:</span> {selectedAppointment.variant}
              </p>
              <p className="mb-2">
                <span className="font-medium">RTOLocation:</span> {selectedAppointment.rtoLocation}
              </p>
              <p className="mb-2">
                <span className="font-medium">KMDriven:</span> {selectedAppointment.kmDriven}
              </p>
              <p className="mb-2">
                <span className="font-medium">Owner:</span> {selectedAppointment.owner}
              </p>
             
              {/* <p className="mb-2">
                <span className="font-medium">Offered Price:</span> {selectedAppointment.price}
              </p> */}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary"
              >
                Close
              </button>
              {/* {(selectedAppointment.status === "Scheduled" || selectedAppointment.status === "Pending Inspection") && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    handleMakeOffer(selectedAppointment)
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Make Offer
                </button>
              )} */}
              {selectedAppointment.status !== "Completed" && selectedAppointment.status !== "Cancelled" && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    handleStatusChange(selectedAppointment, "Completed")
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Mark as Completed
                </button>
              )}
              {selectedAppointment.status !== "Cancelled" && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    handleStatusChange(selectedAppointment, "Cancelled")
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Change Confirmation Modal */}
      {showStatusModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-secondary mb-4">Confirm Status Change</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to mark this appointment as <strong>{newStatus}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-2 text-white rounded-md ${
                  newStatus === "Completed" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Make Offer Modal
      {showOfferModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-secondary mb-4">Make an Offer</h2>
            <p className="text-gray-600 mb-4">Enter your offer amount for {selectedAppointment.carDetails}</p>
            <div className="mb-6">
              <label className="block text-secondary font-medium mb-2" htmlFor="offerAmount">
                Offer Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="offerAmount"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowOfferModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary"
              >
                Cancel
              </button>
              <button onClick={confirmOffer} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-600">
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
    </div>
  )
}

export default SellersAppoinment

