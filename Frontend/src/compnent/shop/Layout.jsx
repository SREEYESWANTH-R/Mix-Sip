import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import cartIcon from "../../assets/cart_icon.png";
import profileIcon from "../../assets/profile_icon.png";
import { useEffect } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getCartCount } from "../../store/cart-slice";
import axios from "axios";

function Layout() {
  const { cartCount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(
    () => {
      dispatch(getCartCount());
    },
    [dispatch, cartCount]
  );

  // Logout function
  const handleLogout = async() =>{
      try {
        const response = await axios.post("http://localhost:5000/api/auth/logout",{
          withCredentials:true
        });
        if(response){
          return navigate("/auth/login");
        }
        console.log(response.data.message)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <nav className="px-12 py-5 flex items-center justify-between ">
        <img src={logo} className="w-20" alt="" />
        <ul className="hidden sm:flex gap-7 text-lg text-gray-700 font-semibold">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-1 hover:underline decoration-gray-700"
          >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all" />
          </NavLink>
          <NavLink
            to="/drinks"
            className="flex flex-col items-center gap-1 hover:underline decoration-gray-700"
          >
            <p>JUICES</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/aboutus"
            className="flex flex-col items-center gap-1 hover:underline decoration-gray-700"
          >
            <p>ABOUT US</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all" />
          </NavLink>
          <NavLink
            to="/contact"
            className="flex flex-col items-center gap-1 hover:underline decoration-gray-700"
          >
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-8">
          <img className="w-6" src={searchIcon} alt="" />
          <div className="relative">
            {cartCount
              ? <p className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-semibold rounded-full bg-pink-400 text-black">
                  {cartCount}
                </p>
              : null}
            <Link to={"/shop/cart"}>
              <img className="w-6" src={cartIcon} alt="Cart" />
            </Link>
          </div>
          <div className="relative group">
            <img
              className="w-6 cursor-pointer"
              src={profileIcon}
              alt="Profile"
            />
            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
              <Link to="/profile">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
              </Link>
              <Link to="/address">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Manage Address
                </li>
              </Link>
              <Link to="/orders">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">Orders</li>
              </Link>
              
                <li onClick={()=>{handleLogout()}} className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer section */}
      <footer className="bg-pink-200 text-white py-6 w-full">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12">
          {/* Logo & Name */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Mix & Sip Logo" className="h-auto w-20" />
            <p className="text-black mt-1">Refreshing Every Sip!</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 my-4 md:my-0">
            <a href="/" className="text-black hover:text-white">
              Home
            </a>
            <a href="/about" className="text-black hover:text-white">
              About
            </a>
            <a href="/menu" className="text-black hover:text-white">
              Menu
            </a>
            <a href="/contact" className="text-black hover:text-white">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-white text-xl">
              <Facebook />
            </a>
            <a href="#" className="text-black hover:text-white text-xl">
              <Instagram />
            </a>
            <a href="#" className="text-black hover:text-white text-xl">
              <Twitter />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-black text-sm mt-4">
          © {new Date().getFullYear()} Mix & Sip. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
