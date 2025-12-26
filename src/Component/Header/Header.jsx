
import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../../assets/subsify.png";

const Header = () => {
  return (
    <header className="shadow-sm bg-white">
   
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
        <div className="container">
      
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

         
          <Link to="/" className="navbar-brand d-flex align-items-center me-auto me-lg-0">
            
            <h5 className="mb-0 fw-bold">Subsify</h5>
          </Link>

        
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
            </ul>
          </div>

     
          <div className="d-flex align-items-center ms-auto ms-lg-0">
            <div className="d-flex align-items-center gap-1 text-dark text-decoration-none">
              <MdOutlinePhone className="text-danger d-none d-sm-inline" />
              <span className="d-none d-sm-inline">+123(456)(7890)</span>
            </div>
          </div>
        </div>
      </nav>

      
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="mobileMenuLabel">
            <img
              src={Logo}
              alt="Subsify Logo"
              width="100"
              height="auto"
              className="me-2"
            />
            Subsify
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
