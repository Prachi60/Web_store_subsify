
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../../assets/subsify.png";
import googlePlay from "../../assets/google-play.png";
import appStore from "../../assets/app-store.png";
import visa from "../../assets/visa.png";
import master from "../../assets/mastercard.png";
import paypal from "../../assets/paypal.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-dark pt-5">
      <div className="container">
        <div className="row">
     
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="fw-bold d-flex align-items-center">
              <img src={Logo} alt="Subsify Logo" width="200" className="me-2" />
            </h4>
            <p>Awesome grocery store website</p>
            <p className="d-flex align-items-center mb-2">
              <FaMapMarkerAlt className="me-2 text-secondary" />
              <span>Address: 5171 W Campbell Ave undefined<br />Kent, Utah 53127 United States</span>
            </p>
            <p className="d-flex align-items-center mb-2">
              <FaPhoneAlt className="me-2 text-secondary" />
              <span>Call: (91)-502-025-12543</span>
            </p>
            <p className="d-flex align-items-center mb-2">
              <FaEnvelope className="me-2 text-secondary" />
              <span>Email: info@subsify.com</span>
            </p>
          </div>

       
          <div className="col-lg-2 col-md-6 col-6 mb-4">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-dark text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/privacypolicy" className="text-dark text-decoration-none">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-dark text-decoration-none">Terms & Conditions</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-dark text-decoration-none">Contact Us</Link></li>
              <li className="mb-2"><Link to="/support" className="text-dark text-decoration-none">Support Center</Link></li>
              <li className="mb-2"><Link to="/career" className="text-dark text-decoration-none">Careers</Link></li>
            </ul>
          </div>

         
          <div className="col-lg-2 col-md-6 col-6 mb-4">
            <h6 className="fw-bold mb-3">Account</h6>
            <ul className="list-unstyled">

              <li className="mb-2"><Link to="/cart" className="text-dark text-decoration-none">View Cart</Link></li>
              <li className="mb-2"><Link to="/wishlist" className="text-dark text-decoration-none">My Wishlist</Link></li>
              <li className="mb-2"><Link to="/myorder" className="text-dark text-decoration-none">Shipping Details</Link></li>
            </ul>
          </div>

    
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Install App</h6>
            <p>From App Store or Google Play</p>
            <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
              <img src={googlePlay} alt="Google Play" className="img-fluid" style={{ width: "100px" }} />
              <img src={appStore} alt="App Store" className="img-fluid" style={{ width: "100px" }} />
            </div>
            <p>Secure Payment Gateways</p>
            <div className="d-flex gap-2">
              <img src={visa} alt="Visa" width="40" />
              <img src={master} alt="Mastercard" width="40" />
              <img src={paypal} alt="PayPal" width="40" />
            </div>
          </div>
        </div>

        <hr />

      
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
          <div className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">© 2022, subsify - Ecommerce</p>
            <p className="mb-0">All rights reserved</p>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-3 mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <FaPhoneAlt className="me-2" />
              <div>
                <span className="d-block">1900646666</span>
                <small>Working 8:00-22:00</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FaPhoneAlt className="me-2" />
              <div>
                <span className="d-block">1900648888</span>
                <small>24/7 Support Center</small>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column align-items-center align-items-md-end">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2">Follow us on:</span>
              <div className="d-flex gap-2">
                <Link to="https://www.facebook.com/" className="text-dark"><FaFacebookF /></Link>
                <Link to="https://www.instagram.com/" className="text-dark"><FaInstagram /></Link>
                <Link to="https://www.youtube.com/" className="text-dark"><FaYoutube /></Link>
                <Link to="https://x.com/" className="text-dark"><FaTwitter /></Link>
              </div>
            </div>
            <p className="mb-0">Up to 15% discount on your first subscribe</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
