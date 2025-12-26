import React from "react";

import { Link } from "react-router-dom";


const SupportCenter = () => {
  return (
    <div className="container_fluid">

        <div className="product_nav_bar  bg-danger py-3">
                <div className="container d-flex align-items-center justify-content-between">
                  <span className="text-white">Support</span>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link to="/" className="no-link-style"><span className="text-white">Home</span></Link>  
                    <span className="text-white">-</span>
                    <span className="text-white">Support</span>
                  </div>
                </div>
              </div>

   
    <div className="support-page py-5">
      <div className="container">

        <h1 className="fw-bold text-center">Support Center</h1>
        <p className="text-center text-muted mb-5">
          How can we help you today?
        </p>

     
        <h4 className="fw-bold mb-3">Popular Support Topics</h4>
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="fw-bold">Subscription Issues</h5>
              <p>Manage your daily subscription, pause service, or update details.</p>
              <a href="#" className="text-primary fw-semibold">Learn More →</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="fw-bold">Payments & Billing</h5>
              <p>Understand billing cycles, payment failures, and refund policies.</p>
              <a href="#" className="text-primary fw-semibold">Learn More →</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="fw-bold">Delivery & Orders</h5>
              <p>Track daily orders, delivery status, and report issues.</p>
              <a href="#" className="text-primary fw-semibold">Learn More →</a>
            </div>
          </div>

        </div>

    
        <h4 className="fw-bold mb-3">Frequently Asked Questions</h4>
        <div className="accordion mb-5" id="faqAccordion">

         
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                How do I start a daily subscription?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Go to the Subscription section → Choose a plan → Complete payment.
              </div>
            </div>
          </div>

       
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Can I pause or resume my subscription?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, you can pause/resume your subscription anytime from the dashboard.
              </div>
            </div>
          </div>

         
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                What should I do if my delivery is missed?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                You can report a missed delivery from the Orders section → Report Issue.
              </div>
            </div>
          </div>

        </div>

      
        <h4 className="fw-bold mb-3">Need More Help?</h4>

        <div className="card shadow-sm p-4">
          <div className="row align-items-center">

            <div className="col-md-8">
              <h5 className="fw-bold">Contact Our Support Team</h5>
              <p>If you still need assistance, feel free to reach out anytime.</p>

              <p className="mb-1"><strong>Email:</strong> support@subsify.com</p>
              <p className="mb-1"><strong>Phone:</strong> +91 1234567890</p>
              <p><strong>Live Chat:</strong> Available 9 AM – 10 PM</p>
            </div>

            <div className="col-md-4 text-center">
              <button className="btn btn-primary w-100 py-2 fw-semibold">
                Start Chat Support
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>

     </div>
  );
};

export default SupportCenter;
