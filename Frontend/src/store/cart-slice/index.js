import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../compnent/common/Common"

const initialState = {
  loading: false,
  cartCount: 0,
  error: null
};

export const getCartCount = createAsyncThunk("cart/cart-count", async () => {
  const response = await axios.get(`${baseURL}/api/cart/cart-count`,{
    withCredentials:true
  });
  return response.data.totalItems;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCartCount.pending, state => {
      state.loading = true;
    }).addCase(getCartCount.fulfilled,(state,action)=>{
        state.loading = false,
        state.cartCount = action.payload
    }).addCase(getCartCount.rejected,(state,action)=>{
        state.loading = false,
        state.cartCount = action.error.message
    })
  }
});

export default cartSlice.reducer;
