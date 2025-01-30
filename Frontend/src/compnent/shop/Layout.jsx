import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import cartIcon from "../../assets/cart_icon.png";
import profileIcon from "../../assets/profile_icon.png";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getCartCount } from "../../store/cart-slice";

function Layout() {
  // const [totalCartCount, setTotalCartCount] = useState(0);
  const { cartCount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(
    () => {
      // const getCartCount = async() =>{
      //   try {
      //     const response = await axios.get("http://localhost:5000/api/cart/cart-count",{
      //       withCredentials:true
      //     })
      //     if(response){
      //       setTotalCartCount(response.data.totalItems);
      //       console.log(response.data.totalItems)
      //     }
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      // getCartCount();
      dispatch(getCartCount());
    },
    [dispatch, cartCount]
  );

  return (
    <div className="flex flex-col gap-4 px-24 ">
      <nav className="px-12 py-5 flex items-center justify-between">
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

          <img className="w-6" src={profileIcon} alt="" />
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
