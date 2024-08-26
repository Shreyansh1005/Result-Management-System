import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1 className="about-us-title">About Us</h1>
            <p className="about-us-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. 
                Aliquam erat volutpat. Curabitur euismod, nulla a vestibulum aliquet, sapien velit consectetur lectus, 
                et lacinia nisi orci at eros. Suspendisse potenti. 
            </p>
            <p className="about-us-text">
                Mauris auctor, felis nec interdum luctus, libero est ultricies lacus, nec dignissim arcu ligula eu turpis. 
                Nullam malesuada, libero nec interdum mollis, arcu lacus tincidunt velit, et convallis tortor libero ut augue.
            </p>
        </div>
    );
};

export default AboutUs;
