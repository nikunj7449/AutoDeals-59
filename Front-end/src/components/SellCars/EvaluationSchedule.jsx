import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Edit2 } from "lucide-react"

export default function EvaluationSchedule({ formData, onBack }) {
  const [address, setAddress] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const timeSlots = ["09:00 AM - 11:00 AM", "11:00 AM - 01:00 PM", "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM"]

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white">✓</span>
            </div>
            <div className="ml-2">Online Estimate</div>
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-2" />
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white">2</span>
            </div>
            <div className="ml-2">Car Evaluation</div>
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-2" />
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white">3</span>
            </div>
            <div className="ml-2">Instant Payment</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">
                  {formData.location}, {formData.year}, {formData.brand}
                </p>
                <p className="text-sm text-gray-600">{formData.kmDriven} KM</p>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="bg-purple-900 text-white p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <img src="/path-to-logo" alt="SellRight" className="h-6" />
              <span className="ml-2">by AutoDeals</span>
            </div>
            <div className="text-2xl font-bold">₹ 4,40,000 - ₹ 5,22,000</div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6">Schedule a free evaluation to get the exact price of your car.</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Add Your Address"
                  className="pl-10 w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <div className="grid grid-cols-4 gap-2">
                {["Tomorrow", "Sat", "Sun", "Mon"].map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 rounded-lg border text-center ${
                      selectedDate === day ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="text-sm font-medium">{day}</div>
                    <div className="text-xs text-gray-500">{index === 0 ? "Jan 25" : `Jan ${26 + index}`}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 rounded-lg border text-center ${
                      selectedTime === slot ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
              BOOK FREE EVALUATION
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

