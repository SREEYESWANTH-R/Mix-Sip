import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";



const AdminAddProduct = () => {
  
  const [addProduct, setAddProduct] = useState({
    title:'',
    price:'',
    description:'',
    category:'',
    quantity:'',
  })


  const handleChange = (e) =>{
    const {name,value} = e.target;
    setAddProduct((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  useEffect(()=>{
    console.log(addProduct)
  },[addProduct])
  
  const handleAddProduct = async(e)=>{
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:5000/api/product/add-product",addProduct);
      if(response){
        toast.success(response.data.message);
      }else{
        toast.success("Failed to Add Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen px-4 py-4 space-y-3 sm:shadow-lg ">
      

      <div className="w-full flex justify-center">
      <form onSubmit={handleAddProduct} className="flex flex-col w-1/2 shadow-md px-3 py-3 space-y-2">
        <h1 className="font-bold text-2xl px-5 py-3 sm:w-full">Add Product</h1>
        <div className="flex flex-col space-y-2 px-4 py-3 bg-pink-100 rounded-md text-center sm:border-pink-700 sm:border-dashed sm:border-2 ">
          <label className="font-semibold">Upload Image</label>
          <input type="file" alt=""/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Title</label>
          <input onChange={handleChange} type="text" placeholder="Title" name="title" value={addProduct.title} className="px-3 py-3 border outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Price</label>
          <input  onChange={handleChange}  type="number" placeholder="Price" name="price" value={addProduct.price}  className="px-3 py-3 border outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Description</label>
          <input  onChange={handleChange}  type="text" placeholder="description" name="description" value={addProduct.description} className="px-3 py-3 border outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Category</label>
          <select  onChange={handleChange}  name="category" id="category" value={addProduct.category} className="px-3 py-3 border outline-none w-full font-mono">
            <option value="choose">Choose Category</option>
            <option value="freshjuice">Fresh Juice</option>
            <option value="shakes">Shakes</option>
            <option value="special">Special</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Quantity</label>
          <input  onChange={handleChange}  type="text" placeholder="quantity(ml)" name="quantity" value={addProduct.quantity} className="px-3 py-3 border outline-none" />
        </div>
        
        <button type="submit" className="px-3 py-4 bg-pink-500 text-white font-semibold">Add Product</button>
      </form>
      </div>
      <ToastContainer position="top-right" duration={2000} />
    </div>
  );
};

export default AdminAddProduct;
