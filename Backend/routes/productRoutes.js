import express from "express"
import Product from "../model/ProductModel.js";
import { authMiddleware } from "../controller/AuthController.js";
import User from "../model/User.js";


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

router.get("/:category",async(req,res)=>{
    try {
        const {category} = req.params;
        const catProduct = await Product.find({category});
        res.status(200).json({catProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")
    }
})

// Delete product
router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({message:"Product removed"})
    } catch (error) {
        console.log(error)
        res.json(500).json("Server Error")
    }
})

//Edit product
router.put("/edit/:id",async(req,res)=>{
    const {id} = req.params
    const { name, description, price, quantity } = req.body;
    try {
        const updatedProd = await Product.findByIdAndUpdate(
            id,
            {name,price,description,quantity},
            { new: true }
        )
        
        if(!updatedProd){
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully", updatedProd });

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")
    }
})


export default router;