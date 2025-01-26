import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index';
import productReducer from './product-slice/index';



const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
    }
})

export default store;