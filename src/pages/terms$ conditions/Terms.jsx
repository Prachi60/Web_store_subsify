import React from "react";

import { Link } from "react-router-dom";


const TermsAndConditions = () => {
  return (
    <div className="container_fluid">
      
        <div className="product_nav_bar bg-danger py-3">
                <div className="container d-flex align-items-center justify-content-between">
                  <span className="text-white">Terms & Conditions</span>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link to="/" className="no-link-style"><span className="text-white">Home</span></Link>  
                    <span className="text-white">-</span>
                    <span className="text-white">Terms & Conditions</span>
                  </div>
                </div>
              </div>
    <div className="terms-page py-5">
      <div className="container">

 
        <p className="text-center text-muted mb-5">
          Last updated: {new Date().toLocaleDateString()}
        </p>

       
        <section className="mb-4">
          <h4 className="fw-bold">1. Acceptance of Terms</h4>
          <p>
            By accessing or using our Daily Subscription Service (“Service”), you agree to be bound
            by these Terms & Conditions. If you do not agree, do not use our platform.
          </p>
        </section>

     
        <section className="mb-4">
          <h4 className="fw-bold">2. Description of Service</h4>
          <p>
            Our platform provides daily subscription-based services, including but not limited to
            doorstep deliveries, digital access, or recurring products. Service availability may
            vary by region.
          </p>
        </section>

       
        <section className="mb-4">
          <h4 className="fw-bold">3. User Responsibilities</h4>
          <ul>
            <li>You must provide accurate account information.</li>
            <li>You are responsible for maintaining login confidentiality.</li>
            <li>You must notify us immediately of unauthorized account use.</li>
            <li>You agree not to misuse or exploit the service.</li>
          </ul>
        </section>

      
        <section className="mb-4">
          <h4 className="fw-bold">4. Subscription & Payments</h4>
          <p>By subscribing, you agree to the following:</p>
          <ul>
            <li>Subscription fees must be paid in advance.</li>
            <li>Auto-renewal may apply depending on your selected plan.</li>
            <li>Failed payments may lead to service interruption.</li>
            <li>Prices may change, but you will be notified beforehand.</li>
          </ul>
        </section>

    
        <section className="mb-4">
          <h4 className="fw-bold">5. Refund & Cancellation Policy</h4>
          <ul>
            <li>You may cancel your subscription anytime via your account dashboard.</li>
            <li>Refunds are processed only as per our refund policy.</li>
            <li>Used or partially delivered services may not be refundable.</li>
          </ul>
        </section>

    
        <section className="mb-4">
          <h4 className="fw-bold">6. Service Availability</h4>
          <p>
            We strive to maintain uninterrupted service but cannot guarantee availability due to:
          </p>
          <ul>
            <li>Technical issues</li>
            <li>Weather or external conditions</li>
            <li>Maintenance or upgrades</li>
          </ul>
        </section>

        
        <section className="mb-4">
          <h4 className="fw-bold">7. Prohibited Activities</h4>
          <p>You agree NOT to:</p>
          <ul>
            <li>Use the service for unlawful purposes.</li>
            <li>Copy, distribute, or reverse-engineer platform code.</li>
            <li>Interfere with system security or functionality.</li>
          </ul>
        </section>

       
        <section className="mb-4">
          <h4 className="fw-bold">8. Intellectual Property Rights</h4>
          <p>
            All content, logos, branding, and materials on the platform are owned by us.
            Unauthorized use is strictly prohibited.
          </p>
        </section>

      
        <section className="mb-4">
          <h4 className="fw-bold">9. Limitation of Liability</h4>
          <p>
            We are not liable for indirect, incidental, or consequential damages
            arising from service usage, delays, or interruptions.
          </p>
        </section>

   
        <section className="mb-4">
          <h4 className="fw-bold">10. Third-Party Services</h4>
          <p>
            We may integrate third-party tools (payment gateways, SMS APIs, etc.).
            We are not responsible for their actions or policies.
          </p>
        </section>

 
        <section className="mb-4">
          <h4 className="fw-bold">11. Termination of Account</h4>
          <p>
            We reserve the right to suspend or terminate your account at any time for
            violations of these Terms or suspicious activities.
          </p>
        </section>

    
        <section className="mb-4">
          <h4 className="fw-bold">12. Changes to Terms</h4>
          <p>
            We may update these Terms from time to time. Continued use of the
            service means you accept the revised Terms.
          </p>
        </section>

    
        <section className="mb-4">
          <h4 className="fw-bold">13. Contact Us</h4>
          <p>
            For questions or concerns about these Terms, contact us at:
          </p>
          <p className="fw-bold mb-0">📧 support@subsify.com</p>
        </section>
      </div>
    </div>

    </div>
  );
};

export default TermsAndConditions;
