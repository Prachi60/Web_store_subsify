

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  fetchCart,
  setOrderSummary,
  setSubscriptionDetails,
  setIsSubscribed,
} from "../../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { cartItems, orderSummary, subscriptionType, duration, isSubscribed } =
    useSelector((state) => state.cart);

  const [subscriptionId, setSubscriptionId] = useState(null);
  const [showSubModal, setShowSubModal] = useState(false);
  const [subscriptionForm, setSubscriptionForm] = useState({
    product: "",
    SubscriptionType: "",
    duration: "",
    selectedDays: [],
  });


  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);


  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then((res) => toast.success(res.message))
      .catch(() => toast.error("Failed to remove item"));
  };


  const updateQty = async (cartItemId, quantity) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/updatecartitem/${cartItemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchCart());
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const increaseQty = (item) => {
    updateQty(item.cartItemId, item.quantity + 1);
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) {
      handleRemoveFromCart(item._id);
    } else {
      updateQty(item.cartItemId, item.quantity - 1);
    }
  };


  const fetchTotal = async () => {
    try {
      if (!token || cartItems.length === 0) return;

      const cartItemIds = cartItems.map((item) => item.cartItemId);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/get-total`,
        {
          cartItemIds,
          SubscriptionType: subscriptionType,
          duration,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(setOrderSummary(res.data.result));
      dispatch(setSubscriptionDetails({ subscriptionType, duration }));
    } catch {
      toast.error("failed to calculate total");
    }
  };

  useEffect(() => {
    if (subscriptionType && duration && cartItems.length > 0) {
      fetchTotal();
    }
  }, [cartItems, subscriptionType, duration]);

 
  const handleCreateSubscription = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/createsubscription`,
        { ...subscriptionForm, platformfee: 20 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubscriptionId(res.data.result._id);

      dispatch(
        setSubscriptionDetails({
          subscriptionType: subscriptionForm.SubscriptionType,
          duration: subscriptionForm.duration,
        })
      );

      dispatch(
        setIsSubscribed({
          subscriptionType: subscriptionForm.SubscriptionType,
          duration: subscriptionForm.duration,
        })
      );

      toast.success("Subscription created successfully");
      setShowSubModal(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create subscription"
      );
    }
  };
   const getDurationOptions = () => {
    switch (subscriptionForm.SubscriptionType) {
      case "alternate_days":
        return [
          {label:"7 days",value:"4days"},
           {label:"15 days",value:"8days"},
            {label:"30 days",value:"15days"},

        ]
      case "weekly":
        return [
          { label: "1 Week", value: "1week" },
          { label: "2 Weeks", value: "2week" },
          { label: "3 Weeks", value: "3week" },
          { label: "4 Weeks", value: "4week" },
        ];

      case "monthly":
        return [
          { label: "1 Month", value: "1month" },
          { label: "2 Months", value: "2month" },
          { label: "3 Months", value: "3month" },
          { label: "6 Months", value: "6month" },
        ];

      default:
        return [
          { label: "7 Days", value: "7days" },
          { label: "15 Days", value: "15days" },
          { label: "30 Days", value: "30days" },
        ];
    }
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
    if (duration === "4week") return 28;

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


  const placeOrder = () => {
    navigate("/placeorder", {
      state: { subscriptionType, duration, subscriptionId },
    });
  };

 
  return (
    <div className="bg-white min-vh-100">
      <div className="bg-danger py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="text-white">Cart</span>
          <div className="d-flex gap-2">
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
            <span className="text-white">-</span>
            <Link to="/cart" className="text-white text-decoration-none">
              Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <h2 className="mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h4 className="text-center my-5">No Items in Cart</h4>
            <Link to="/">
              <button className="btn btn-danger">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">Image</th>
                      <th>Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Subtotal</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const prod = item;
                      const price = prod.price;
                      const qty = item.quantity || 1;

                      return (
                        <tr key={item._id}>
                          <td className="text-center">
                            <img
                              // src={`${import.meta.env.VITE_API_URL}${
                              //   prod.image
                              // }`}
                               src={product.image}

                              alt="product"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{prod.name}</td>
                          <td className="text-center">₹{price}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => decreaseQty(item)}
                              >
                                -
                              </button>
                              <span className="">{qty}</span>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => increaseQty(item)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center">₹{price * qty}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                Swal.fire({
                                  title: "Are You Sure?",
                                  text: "This item will be removed",
                                  showCancelButton: true,
                                  confirmButtonColor: "#d33",
                                  confirmButtonText: "Remove",
                                }).then((res) => {
                                  if (res.isConfirmed) {
                                    handleRemoveFromCart(item._id);
                                  }
                                })
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="mb-3">Order Summary</h5>
                 <div className="d-flex justify-content-between mb-2">
                    <span>Per Day Price</span>
                     <span>₹{perDayPrice}</span>
                   </div>
                   {durationDays > 0 && (
                    <div className="d-flex justify-content-between mb-2">
                       <span>
                         Duration
                         <small className="text-muted"> (in days)</small>
                       </span>
                       <span> {durationDays} </span>
                     </div>
                   )}
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{calculatedSubtotal|| 0}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount  <small className="text-muted">
                     
                         ({orderSummary?.discountPercent || 0}%) </small></span>
                    <span className="text-success">
                      - ₹{orderSummary?.discountAmount || 0}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Platform Fee</span>
                    <span>₹{orderSummary?.platformFee || 0}</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total</span>
                    <span>₹{orderSummary?.finalAmount || 0}</span>
                  </div>

                  <button
                    className="btn btn-danger w-100 mb-2"
                    onClick={() => {
                      if (cartItems.length === 0) {
                        toast.error("Cart is empty");
                        return;
                      }
                      setSubscriptionForm((prev) => ({
                        ...prev,
                        product: cartItems[0]?._id,
                      }));
                      setShowSubModal(true);
                    }}
                  >
                    Subscribe
                  </button>

                  <button
                    className="btn btn-warning w-100 place_order_button"
                    disabled={!isSubscribed}
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

     
      {showSubModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Subscription</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSubModal(false)}
                />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Subscription Type</label>
                  <select
                    className="form-select"
                    value={subscriptionForm.SubscriptionType}
                    onChange={(e) =>
                      setSubscriptionForm({
                        ...subscriptionForm,
                        SubscriptionType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="daily">Daily</option>
                    <option value="alternate_days">Alternate Days</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Shift Time</label>
                  <select
                    className="form-select"
                    value={subscriptionForm.shiftTime}
                    onChange={(e) =>
                      setSubscriptionForm({
                        ...subscriptionForm,
                        shiftTime: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Shift</option>
                    <option value="morning">Morning (6 AM - 10 AM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (5 PM - 9 PM)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <select
                    className="form-select"
                    value={subscriptionForm.duration}
                    onChange={(e) =>
                      setSubscriptionForm({
                        ...subscriptionForm,
                        duration: e.target.value,
                      })
                    }
                    disabled={!subscriptionForm.SubscriptionType}
                  >
                    <option value="">Select Duration</option>
                  
                  {getDurationOptions().map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              
               {subscriptionForm.SubscriptionType === "weekly" && (
                 <>
                     <div className="mb-3">
                       <label className="form-label">Select Days</label>
                       <div className="d-flex flex-wrap gap-2">
                   {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
                           (day) => (
                             <div className="form-check" key={day}>
                               <input
                                 type="checkbox"
                                 className="form-check-input"
                                 checked={subscriptionForm.selectedDays.includes(
                                  day
                                )}
                                onChange={(e) => {
                                  const updatedDays = e.target.checked
                                    ? [...subscriptionForm.selectedDays, day]
                                    : subscriptionForm.selectedDays.filter(
                                        (d) => d !== day
                                      );

                                  setSubscriptionForm({
                                     ...subscriptionForm,
                                    selectedDays: updatedDays,
                                  });
                                }}
                              />
                              <label className="form-check-label text-capitalize">
                                {day}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

                {subscriptionForm.SubscriptionType === "monthly" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={subscriptionForm.startDate}
                        onChange={(e) =>
                          setSubscriptionForm({
                            ...subscriptionForm,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowSubModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={()=>handleCreateSubscription()}
                >
                  Confirm Subscription
                </button>
              </div>
            </div>
          </div>
          </div>
        
      )}
    </div>
  );
};

export default Cart;
