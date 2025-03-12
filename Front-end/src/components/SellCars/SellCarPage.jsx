import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BrandSelection from "./BrandSelection"
import LocationSelection from "./LocationSelection"
import YearSelection from "./YearSelection"
import EvaluationSchedule from "./EvaluationSchedule"

const steps = ["brand", "location", "year", "evaluation"]

export default function SellCarPage() {
  const [currentStep, setCurrentStep] = useState("brand")
  const [formData, setFormData] = useState({
    brand: "",
    location: "",
    year: "",
    model: "",
    variant: "",
    owner: "",
    kmDriven: "",
  })

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  return (
    <div className="container pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* <div className="text-center mb-12 mr-80">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Scrap your car <span className="text-cyan-400">for the best value</span>
          </h1>
          <p className="text-gray-300">Get an instant quote for your car</p>
        </div> */}
        <div>
        <h1 className=" font-bold text-4xl text-center">
        Sell your car <span className=" text-primary">for the best value</span>
        <p className="font-bold text-2xl">Get an instant quote for your car</p>
        </h1>
      </div>

        <AnimatePresence mode="wait">
          {currentStep === "brand" && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BrandSelection onSelect={(brand) => handleNext({ brand })} selectedBrand={formData.brand} />
            </motion.div>
          )}

          {currentStep === "location" && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LocationSelection
                onBack={handleBack}
                onSelect={(location) => handleNext({ location })}
                selectedLocation={formData.location}
              />
            </motion.div>
          )}

          {currentStep === "year" && (
            <motion.div
              key="year"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <YearSelection
                onBack={handleBack}
                onSelect={(year) => handleNext({ year })}
                selectedYear={formData.year}
              />
            </motion.div>
          )}

          {currentStep === "evaluation" && (
            <motion.div
              key="evaluation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EvaluationSchedule onBack={handleBack} formData={formData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

