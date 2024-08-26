import React from 'react';
// import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  let headerContent = '';
  let subContent = '';

  switch (location.pathname) {
    case '/login':
      headerContent = 'Welcome to Login Page';
      subContent='Login yourself as a student or admin';
      break;
    case '/student/dashboard':
      headerContent = 'Welcome to Student Dashboard';
      break;
    case '/register':
      headerContent = 'Register Yourself';
      break;
    case '/student/results':
      headerContent = ' Every result is a stepping stone to improvement!';
      break;
    case '/admin':
      headerContent = 'Welcome to the Admin Dashboard';
      break;
    case '/admin/createsubject':
      headerContent = 'Add your subjects';
      break;
    case '/admin/addmarks':
      headerContent = 'Enter the student marks';
      break;
    case '/admin/results':
      headerContent = 'Added students result list';
      break;
    // Add other cases as needed
    default:
      headerContent = 'Welcome to the Result Management System';
      subContent='Your academic journey starts here'
  }
  return (
    <header className="custom-header">
  <div className="header-content">
    <h1>{headerContent}</h1>
    <p>{subContent}</p>
  </div>
</header>


  );
};

export default Header;
