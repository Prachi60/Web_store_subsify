import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const Order = () => {
  const [address, setAddress] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [duration, setDuration] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [cartItemIds, setCartItemIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState();
  const [paymentMode, setPaymentMode] = useState("");
  const [subscriptionId, setSubscriptionId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { state } = useLocation();
  
  useEffect(() => {
    if (state) {
      setSubscriptionType(state.subscriptionType);
      setDuration(state.duration);
      setSubscriptionId(state.subscriptionId);
    }
  }, [state]);

  let decoded = null;
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      // navigate("/login");
    }
  }

  // useEffect(() => {
  //   if (!token) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Please Login",
  //       text: "You must login before placing an order.",
  //     }).then(() => {
  //       navigate("/login");
  //     });
  //   }
  // }, [token]);



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/getcartitem`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const cartItems = res.data.result.cart;
        setCartItems(cartItems);
        const ids = cartItems.map((item) => item._id);
        setCartItemIds(ids);

       
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [token]);

  useEffect(() => {
    if (!cartItemIds.length || !subscriptionType || !duration) return;

    const fetchTotal = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/get-total`,
          {
            cartItemIds,
            SubscriptionType: subscriptionType,
            duration,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrderSummary(res.data.result);
        setFinalAmount(res.data.result.finalAmount);
      } catch (error) {
        console.error("Error fetching total:", error);
      }
    };

    fetchTotal();
  }, [cartItemIds, subscriptionType, duration]);

  const startRazorpayPayment = async () => {
    try {

      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/createOrder`,
        { amount: finalAmount, user: decoded.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      

      const Razorpay_id = orderRes.data.result.Razorpay_id;
      const userId = orderRes.data.result.userId;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: finalAmount,
        user: userId,
        order_id: Razorpay_id,

        

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: decoded.id,
                address,
                finalAmount,
                subscriptionId,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            setOrderPlaced(true);
            setOrderData(verifyRes.data.result);

            // clearCartLocalStorage();

            Swal.fire("Success!", "Payment completed successfully", "success");
            navigate("/myorder");

          } catch (error) {
            console.error(error);
            Swal.fire("Error", "Verification Failed", "error");
          }
        },

        prefill: {
          name: "rohan",
          email: "rohan@gmail.com",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment initialization failed");
    }
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      toast.error("Please login to place your order");
      return;
    }

    if (!address || !paymentMode) {
      toast.error("Please fill all fields");
      return;
    }
    if (paymentMode === "online") {
      startRazorpayPayment();
    }

    // if (paymentMode === "cod") {
    //   try {
    //     const res = await axios.post(
    //       `${import.meta.env.VITE_API_URL}/user/placeorder`,
    //       { address, subscriptionType },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     Swal.fire({
    //       title: "Order Placed!",
    //       text: "Your order has been placed successfully.",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });

    //     setOrderPlaced(true);

    //     setOrderData(res.data.result);
    //     clearCartLocalStorage();
    //     console.log(res.data);
    //   } catch (error) {
    //     toast.error("Error placing order");
    //   }
    // }
  };

  const getDurationDays = (duration) => {
    if (!duration) return 0;

    if (duration === "7days") return 7;
    if (duration === "15days") return 15;
    if (duration === "30days") return 30;
     if(duration==="4days") return 4;
  if(duration==="8days") return 8;
  if(duration==="15days") return 15;


    if (duration === "1week") return 1;
    if (duration === "2week") return 2;
    if (duration === "3week") return 3;
    if (duration === "4week") return 4;

    if (duration === "1month") return 1;
    if (duration === "2month") return 2;
    if (duration === "3month") return 3;
    if (duration === "6month") return 4;

    return 0;
  };
  const durationDays = getDurationDays(duration);

  const perDayPrice = cartItems.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const calculatedSubtotal = perDayPrice * durationDays;
   console.log(calculatedSubtotal,"total");
   console.log("duration days",durationDays);

  return (
    <div className="container_fluid bg-white">
      <div className="product_nav_bar bg-danger py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <span className="text-white"> Orders</span>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <Link
              to="/"
              className="no-link-style text-white text-decoration-none"
            >
              <span>Home</span>
            </Link>
            <span className="text-white">-</span>
            <span className="text-white">Orders</span>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h3>Checkout</h3>

        <div className="card p-3 mb-3">
          <h5>Delivery Address <sup className="text-danger">*</sup></h5>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        

       
        {cartItems.length > 0 && (
          <div className="card p-3 mb-3">
            <h5>Order Summary</h5>

            {cartItems.map((item, index) => (
              <div
                className="d-flex justify-content-between mb-2"
                key={item._id}
              >
                <span>{item.product?.name}</span>
                <span>
                  ₹{item.product?.price} × {item.quantity}
                </span>
              </div>
            ))}

            <hr />

           
            <div className="d-flex justify-content-between mb-2">
              <span>Per Day Price</span>
              <span>₹{perDayPrice}</span>
            </div>

            {durationDays > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span>
                  No. of Deliveries
                  <small className="text-muted"> ( in days)</small>
                </span>
                <span> {durationDays}</span>
              </div>
            )}

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{calculatedSubtotal}</span>
             
              
            </div>

            <div className="d-flex justify-content-between text-success">
              <span>
                Discount
                <small className="text-muted">
                  {" "}
                  ({orderSummary?.discountPercent || 0}%)
                </small>
              </span>
              <span>- ₹{orderSummary?.discountAmount || 0}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Platform Fee</span>
              <span>₹{orderSummary?.platformFee || 0}</span>
            </div>

            <hr />

            <h5 className="d-flex justify-content-between">
              <span>Total Payable</span>
              <span>₹{finalAmount}</span>
            </h5>
          </div>
        )}

        <div className="card p-3 mb-3">
          <h5>Payment Mode <sup className="text-danger">*</sup></h5>
          <select
            className="form-select"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
          >
            <option value="">select the payment mode</option>
            <option value="online">Online</option>
          </select>
        </div>
        <span>
          Total Payable :<strong>₹{finalAmount}</strong>{" "}
        </span>
        {!orderPlaced && (
          <div className="text-end">
            <button className="btn btn-warning" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
