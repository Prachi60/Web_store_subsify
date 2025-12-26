
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistCount, removeWishlistItem } from "../../redux/wishlistSlice";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);


  const handleToggleCart = (product) => {
    const isAdded = cartItems?.some(
      (item) =>
        item.product?._id === product._id || item._id === product._id
    );

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


  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/getwishlistitem`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const results = res.data.results || [];
      setItems(results);

      const ids = results.map((item) => item.productId._id);
      localStorage.setItem("wishlist_ids", JSON.stringify(ids));

      dispatch(setWishlistCount(ids.length));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setLoading(false);
    }
  };

 
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/removefromwishlist/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = items.filter(
        (item) => item.productId._id !== productId
      );
      setItems(updated);

      dispatch(removeWishlistItem(String(productId)));
      toast.error("Product removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container_fluid bg-white">
      <div className="product_nav_bar bg-danger tex-white py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <span className="text-white">Wishlist</span>
          <div className="d-flex align-items-center gap-2">
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
            <span className="text-white">-</span>
            <Link to="/wishlist" className="text-white text-decoration-none">
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {loading ? (
          <h5>Loading wishlist...</h5>
        ) : items.length === 0 ? (
          <h4 className="text-center text-muted py-5">
            Your wishlist is empty
          </h4>
        ) : (
          <div className="row">
            {items.map((item) => {
              const product = item.productId;

              const isAdded = cartItems?.some(
                (cartItem) =>
                  cartItem.product?._id === product._id ||
                  cartItem._id === product._id
              );

              return (
                <div className="col-md-3 mb-4" key={item._id}>
                  <div className="card p-2 shadow-sm h-100">
                    <img
                      // src={`${import.meta.env.VITE_API_URL}${product.image}`}
                       src={product.image}
    
  
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    <div className="card-body">
                      <h6>{product.name}</h6>
                      <p className="text-success fw-bold">
                        ₹ {product.price}
                      </p>

                      
                      <button
                        className={`btn w-100 mb-2 ${
                          isAdded ? "btn-warning" : "btn-danger"
                        }`}
                        onClick={() => handleToggleCart(product)}
                      >
                        <FaShoppingCart className="me-1" />
                        {isAdded ? "Remove from Cart" : "Add to Cart"}
                      </button>

                   
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => removeItem(product._id)}
                      >
                        Remove from wishlist
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
