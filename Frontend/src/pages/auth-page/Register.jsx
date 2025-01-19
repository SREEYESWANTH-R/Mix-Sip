import { useState } from "react"
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


const Register = () => {

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  });

  // const {toast} = useToaster();

  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
 
  const handleregisterSubmit = (e) =>{
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){ 
        toast.success(data?.payload?.message)
        navigate('/auth/login');
      }else{
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <>
    <form className="w-3/4" onSubmit={handleregisterSubmit}>
      <h1 className="text-center mb-2 text-2xl font-semibold">Register with us!!</h1>
      <div className="flex flex-col gap-1 w-full mb-3">
          <label className="font-bold text-lg">Name</label>
          <input className="border outline-none px-4 py-4" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div className="flex flex-col gap-1 w-full mb-3">
          <label className="font-bold text-lg">Email</label>
          <input className="border outline-none px-4 py-4" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="flex flex-col gap-1 w-full mb-3">
          <label className="font-bold text-lg">Password</label>
          <input className="border outline-none px-4 py-4" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-4">Register</button>
        <p className="mt-3 font-semibold text-center text-lg">Already have an account? <Link to="/auth/login" className="cursor-pointer underline text-blue-500">login</Link> </p>
    </form>
    <ToastContainer 
      position="bottom-right" 
      autoClose={3000}
    />
    </>
  )
}

export default Register
