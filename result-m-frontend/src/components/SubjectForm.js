import React, { useState } from 'react';
import axios from 'axios';
import './SubjectForm.css';

const SubjectForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/subjects',
        {
          name: subjectName,
          code: subjectCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Subject created:', response.data);
    } catch (error) {
      console.error('There was an error creating the subject:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-subject-form">
  <label htmlFor="subjectName">Subject Name:</label>
  <input
    id="subjectName"
    type="text"
    value={subjectName}
    onChange={(e) => setSubjectName(e.target.value)}
    required
  />
  <label htmlFor="subjectCode">Subject Code:</label>
  <input
    id="subjectCode"
    type="text"
    value={subjectCode}
    onChange={(e) => setSubjectCode(e.target.value)}
    required
  />
  <button type="submit">Create Subject</button>
</form>
  );
};

export default SubjectForm;
