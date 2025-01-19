import express from "express";
import { loginUser, logoutUser, registerUser, authMiddleware } from "../controller/AuthController.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message: "Authorized User",
        user
    });
})


export default router;