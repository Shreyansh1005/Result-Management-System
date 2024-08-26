// src/components/StudentDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleViewResults = () => {
    navigate('/student/results');
  };

  return (
    <div className="student-dashboard">
      <h1>Get your Result,All the best!</h1>
      <button onClick={handleViewResults}>View Results</button>
      <p>Here you can view your academic progress </p>
      {/* <ul>
        <li>View Your Results</li>
        <li>Update Your Profile</li>
        <li>Contact Support</li>
      </ul> */}
    </div>
  );
};

export default StudentDashboard;
