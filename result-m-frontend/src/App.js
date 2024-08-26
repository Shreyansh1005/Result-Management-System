import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboard from './screens/AdminDashboard';
import ResultScreen from './screens/ResultScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import SubjectForm from './components/SubjectForm';
import ResultList from './components/ResultList';
import ResultForm from './components/ResultForm';
import StudentDashboard from './components/StudentDashboard';
import StudentResult from './components/StudentResult';
import AboutUs from './components/about';
import ContactUs from './components/contact';
import PrivacyPolicy from './components/privacy';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/results" element={<StudentResult />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />


          {/* Wrap protected routes with PrivateRoute */}
          <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="createsubject" element={<SubjectForm />} />
          <Route path="results" element={<ResultList />} />
          <Route path="addmarks" element={<ResultForm />} />
        </Route> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
