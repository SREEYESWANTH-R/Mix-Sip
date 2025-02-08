import axios from "axios";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { baseURL } from "../../compnent/common/Common";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCartItems = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/cart/cart-items`,
        {
          withCredentials: true
        }
      );
      setCartItems(response.data.cartitems);
      console.log(response.data.cartitems)
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleDelete = async id => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/cart/delete-cart/${id}`,
        {
          withCredentials: true
        }
      );
      if (response) {
        toast.success(response.data.message);
        getCartItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // calculate subtotal  
  const subtotal = cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0);
   

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {loading
        ? <div className="flex justify-center">
            <PacmanLoader color="#ff44e1" />
          </div>
        : cartItems.length > 0
          ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartItems.map(item =>
                <div
                  key={item._id}
                  className="border shadow-lg rounded-lg p-4 bg-white"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    Price: ₹{item.price}
                  </p>
                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-black font-semibold">
                    Total: ₹{item.quantity * item.price}
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          : <p className="text-center text-gray-500">Your cart is empty.</p>}
      
      <div className="flex flex-col justify-center items-end w-full mt-5 space-y-4">
        <h1 className="text-2xl font-bold">
          Subtotal: ₹{subtotal}
        </h1>
        <button className="bg-pink-400 px-3 py-3 rounded-md font-semibold text-white">
          Buy Now
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Cart;
