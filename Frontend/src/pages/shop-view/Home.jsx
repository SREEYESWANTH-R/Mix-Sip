import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'

const Home = () => {

  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const [products ,setProducts] = useState([])



  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const response = await axios.get("http://localhost:5000/api/product/get-product")
        setProducts(response.data.products)
        setFilterProducts(response.data.products); 
        console.log(response.data.products)

      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
  },[])
  

  const toogleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory((prev) => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value]);
    }
  }



  const applyFilter = () =>{
     let productCopy = products.slice();
     if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category));
     }

     setFilterProducts(productCopy)
  }

  const applySort = () =>{
    let spCopy = products.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(spCopy.sort((a,b)=>(a.price - b.price))) ;
        break;
      case 'high-low':
        setFilterProducts(spCopy.sort((b,a)=>(b.price - a.price))) ;
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    applyFilter()
  },[category])


  useEffect(()=>{
    applySort();
  },[sortType])




  const handleCart = async(id)=>{
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${id}`,{}, { withCredentials: true })
      if(response.status){
        toast.success(response.data.message);
      }
    } catch (error) {
      alert(error.message);
      console.log(error)
    }
  }

  return (
    <div className="flex px-10 gap-4">
      <div className="flex flex-col w-1/6">  
        <div className="border px-7 py-5 hidden lg:block h-44 overflow-y-auto">
          <h1 className="text-xl font-semibold">FILTER</h1>
          <hr className="font-bold mb-3"></hr>
          <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input onChange={toogleCategory} className='w-3 font-semibold' type="checkbox" value={'freshjuice'} />Fresh Juice
                </p>
                <p className='flex gap-2'>
                  <input onChange={toogleCategory} className='w-3 font-semibold' type="checkbox" value={'shakes'}/>Shakes
                </p>
                <p className='flex gap-2'>
                  <input onChange={toogleCategory} className='w-3 font-semibold' type="checkbox" value={'special'}/>Specials
                </p>
          </div>
        </div>
        
        <div className="mt-6 ">
          <select className="border-2 border-gray-300 text-sm px-4 py-4 w-full" onChange={(e)=>setSortType(e.target.value)}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="relevant">Sort by: Hign to Low</option>
          </select>
        </div>
      </div>
      <div className="flex-1 border px-5 py-5 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {filterProducts.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <Link  className='text-gray-700 cursor-pointer' to={`/shop/product/${product._id}`}>
              
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-500 font-semibold">
                  {product.quantity} | ₹{product.price}
                </p>
                
            </Link>
            <button onClick={()=>handleCart(product._id)} className="text-center bg-pink-200 rounded-md mt-2 px-2 py-2 border-2  border-pink-500 font-bold">Add To Cart</button>

            </div>
           
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" duration={2000} />
    </div>
  )
}

export default Home