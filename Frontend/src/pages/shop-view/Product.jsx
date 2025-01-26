import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInidividualProd } from "../../store/product-slice";

const Product = () => {
  const { id } = useParams();
  const { singleProduct, loading, error } = useSelector(state => state.product);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchInidividualProd(id));
    },
    [dispatch, id]
  );

  console.log(singleProduct);

  return (
    <div>
       {singleProduct ? <h1>{singleProduct.name}</h1> : <p>Product not found</p>}
    </div>
  );
};

export default Product;
