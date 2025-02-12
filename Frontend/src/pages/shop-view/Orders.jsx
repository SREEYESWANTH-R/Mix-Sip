import { useEffect, useState } from "react";
import stripe_logo from '../../assets/stripe_logo.png'
import razorpay_logo from '../../assets/razorpay_logo.png'
import { useNavigate } from "react-router-dom";

const Orders = () => {

  const[method ,setMethod] = useState('cod');
  const navigate = useNavigate();
  const [address,setAddress] = useState({
    firstName:"",
    lastName:'',
    email:'',
    street:'',
    state:'',
    city:'',
    zipcode:'',
    country:'',
    phone:''
  })


  const handleChange = (e) =>{
    const {name,value} = e.target;
    setAddress(prev=>({
    ...prev,
    [name]:value
    }))
  }

  useEffect(()=>{
    console.log(address)
  },[address])

  return (
    <div className="flex flex-col sm:flex-row  justify-around gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
    <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
      <div className="text-xl sm:text-2xl my-3">
          <h1>DELIVERY DETAILS</h1> 
      </div>
      <div className="flex gap-3">
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="firstName"  value={address.firstName} onChange={(e)=>handleChange(e)} type="text" placeholder="First Name"/>
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="lastName"  value={address.lastName} onChange={(e)=>handleChange(e)} type="text" placeholder="Last Name"/>
      </div>
      <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="email"  value={address.email} onChange={(e)=>handleChange(e)} type="email" placeholder="Email"/>
      <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="street" value={address.street} onChange={(e)=>handleChange(e)} type="text" placeholder="Street"/>
      <div className="flex gap-3">
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="state" value={address.state} onChange={(e)=>handleChange(e)} type="text" placeholder="State"/>
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="city" value={address.city} onChange={(e)=>handleChange(e)} type="text" placeholder="City"/>
      </div>
      <div className="flex gap-3">
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full"  name="zipcode" value={address.zipcode} onChange={(e)=>handleChange(e)} type="number" placeholder="Zipcode"/>
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" name="country"  value={address.country} onChange={(e)=>handleChange(e)} type="text" placeholder="Country"/>
      </div>
      <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" name="phone"  value={address.phone} onChange={(e)=>handleChange(e)} type="number" placeholder="Phone"/>
    </div>

    <div className="mt-8">
      <div className="mt-8 min-w-80">
        
      </div>

      <div className="mt-12">
        <h1></h1>PAYMENT METHOD
        <div className="flex gap-3 flex-col lg:flex-row">
          <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : '' } `}></p>
            <img className="h-5 mx-4" src={stripe_logo} alt=""></img>
          </div>
          <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : '' } `}></p>
            <img className="h-5 mx-4" src={razorpay_logo} alt=""></img>
          </div>
          <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : '' } `}></p>
            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELEVERY</p>
          </div>
        </div>
      </div>

      <div className="w-full text-end mt-8">
        <button onClick={()=>{navigate('/orders')}} className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
      </div>

    </div>

  </div>
  )
}

export default Orders