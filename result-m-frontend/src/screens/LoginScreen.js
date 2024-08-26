import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css'
// import UpdatePasswordForm from '../components/UpdatePasswordForm';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [showUpdatePassword, setShowUpdatePassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      const user = data; // Assuming 'data' contains the user object with role information

      // Store user information in localStorage
      localStorage.setItem('userInfo', JSON.stringify(user));

      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'student') {
        navigate('/student/dashboard');
      } else {
        console.error('Unknown user role:', user.role);
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
    }
};


  return (
    <body>
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="login-footer">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
    </body>
    
  );
};

export default LoginScreen;
