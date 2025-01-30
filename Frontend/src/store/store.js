import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index';
import productReducer from './product-slice/index';
import cartReducer from './cart-slice/index';



const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        cart:cartReducer
    }
})

export default store;