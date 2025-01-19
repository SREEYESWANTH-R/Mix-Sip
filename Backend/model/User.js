import mongoose from "mongoose";


const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true, 
    },
    role:{
        type:String,
        default:'user',
    },
    cart:[
        {
            productId: String,
            name:String,
            price:Number,
            quantity:Number
        }
    ]
})


const User =  mongoose.model('User',UserSchema);

export default User;