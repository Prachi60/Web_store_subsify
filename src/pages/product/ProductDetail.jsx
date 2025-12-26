
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart} from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchCart, removeFromCart } from "../../redux/cartSlice";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAdded = cartItems?.some((item) => item._id === product?._id);
const dispatch = useDispatch();
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleToggleCart = () => {
      if (isAdded) {
        dispatch(removeFromCart(product._id))
          .unwrap()
          .then((res) => toast.error(res.message))
          .catch((err) => toast.error(err));
   
      } else {
        dispatch(addToCart(product))
          .unwrap()
          .then((res) => toast.success(res.message))
          .catch((err) => toast.error(err));
      }
    };
    useEffect(() => {
      dispatch(fetchCart());
    }, []);

  const fetchProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/product/${id}`);
    setProduct(res.data.result);

    
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="bg-white min-vh-100">
      

 
      <div className="bg-danger text-white py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-5">Product</span>
            <div className="d-flex align-items-center gap-2">
              <Link to="/" className="text-decoration-none text-white">Home</Link>
              <span>-</span>
              <Link to={`/product/${product._id}`} className="text-decoration-none text-white">Product</Link>
            </div>
          </div>
        </div>
      </div>

    
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="text-center">
              <img
                // src={`${import.meta.env.VITE_API_URL}${product.image}`}
                 src={product.image}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-3">
              <h3>{product.name}</h3>
              <p className="mb-4">{product.description}</p>
              <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4">
                <div className="col">
                  <p className="mb-1"><strong>Category:</strong> {product.category?.name}</p>
                  <p className="mb-1"><strong>Min Unit:</strong> {product.unit}</p>
                  <p className="mb-1"><strong>In Stock:</strong> {product.in_stock ?"Yes":"No"}</p>
                  <p className="mb-1"><strong>Expire Date:</strong> {product.expire_date}</p>
                </div>
                <div className="col">
                  <p className="mb-1"><strong>Max Order Limit:</strong> {product.max_order_limit}</p>
                  <p className="mb-1"><strong>Subscription Frequency:</strong> {product.subscription_frequency}</p>
                  <p className="mb-1"><strong>Subscription Available:</strong> {product.subscription_available?"yes":"No"}</p>
                </div>
              </div>
              <h4 className="text-danger mb-4">₹{product.price}</h4>
              <div className="d-flex gap-3 align-items-center">
                {/* <button className="btn btn-danger">Add to cart</button> */}
                        <button
                          className={`btn btn-sm ${isAdded ? "btn-warning" : "btn-danger"}`}
                          onClick={handleToggleCart}
                        >
                          <FaShoppingCart className="me-1" />
                          {isAdded ? "Remove from cart" : "Add to Cart"}
                        </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ProductDetails;
