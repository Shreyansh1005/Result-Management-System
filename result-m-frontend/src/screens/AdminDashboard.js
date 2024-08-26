import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCreateSubject = () => {
    navigate('/admin/createsubject');
  };

  const handleViewResults = () => {
    navigate('/admin/results');
  };
  const handleAddMarks = () => {
    navigate('/admin/addmarks');
  };
  

  return (
    <div className="admin-dashboard">
      <h1>Hey Admin</h1>
      <button onClick={handleCreateSubject}>Create Subject</button>
      <button onClick={handleViewResults}>View Results</button>
      <button onClick={handleAddMarks}>Add Marks</button>
    </div>
  );
};

export default AdminDashboard;
