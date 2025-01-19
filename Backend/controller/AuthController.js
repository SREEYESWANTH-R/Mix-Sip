import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User  from "../model/User.js";

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "User Exists Already" });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "Register Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid Credentials" });
  }
};

//Login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User has not Registered,Kindly Register!!" });

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
      return res.json({ success: false, message: "Password is invalid" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_STRING,
      // { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login Successfully",
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid Credentials" });
  }
};

//Logout

export const logoutUser = async(req,res)=>{
    try {
        res.clearCookie('token',{ httpOnly: true, secure: false });
        res.status(200).json({success:false,message:'User Logged out Successfully'});
    } catch (error) {
        console.log(error);
        res.json("Server Error");
    }
}

// authMiddleware

export const authMiddleware = async(req,res,next)=>{

  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json({
      success:false,
      message:'Unauthorized User'
    })
  }

  try {
    
    const decoded = jwt.verify(token,process.env.JWT_STRING);
    req.user = decoded
    next();

  } catch (error) {
     res.status(401).json(
      {
        success:false,
        message:'Unauthorized User'
      }
    )
  }
}