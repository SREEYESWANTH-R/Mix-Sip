import express from "express"
import Product from "../model/ProductModel.js";
import { authMiddleware } from "../controller/AuthController.js";


const router = express.Router();

router.get("/get-product",async(req,res)=>{
    try {
        const products  = await Product.find();
        res.status(200).json({products});

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")
    }
})

router.post("/add-product",async(req,res)=>{
    try {
        const { title, price,img, description,category,quantity} = req.body;

        const newProduct = new Product({
            name: title,
            price,
            img,
            description,
            category,
            quantity
        })

        await newProduct.save();
        res.status(200).json({message:"Product Added Successfully"});

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const iniProduct = await Product.findById(id);
        

        res.status(200).json({iniProduct});

    } catch (error) {
        res.status(500).json("Server Error");
        console.log(error);
    }
})  




export default router;