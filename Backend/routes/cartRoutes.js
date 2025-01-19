import express from "express";
import { authMiddleware } from "../controller/AuthController.js";
import User from "../model/User.js";
import Product from "../model/ProductModel.js";


const router = express.Router();

router.put("/:id",authMiddleware,async(req,res)=>{
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

        const existingProductIndex = user.cart.find((item)=>item.productId === id);

        if(existingProductIndex > 0) {
            user.cart[existingProductIndex].productQuantity += 1;
        }else{
            user.cart.push({
                id,
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

export default router;