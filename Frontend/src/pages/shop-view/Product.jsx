import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInidividualProd, relatedProducts } from "../../store/product-slice";
import { PacmanLoader } from "react-spinners";
import { Star} from 'lucide-react'

const Product = () => {
  const { id,category } = useParams();
  console.log(id,category)
  const { singleProduct, loading, error } = useSelector(state => state.product);
  const [image,setImage] = useState('');

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchInidividualProd(id));
    },
    [dispatch, id]
  );

  // useEffect(()=>{
  //   dispatch(relatedProducts(category))
  // },[dispatch,category])

  useEffect(() => {
    if (singleProduct?.img?.length) {
      setImage(singleProduct.img[0]); 
    }
  }, [singleProduct]);

  console.log(singleProduct);

  return loading ? (
    <div className="w-full flex items-center justify-center">
      <PacmanLoader color="#ff44e1" />
    </div>
  ) : error ? (
    <div>Error loading product: {error}</div>
  ) : singleProduct ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Main container */}
      <div className="flex gap-12 px-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-5 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 sm:gap-5 overflow-x-auto sm:overflow-y-auto">
            {singleProduct.img?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                className="w-36 h-36  object-cover cursor-pointer border border-gray-200 hover:border-black"
                alt=""
              />
            ))}
          </div>
          {/* Large Image */}
          <div className="w-full">
            <img src={image} className="w-full h-full object-contain border border-gray-200" alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{singleProduct.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 text-yellow-500" />
            ))}
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">₹{singleProduct.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{singleProduct.description}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">Quantity: {singleProduct.quantity}</p>
          <button className=" bg-pink-400 rounded-lg font-semibold text-white px-8 py-3 text-sm active:bg-gray-700 mt-5">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 flex flex-col gap-1 mt-5">
            <p>100% Original product</p>
            <p>Cash on Delivery</p>
            <p>100% Fresh</p>
          </div>
        </div>
      </div>
      
      {/* Related Product */}
      {/* <div className="mt-5 px-11 py-4">
        <h1 className="font-semibold text-2xl">Related Product</h1>
        {relatedProd ? 
          <div>
            {relatedProd.map((product,index)=>(
              <div
                    key={index}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Link
                      className="text-gray-700 cursor-pointer"
                      to={`/shop/product/${product._id}`}
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
                    </Link>
                    <button
                      // onClick={() => handleCart(product._id)}
                      className="text-center bg-pink-200 rounded-md mt-2 px-2 py-2 border-2 border-pink-500 font-bold"
                    >
                      Add To Cart
                    </button>
                  </div>
            ))}
          </div>
          :
          <div>Product Loading...</div>
        }
      </div> */}
      
    </div>
    
  ) : (
    <div>Product not found</div>
  );
};

export default Product;
