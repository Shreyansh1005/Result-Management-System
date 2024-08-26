import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  // If the token exists, allow access to the protected route (i.e., AdminDashboard)
  // If not, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/login" />;
};


export default PrivateRoute;