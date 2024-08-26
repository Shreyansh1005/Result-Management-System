import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">© 2024 Result Management System</p>
        <div className="footer-links">
        <Link className="footer-link" to="/about-us">About Us</Link>
          <Link className="footer-link" to="/contact-us">Contact Us</Link>
          <Link className="footer-link" to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
