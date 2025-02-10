import { Route, Routes } from "react-router-dom";
import AuthLayout from "./compnent/auth/Layout";
import Register from "./pages/auth-page/Register";
import Login from "./pages/auth-page/Login";
import CheckAuth from "./compnent/common/CheckAuth";
import AdminAuthLayout from "./compnent/admin/AdminLayout";
import Home from "./pages/shop-view/Home";
import Product from "./pages/shop-view/Product";
import Cart from "./pages/shop-view/Cart";
import Admin from "./pages/admin-view/Admin";
// import { useDispatch, useSelector } from "react-redux"
import ShopLayout from "./compnent/shop/Layout";
// import { useEffect } from "react"
// import { checkAuth } from "./store/auth-slice"
import AdminAddProduct from "./pages/admin-view/AdminAddProduct";

function App() {
  // const {isAuthenticated,user}  = useSelector(state => state.auth);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(checkAuth());
  // },[dispatch])

  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <Routes>
        <Route path="/" element={<ShopLayout />}>
          
          <Route index element={<Home />} />
          <Route path="/shop/product/:id" element={<Product />} />
          <Route path="/shop/cart" element={<Cart />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<AdminAuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
