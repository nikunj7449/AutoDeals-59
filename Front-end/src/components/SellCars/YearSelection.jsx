import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

export default function YearSelection({ onSelect, onBack, selectedYear }) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-semibold">Select Year</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(year.toString())}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedYear === year.toString() ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <p className="text-sm font-medium text-gray-800">{year}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

