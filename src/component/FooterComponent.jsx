// Footer.js
import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className='footerMainCss'>
    <div className="footer-container">
      <div className="footer-content" style={{margin: '2%'}}>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Twitter</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
