import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios"


const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "email":email,
      "password":password
    }

    try {
      const response = await axios.post("http://localhost:8080/forgotPassword", data)
     
    
      if (response.data.success) { 
        alert("successfully Password Update!!")  
        navigate("/login") 
    
      } else {
        setError(response.data.message) 
      }
    
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred. Please try again.")
    }
    
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            AutoDeals
          </Link>
        </div>
      </div> */}
     

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">Forgote Your Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link to="/signup" className="font-medium text-blue-600  text-primary">
                create a new account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                 New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

           

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <div>
              <button
                type="submit"
                
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-primary rounded-md hover:bg-primary transition duration-200 ease-linear"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default ForgotPassword

