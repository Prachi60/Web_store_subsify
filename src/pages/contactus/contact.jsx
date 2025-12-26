import React from "react";

import { Link } from "react-router-dom";

const ContactUs = () => {
  return (

    <div className="container_fluid">
       
        <div className="product_nav_bar bg-danger py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <span className="text-white">Contact Us</span>
          <div className="d-flex justify-content-end align-items-center gap-2">
          <Link to="/" className="no-link-style"><span className="text-white">Home</span></Link>  
            <span className="text-white">-</span>
            <span className="text-white">Contact Us</span>
          </div>
        </div>
      </div>
  
    <div className="contact-page py-5">
      <div className="container">

        
       
        <p className="text-center text-muted mb-5">
          We're here to help! Reach out to us with any questions or feedback.
        </p>

        <div className="row g-4">

      
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <h4 className="fw-bold mb-3">Send us a message</h4>

              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your name" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="Enter your email" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" placeholder="Enter your phone number" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows="4" placeholder="Write your message here..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>

        
          <div className="col-md-6">
            <div className="card shadow-sm p-4 h-100">
              <h4 className="fw-bold mb-3">Get in Touch</h4>

              <p><strong>Email:</strong> support@subsify.com</p>
              <p><strong>Phone:</strong> +91 1234567890</p>
              <p><strong>Address:</strong> 5171 W Campbell Ave undefined
Kent, Utah 53127 United States</p>

              <hr />

              <h5 className="fw-bold mb-3">Find Us on Map</h5>

              
              <div className="ratio ratio-16x9">
                <iframe
                  title="Google Map"
                
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172865.74605179587!2d-122.4641624929643!3d47.39190056484588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549058122dce6c0d%3A0x5d47c86dbf15005a!2sKent%2C%20WA%2C%20USA!5e0!3m2!1sen!2sin!4v1766379211076!5m2!1sen!2sin" 
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
      </div>
  );
};

export default ContactUs;
