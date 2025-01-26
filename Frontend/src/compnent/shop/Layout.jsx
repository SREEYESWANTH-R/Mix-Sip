import { NavLink, Outlet } from "react-router-dom"
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.png'
import cartIcon from '../../assets/cart_icon.png'
import profileIcon from '../../assets/profile_icon.png'
import { useEffect, useState } from "react"
import axios from "axios"



function Layout(){

  const [totalCartCount, setTotalCartCount] = useState(0);


  useEffect(()=>{
    const getCartCount = async() =>{
      try {
        const response = await axios.get("http://localhost:5000/api/cart/cart-count",{
          withCredentials:true
        })
        if(response){
          setTotalCartCount(response.data.totalItems);
          console.log(response.data.totalItems)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCartCount();
  },[])

  return (
    <div className="flex flex-col gap-4 ">
        <nav className="px-12 py-5 flex items-center justify-between">
          <img src={logo} className="w-20" alt=""/>
          <ul className='hidden sm:flex gap-7 text-lg text-gray-700 font-semibold'>
            <NavLink to='/' className='flex flex-col items-center gap-1 hover:underline decoration-gray-700'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all'></hr>
            </NavLink>
            <NavLink to='/drinks' className='flex flex-col items-center gap-1 hover:underline decoration-gray-700'>
                <p>JUICES</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/aboutus' className='flex flex-col items-center gap-1 hover:underline decoration-gray-700'>
                <p>ABOUT US</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all'></hr>
            </NavLink>
            {/* <NavLink to='/shakes' className='flex flex-col items-center gap-1 hover:underline decoration-gray-700'>
                <p>SPECIALS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all'></hr>
            </NavLink> */}
            <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:underline decoration-gray-700'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all'></hr>
            </NavLink>
        </ul>
          <div className="flex items-center gap-8">
            <img className="w-6" src={searchIcon}  alt=""/>
            <div className="relative ">
            <p className={`absolute w-5 h-5 text-center left-4 bottom-3 font-semibold rounded-full bg-pink-400 text-black`}>{totalCartCount}</p>
            <img className="w-6" src={cartIcon} alt=""/>
            </div>
            
            <img className="w-6" src={profileIcon} alt=""/>
          </div>
        </nav>
        <div><Outlet/></div>
    </div>
  )
}

export default Layout