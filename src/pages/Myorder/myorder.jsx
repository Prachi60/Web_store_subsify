import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "./myorder.css"

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  const getMyOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getmyorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("MY ORDERS", res.data);

      
      if (res.data.success) {
        setOrders(res.data.result.orders);
      }
    } catch (error) {
      console.log("Error fetching my orders", error.message);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="container_fluid bg-white">
      
    
      <div className="product_nav_bar bg-danger py-3">
        <div className="container d-flex align-items-center justify-content-between text-white">
          <span>My orders</span>
          <div className="d-flex justify-content-end align-items-center gap-2 my_order ">
          <Link to="/" className="no-link-style"><span>Home</span></Link>  
            <span>-</span>
            <span>My orders</span>
          </div>
        </div>
      </div>
 
    <div className="container mt-4">
  <h3 className="mb-4">My Orders</h3>

  {(!orders || orders.length === 0) ? (
    <p>You have no orders yet.</p>
  ) : (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="text-break">{order._id}</td>
              <td>₹{order.totalAmount}</td>
              <td>
                <span >
                  
                  {order.orderStatus}
                </span>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#orderModal-${order._id}`}
                >
                  View
                </button>
              </td>

              <div
                className="modal fade"
                id={`orderModal-${order._id}`}
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Order Details</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      />
                    </div>

                    <div className="modal-body">
                    
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <p><strong>Order ID:</strong> {order._id}</p>
                          <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                          <p><strong>Status:</strong> {order.orderStatus}</p>
                          <p><strong>SubscriptionType:</strong> {order.subscription?.SubscriptionType??"N/A"}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
                          <p><strong>Address:</strong> {order.address??"N/A"}</p>
                          <p><strong>Duration:</strong> {order.subscription?.duration??"N/A"}</p>
                          <p><strong>ShiftTime:</strong> {order.subscription?.shiftTime??"N/A"}</p>
                          
                        </div>
                      </div>

                    
                      <h6>Items</h6>
                      <div className="table-responsive">
                        <table className="table table-sm table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Price (₹)</th>
                              <th>Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items?.map((item) => (
                              <tr key={item._id}>
                                <td>{item.product?.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="modal-footer">
                      
                    </div>
                  </div>
                </div>
              </div>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
};

export default MyOrders;
