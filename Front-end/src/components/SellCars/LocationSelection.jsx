import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"]

export default function LocationSelection({ onSelect, onBack, selectedLocation }) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-semibold">Select RTO Location</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city) => (
          <motion.button
            key={city}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(city)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedLocation === city ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <p className="text-sm font-medium text-gray-800">{city}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

