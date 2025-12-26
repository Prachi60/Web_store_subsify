
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, fetchCart, removeFromCart } from "../../redux/cartSlice";
import {
  addWishlistItem,
  removeWishlistItem,
  setWishlistCount,
} from "../../redux/wishlistSlice";
import { Link } from "react-router-dom";
import "./Card.css"

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [itemsIds,setItemsIds]=useState([]);
  const wishlistItems = useSelector((state) => state.wishlist.items);
 
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAdded = cartItems?.some((item) => item._id === product._id);

 

  const addToWishlist = async () => {
    if (!token) return toast.error("Login first");

    await axios.post(
      `${import.meta.env.VITE_API_URL}/product/addtowishlist`,
      { productId: product._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(addWishlistItem(product._id));
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = async () => {
        if (!token) return toast.error("Login first");

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/product/removefromwishlist/${
        product._id
      }`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(removeWishlistItem(product._id));
    toast.error("Removed from wishlist");
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
      const ids = results.map((item) => item.productId._id);
       setItemsIds(ids);
     dispatch(setWishlistCount(ids.length));
    } catch (error) {
       console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    fetchWishlist();
   }, [wishlistItems]);
  

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
  return (
    <div className="border-2 border-light rounded-3 shadow-sm product_card"
    
    >
      <Link to={`/product/${product._id}`}  className="text-decoration-none text-dark">
      <div className="text-center p-2">
        <img
          src={
    product.image?.startsWith("http")
      ? product.image
      : `${import.meta.env.VITE_API_URL}${product.image}`
  }
          alt={product.name}
          className="img-fluid rounded-3"
          style={{ width: "180px", height: "150px", objectFit: "cover" }}
        />

        </div>
      </Link>
      <div className="card-body p-2 d-flex flex-column">

    
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-muted">{product.category?.name}</small>
     

        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            itemsIds.includes(product._id) ? removeFromWishlist() : addToWishlist()
          }
        >
           {itemsIds.includes(product._id) ? (
              <FaHeart size={20} color="red" />
             ) : (
               <FaRegHeart size={20} />
             )}
        </div>
      </div>
      <h6 className="card-title mb-1">{product.name}</h6>



      <div className="d-flex justify-content-between align-items-center mt-auto">
        <span className="fw-bold"> Price: ₹{product.price}</span>

        <button
          className={`btn btn-sm ${isAdded ? "btn-warning" : "btn-danger"}`}
          onClick={handleToggleCart}
        >
          <FaShoppingCart className="me-1" />
          {isAdded ? "Remove" : "Add"}
        </button>
      </div>
    </div>
            </div>
  );
};

export default Card;
