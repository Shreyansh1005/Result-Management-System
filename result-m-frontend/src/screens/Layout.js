import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header'; // Import your Header component
import Footer from '../components/Footer'; // Import your Footer component

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Define routes where header and footer should not be displayed
  const hideHeaderFooterRoutes = ['/login', '/register'];
  
  // Check if current route should hide header and footer
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
  
  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main>
        {children}
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
