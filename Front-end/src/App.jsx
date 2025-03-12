import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cars from "./pages/Cars";
import Services from "./pages/Services";
import SellCars from "./pages/SellCars";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import { Upload } from "lucide-react";
import UploadImage from "./pages/UploadImage";
import AddCars from "./pages/AddCars";
import ViewAllCars from "./pages/ViewAllCars";
import ForgotPassword from "./pages/ForgotPassword";
import AdminNavbar from "./components/AdminNavbar";
import BuyersAppoinment from "./pages/BuyersAppoinment";
import SellersAppoinment from "./pages/SellersAppoinment";
import CarPage from "./pages/CarPage";
import AdminHome from "./pages/AdminHome";
import OurCars from "./pages/OurCars";




const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/sellcars" element={<SellCars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/uploadimage" element={<UploadImage />} />
          <Route path="/adminnavbar" element={<AdminNavbar />} />
          <Route path="/addcars" element={<AddCars />} />
          <Route path="/viewallcars" element={<ViewAllCars/>} />
          <Route path="/buyersappoinment" element={<BuyersAppoinment />} />
          <Route path="/sellersappoinment" element={<SellersAppoinment />} />
          <Route path="/carpage" element={<CarPage />} />
          
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
};

export default App;
