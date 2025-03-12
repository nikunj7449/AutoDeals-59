import React, { useState } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { Link,NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [username, setUsername] = useState(sessionStorage.getItem("UserFirstName"));
  const navigate = useNavigate();
  const { loginWithRedirect,logout,user, isAuthenticated} = useAuth0();
  

  const handleChange = () => {
    setMenu(!menu);
  };
  const btnlogout = () => {
    sessionStorage.clear();
    setUsername(null);
  
  }
  return (
    <header className=" fixed w-full z-10 bg-secondary text-white py-4">
      {/* desktop navigation section  */}
      <nav className=" container flex justify-between items-center">
        <div className=" flex items-center gap-2">
          <GiSteeringWheel size={35} className=" text-primary animate-spin-once" />
          {/* <video
            src="src\assets\video\logo.mp4"
            autoPlay
            muted
            className="w-[35px] h-[35px] object-cover rounded-full"
          /> */}
          <Link to="/" className=" font-bold text-2xl">
            AutoDeals
          </Link>
          {
          //   isAuthenticated &&
          // <span className=" font-bold text-2xl">
          //   {/* , Hii {user.nickname} */}
            
          // </span>
          }
          {
            username &&
          <span className=" font-bold text-2xl">
            , Hii {username}
            
          </span>
          } 
          
        </div>
        

        <div className=" hidden md:flex items-center gap-8 font-medium text-xl">
          <NavLink
            to="/"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          
          >
            About Us
          </NavLink>
          <NavLink
            to="/SellCars"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Quick Sell
          </NavLink>
          <NavLink
            to="/cars"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Our Cars
          </NavLink>
          <NavLink
            to="/services"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Services
          </NavLink>
          
          {/* {
            isAuthenticated ?
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Log Out
            </button>
            :
            <button onClick={() => loginWithRedirect()} className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Sign In
            </button> 
          } */}
          {
            username ?
            <button onClick={btnlogout} className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Log Out
            </button>
            :
            <button onClick={() => navigate("/login")} className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Sign In
            </button>
          }
          
        </div>

        <div className=" md:hidden flex items-center">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleChange} />
          ) : (
            <RiMenuUnfoldFill size={25} onClick={handleChange} />
          )}
        </div>
      </nav>

      {/* responsive section  */}
      <div
        className={`${menu ? "translate-x-0" : "-translate-x-full"}
       md:hidden flex flex-col absolute bg-secondary text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-3/4 h-fit rounded-br-xl transition-transform duration-300`}
      >
        <NavLink
            to="/"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          
          >
            About Us
          </NavLink>
          <NavLink
            to="/SellCars"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Quick Sell
          </NavLink>
          <NavLink
            to="/cars"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Our Cars
          </NavLink>
          <NavLink
            to="/services"
            className={({isActive}) => ` ${isActive ? "text-primary":"hover:text-primary"} transition duration-200 ease-linear `}
          >
            Services
          </NavLink>
          {
            isAuthenticated ?
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Log Out
            </button>
            :
            <button onClick={() => loginWithRedirect()} className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Sign In
            </button> 
          }
          
      </div>
    </header>
  );
};

export default Navbar;
