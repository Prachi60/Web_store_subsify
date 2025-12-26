import React from "react";

import { Link } from "react-router-dom";


const CareerPage = () => {
  return (
    <div className="container_fluid">
     
      <div className="product_nav_bar  bg-danger py-3">
              <div className="container d-flex align-items-center justify-content-between">
                <span className="text-white">Career</span>
                <div className="d-flex justify-content-end align-items-center gap-2">
                <Link to="/" className="no-link-style"><span className="text-white">Home</span></Link>  
                  <span className="text-white">-</span>
                  <span className="text-white">Career</span>
                </div>
              </div>
            </div>
   
    <div className="career-page">

    
      <section className="bg-dark text-white text-center py-5 mt-3">
        <div className="container">
          <h1 className="fw-bold">Join Our Team</h1>
          <p className="lead mt-3">
            Be part of the fastest-growing daily subscription platform helping users simplify their everyday life.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Why Work With Us?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h4 className="fw-bold">Flexible Workplace</h4>
                <p>
                  Work remotely or from the office. A culture built around productivity, not location.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h4 className="fw-bold">Fast Career Growth</h4>
                <p>
                  Learn quickly and grow with a subscription platform scaling across India.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h4 className="fw-bold">Impact Millions</h4>
                <p>
                  Your work directly helps users get essential services at their doorstep daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Current Job Openings</h2>

          <div className="row g-4">
       
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold">Frontend Developer</h5>
                  <p className="text-muted">React.js • 1–3 years</p>
                  <p>
                    Build scalable UI for subscription dashboards and customer panels.
                  </p>
                  <button className="btn btn-primary w-100 mt-3">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

        
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold">Backend Developer</h5>
                  <p className="text-muted">Node.js • 2–4 years</p>
                  <p>
                    Design APIs for subscription billing, user authentication, and orders.
                  </p>
                  <button className="btn btn-primary w-100 mt-3">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

        
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold">Marketing Specialist</h5>
                  <p className="text-muted">0–2 years</p>
                  <p>
                    Drive customer acquisition for our daily subscription plans.
                  </p>
                  <button className="btn btn-primary w-100 mt-3">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Our Culture</h2>
          <div className="row align-items-center">
            
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Team Culture"
                className="img-fluid rounded shadow"
              />
            </div>

            <div className="col-md-6 mt-4 mt-md-0">
              <h4 className="fw-bold">A Place to Innovate</h4>
              <p>
                We believe in ownership, creativity, and solving real-world problems.  
                With daily subscription services growing rapidly, we innovate at scale.
              </p>
              <h4 className="fw-bold mt-3">Employee First</h4>
              <p>
                Work-life balance, learning opportunities, mentorship, and a friendly team.
              </p>
            </div>

          </div>
        </div>
      </section>

    
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to Start Your Journey?</h2>
          <p className="mt-3">Join us in building India’s best daily subscription ecosystem.</p>

          <button className="btn btn-light mt-3 px-4 py-2 fw-bold">
            Explore Opportunities
          </button>
        </div>
      </section>

    </div>

     </div>
  );
};

export default CareerPage;
