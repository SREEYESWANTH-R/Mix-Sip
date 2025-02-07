import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/search_icon.png";
import { PacmanLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../store/product-slice";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Box, Modal, TextField } from "@mui/material";

const AdminHome = () => {
  const { products, loading, error } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [formData,setFormData] = useState({
    name:"",
    price:"",
    description:"",
    quantity:""
  })

  const [productId,setProductId] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  useEffect(
    () => {
      dispatch(fetchProducts());
    },
    [dispatch]
  );

  const handleProductDelete = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/${id}`,
        {
          withCredentials: true
        }
      );

      if (response) {
        toast.success(response.data.message);
        dispatch(fetchProducts());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editItemDetails = (product) =>{
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    });
    setProductId(product._id);
    setOpen(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = async()=>{
    try {
      const response = axios.put(`http://localhost:5000/api/product/edit/${productId}`,
        formData,
        {withCredentials:true}
      )

      if(response.status === 200){
        toast.success("Product updated successfully!");
        
        dispatch(fetchProducts());
        setOpen(false);
      }

    } catch (error) {
      console.log(error.message)
      toast.error("Failed to update product.");
    }
  }

  return (
    <div className="flex flex-col space-y-10 px-10">
      {/* Search Bar */}
      <div className="flex justify-center">
        <div className="flex items-center border-2 rounded-md px-4 w-1/2">
          <img src={searchIcon} alt="" className="w-4" />
          <input
            className="border-none outline-none px-3 py-3"
            placeholder="Search Product"
          />
        </div>
      </div>

      {/* Product Display section */}
      <div className="flex flex-col gap-3">
        {loading
          ? <div className="w-full flex items-center justify-center h-full">
              <PacmanLoader color="#ff44e1" />
            </div>
          : error
            ? <p className="text-red-500">
                Failed to load products: {error}
              </p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product, index) =>
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                  >
                    {product.img &&
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />}
                    <h2 className="text-lg font-semibold">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-500 font-semibold">
                      {product.quantity} | ₹{product.price}
                    </p>
                    <div className="flex gap-3 items-center mt-4">
                      <Trash2
                        onClick={() => handleProductDelete(product._id)}
                        size={28}
                        className="cursor-pointer hover:text-pink-500"
                      />
                      <Edit
                        size={28}
                        onClick={() => editItemDetails(product)}
                        className="cursor-pointer hover:text-pink-500"
                      />
                    </div>
                  </div>
                )}
              </div>}

        {/* product  edit modal */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="font-semibold text-2xl text-center mb-4">Edit Product</h1>
            <div className="text-center flex flex-col space-y-4">
              <TextField variant="outlined" onChange={handleInputChange} name="name" value={formData.name} label="Product Name" />
              <TextField variant="outlined" onChange={handleInputChange} name="description" value={formData.description} label="Product Description" />
              <TextField variant="outlined" onChange={handleInputChange} name="price" value={formData.price} label="Product Price" />
              <TextField variant="outlined" onChange={handleInputChange} name="quantity" value={formData.quantity} label="Product Quantity" />
            </div>
            <button className="px-4 py-2 bg-pink-400 mt-4" onClick={handleSaveDetails}>Save Details</button>
          </Box>
        </Modal>

        <ToastContainer position="bottom-center" duration={1000} />
      </div>
    </div>
  );
};

export default AdminHome;
