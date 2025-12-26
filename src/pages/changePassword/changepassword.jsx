import React, { useState } from "react";
import {  Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
   
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
 
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/changepassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Password changed successfully");

    
   

     
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Change password failed";
      toast.error(errorMsg);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-white text-center py-4">
                <h2 className="fw-bold mb-0">Change Password</h2>
              </div>

              <div className="card-body p-4 p-md-5">
              

                <form onSubmit={handleSubmit}>
            

                  
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Old Password"
                        required
                      />
                      <label htmlFor="oldPassword">Old Password</label>
                    </div>
                  </div>

                
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        required
                      />
                      <label htmlFor="newPassword">New Password</label>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Updating...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <Link to="/" className="fw-bold text-decoration-none">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
