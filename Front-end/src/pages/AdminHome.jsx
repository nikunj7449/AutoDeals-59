import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero/Hero";
import Featured from "../components/Home/Featured/Featured";
import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";

const AdminHome = () => {
  return (
    <>
      <AdminNavbar />
      <Hero />
      <Featured />
      <Footer />
    </>
  );
};

export default AdminHome;
