
import React from "react";

import { Link } from "react-router-dom";

import Homedelivery from "../../assets/HomeDelivery.png";
import onlineShopping from "../../assets/onlineShopping.png";
import "./About.css";

const About = () => {
  return (
    <>
      

   
      <div className="product_nav_bar bg-danger py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="text-white">About</span>
          <div className="d-flex gap-2">
            <Link to="/" className="no-link-style text-white">Home</Link>
            <span className="text-white">-</span>
            <Link to="/about" className="no-link-style text-white">About</Link>
          </div>
        </div>
      </div>

      <div className="container mt-5">
  

       
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <p className="fs-5">
              Welcome to our subscription platform — a place where technology,
              innovation, and user experience come together to create meaningful
              value. We believe that powerful digital tools should be accessible
              to everyone, not just to those who can afford expensive software.
              That is why we built a platform that delivers premium features at
              a fair and flexible price.
            </p>
          </div>

          <div className="col-lg-6 col-md-12 text-center">
            <img
              src={Homedelivery}
              alt="Home Delivery"
              className="img-fluid"
            />
          </div>
        </div>

    
        <div className="row align-items-center mb-5 flex-lg-row flex-column-reverse">
          <div className="col-lg-6 col-md-12 text-center">
            <div className="online_shop_about">
              <img
                src={onlineShopping}
                alt="Online Shopping"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <h4 className="text-center text-lg-start">Who We Are</h4>
            <p className="fs-5">
              We are a team of passionate creators, developers, and
              problem-solvers who believe that great digital experiences
              shouldn’t be limited to a few. Whether you’re a student,
              professional, or business owner, we provide subscription plans
              designed to fit your needs.
            </p>

            <h4 className="mt-4 text-center text-lg-start">
              Our mission is simple:
            </h4>

            <ul className="fs-5">
              <li>Deliver high-quality features</li>
              <li>Offer flexible and affordable plans</li>
              <li>Make your experience better with every update</li>
            </ul>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default About;
