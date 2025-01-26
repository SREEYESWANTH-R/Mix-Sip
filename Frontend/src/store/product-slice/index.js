import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products:[],
    singleProduct:null,
    loading:false,
    error:false,
}


export const fetchProducts = createAsyncThunk(
    'product/get-product',
    async()=>{
        const response = await axios.get('http://localhost:5000/api/product/get-product')
        return response.data.products
    }
)

export const fetchInidividualProd = createAsyncThunk(
    'product/:id',
    async(id)=>{
        const response = await axios.get(`http://localhost:5000/api/product/${id}`)
        return response.data.iniProduct
    }
)

const productSlice = createSlice({
    name:'product',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true,
            state.products = [],
            state.error = null
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false,
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchInidividualProd.pending,(state)=>{
            state.loading = true,
            state.singleProduct = null,
            state.error = null
        })
        .addCase(fetchInidividualProd.fulfilled,(state,action)=>{
            state.loading = false,
            state.singleProduct = action.payload
        })
        .addCase(fetchInidividualProd.rejected,(state,action)=>{
            state.loading = false,
            state.singleProduct = action.error.message
        })
    }
})



export default productSlice.reducer;