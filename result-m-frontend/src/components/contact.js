import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h1 className="contact-us-title">Contact Us</h1>
            <p className="contact-us-text">
                Have questions or need assistance? Feel free to reach out to us!
            </p>
            <form className="contact-us-form">
                <input type="text" placeholder="Your Name" className="contact-input" />
                <input type="email" placeholder="Your Email" className="contact-input" />
                <textarea placeholder="Your Message" className="contact-textarea"></textarea>
                <button type="submit" className="contact-button">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
