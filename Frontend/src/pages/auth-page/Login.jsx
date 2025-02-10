import { useState } from "react"
import {useDispatch} from 'react-redux'
import { loginUser } from "../../store/auth-slice"
import { Link, useNavigate } from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


function Login(){

  const [formData,setFormData] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleLoginSubmit = (e) =>{
    e.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        if(data?.payload?.user.role !== 'user'){
          toast.success(data?.payload?.message);
          navigate("/");
        }else{
          navigate("/admin/dashboard");
        }
      }else{
        toast.error(data?.payload?.message);
      }
      
    });
  }


  return (
    <>
    <form className="w-3/4" onSubmit={handleLoginSubmit}>
      <h1 className="text-center mb-2 text-2xl font-semibold">Login with us!!</h1>
      <div className="flex flex-col gap-1 w-full mb-3">
        <label className="font-bold text-lg">Email</label>
        <input className="border outline-none px-4 py-4" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
      </div>
      <div className="flex flex-col gap-1 w-full mb-3">
        <label className="font-bold text-lg">Password</label>
        <input className="border outline-none px-4 py-4" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
      </div>
      <button type="submit" className="bg-black text-white px-4 py-4">Login</button>

      <p className="mt-3 font-semibold text-center text-lg">Do not have an account? <Link to="/auth/register" className="cursor-pointer underline text-blue-500">Register</Link> </p>
    </form>
    <ToastContainer 
      position="bottom-right" 
      autoClose={3000} />
    </>
  )
}

export default Login
