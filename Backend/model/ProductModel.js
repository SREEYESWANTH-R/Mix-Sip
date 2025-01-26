import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    img:{
        type:Array,
    },  
    price:{
        type:Number
    },
    description:{
        type:String,
    },
    category:{
        type:String
    },
    quantity:{
        type:String
    }
})

const Product = mongoose.model('products',productSchema);

export default Product;