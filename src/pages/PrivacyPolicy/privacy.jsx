import React from "react";

import { Link } from "react-router-dom";


const PrivacyPolicy = () => {
  return (
    <div className="container_fluid">

        <div className="product_nav_bar bg-danger py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <span className="text-white">Privacy Policy</span>
          <div className="d-flex justify-content-end align-items-center gap-2">
          <Link to="/" className="no-link-style"><span className="text-white">Home</span></Link>  
            <span className="text-white">-</span>
            <span className="text-white">Privacy Policy</span>
          </div>
        </div>
      </div>
    <div className="privacy-policy py-5">
      <div className="container">

    
        <p className="text-center text-muted mb-5">
          Last updated: {new Date().toLocaleDateString()}
        </p>

  
        <section className="mb-4">
          <h4 className="fw-bold">1. Introduction</h4>
          <p>
            Welcome to our Daily Subscription Service. We value your privacy and
            are committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, store, and safeguard your information.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold">2. Information We Collect</h4>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Details:</strong> Name, email, phone number, address.</li>
            <li><strong>Billing Information:</strong> Payment details for subscription plans.</li>
            <li><strong>Usage Data:</strong> Pages visited, actions performed, device info.</li>
            <li><strong>Location Data:</strong> Approximate location for service availability.</li>
          </ul>
        </section>

     
        <section className="mb-4">
          <h4 className="fw-bold">3. How We Use Your Information</h4>
          <ul>
            <li>To provide and manage your daily subscription services.</li>
            <li>To process payments securely.</li>
            <li>To improve user experience and app performance.</li>
            <li>To send alerts, reminders, and promotional updates.</li>
            <li>To ensure service availability in your area.</li>
          </ul>
        </section>

    
        <section className="mb-4">
          <h4 className="fw-bold">4. Sharing Your Information</h4>
          <p>
            We do not sell your personal information. However, we may share data
            with:
          </p>
          <ul>
            <li>Trusted third-party service providers (payment gateways, SMS APIs).</li>
            <li>Delivery partners involved in fulfilling daily orders.</li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

       
        <section className="mb-4">
          <h4 className="fw-bold">5. Data Security</h4>
          <p>
            We use encrypted systems and secure protocols to protect your data
            from unauthorized access, leakage, or misuse. However, no digital
            transfer is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

     
        <section className="mb-4">
          <h4 className="fw-bold">6. Cookies & Tracking Technologies</h4>
          <p>
            Our website/app may use cookies to enhance user experience, remember
            your preferences, and analyze usage patterns.
          </p>
        </section>

    
        <section className="mb-4">
          <h4 className="fw-bold">7. Your Rights</h4>
          <p>You may request to:</p>
          <ul>
            <li>Access the personal data we hold.</li>
            <li>Update or correct inaccurate information.</li>
            <li>Delete your account and associated data.</li>
            <li>Opt out of marketing communications.</li>
          </ul>
        </section>

     
        <section className="mb-4">
          <h4 className="fw-bold">8. Children’s Privacy</h4>
          <p>
            Our services are not intended for individuals under 13 years of age.
            We do not knowingly collect information from children.
          </p>
        </section>

      
        <section className="mb-4">
          <h4 className="fw-bold">9. Changes to This Privacy Policy</h4>
          <p>
            We may update our Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>
        </section>

  
        <section className="mb-4">
          <h4 className="fw-bold">10. Contact Us</h4>
          <p>
            If you have questions about this Privacy Policy or want to request data
            changes, you can contact us at:
          </p>
          <p className="fw-bold">📧 support@subsify.com</p>
        </section>

      </div>
    </div>
    
    </div>
  );
};

export default PrivacyPolicy;
