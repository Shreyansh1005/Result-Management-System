import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultForm.css';

const ResultForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSubjectsAndStudents = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setMessage('No token found, please log in again.');
        return;
      }

      try {
        const [subjectsResponse, studentsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/subjects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSubjects(subjectsResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        setMessage('Error fetching data: ' + error.message);
      }
    };

    fetchSubjectsAndStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/results/add',
        { student: selectedStudent, subject: selectedSubject, marks: marks },
        { headers: { Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json' } }
      );
      
      setMessage('Marks added successfully');
    } catch (error) {
      setMessage('Error adding marks: ' + error.message);
    }
  };

  return (
    <body>
    <div className="result-form-container">
  <h2>Add Student Results</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="student">Select Student:</label>
      <select
        id="student"
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="">Select a student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="subject">Select Subject:</label>
      <select
        id="subject"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">Select a subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="marks">Enter Marks:</label>
      <input
        type="number"
        id="marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />
    </div>
    <button type="submit">Add Marks</button>
  </form>
  {message && <p>{message}</p>}
</div>
</body>

  );
};

export default ResultForm;
