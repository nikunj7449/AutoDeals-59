import { motion } from "framer-motion"

const brands = [
  {
    id: "audi",
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    id: "honda",
    name: "Honda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg",
  },
  {
    id: "hyundai",
    name: "Hyundai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",
  },
  {
    id: "toyota",
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
  },
  {
    id: "ford",
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
  },
  {
    id: "mahindra",
    name: "Mahindra",
    logo: "https://upload.wikimedia.org/wikipedia/hi/f/f5/Mahindra_%26_Mahindra_Logo.svg.png",
  },
  {
    id: "tata",
    name: "Tata",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg",
  },
]

export default function BrandSelection({ onSelect, selectedBrand }) {
  return (
    <div className="bg-white rounded-lg p-6 "> 
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Select Brand</h2>
        <span className="text-gray-500">1/4</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <motion.button
            key={brand.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(brand.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedBrand === brand.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="h-12 flex items-center justify-center mb-2">
              <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-8 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-600">{brand.name}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

