import express from "express";
import { authMiddleware } from "../controller/AuthController.js";
import User from "../model/User.js";
import Product from "../model/ProductModel.js";


const router = express.Router();

// Route to add product to cart
router.post("/:id",authMiddleware,async(req,res)=>{
    try {
        const userId = req.user.id;
        const {id} = req.params;
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json("User Not Authenticated");
        }

        const product = await Product.findById(id);
        
        if(!product){
            return res.status(404).json("Product Not found");
        }

        const existingProductIndex = user.cart.findIndex((item) => item.productId === id);
        
        if(existingProductIndex >= 0) {
            user.cart[existingProductIndex].quantity += 1;
        }else{
            user.cart.push({
                productId:id,
                name: product.name,
                price: product.price,
                quantity: 1,
            })
        }

        await user.save()

        res.status(200).json({message:"Added to cart"});

    } catch (error) {
        res.status(500).json("Server Error");
    }
})

//Route to show the cart-count
router.get("/cart-count",authMiddleware,async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json("User Not Found");
        }

        const totalItems = user.cart.reduce((total,item) => total+item.quantity,0);
        res.status(200).json({
            totalItems
        })

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error");
    }
})

export default router;