
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.result); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">
        <div >
       <Link to="/">  <button className="btn btn-danger">Back To home</button></Link>    
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body text-center">

              
              <h4 className="mb-1">{user?.name}</h4>
              <p className="text-muted text-capitalize">{user?.role}</p>

              <hr />

              <div className="text-start">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.contact_number}</p>
                <p><strong>Address:</strong> {user?.address}</p>
                <p><strong>Pincode:</strong> {user?.pincode}</p>
              </div>

              {/* <button className="btn btn-primary w-100 mt-3">
                Edit Profile
              </button> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
