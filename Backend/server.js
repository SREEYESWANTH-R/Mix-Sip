import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoutes.js';
import cartRoute from './routes/cartRoutes.js';
import productRoute from './routes/productRoutes.js'


const app = express();

app.use(express.json())
app.use(cors(
    { origin: [process.env.FRONT_END_URL],
    methods : ["POST","PUT","GET","DELETE"],
    credentials: true }
));
app.use(cookieParser());
app.use('/api/auth/',authRoute);
app.use('/api/cart/',cartRoute);
app.use("/api/product/",productRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running at PORT : ${PORT}`);
})

