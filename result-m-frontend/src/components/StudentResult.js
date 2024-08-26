import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import './StudentResult.css';

const StudentResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const Id = userInfo._id; // Assuming userInfo contains the logged-in user's ID
      const name = userInfo.name || 'Student'; // Get student name from userInfo

      try {
        // Fetch results
        const resultsResponse = await axios.get(`http://localhost:5000/api/results/${Id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resultsData = resultsResponse.data;

        setStudentName(name); // Set student name
        setResults(resultsData);
        calculateSummary(resultsData);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const calculateSummary = (results) => {
    const totalSubjects = results.length;
    const totalMarks = totalSubjects * 100;
    const obtainedMarks = results.reduce((sum, result) => sum + result.marks, 0);

    const { percentage, feedback } = getPerformanceSummary(totalMarks, obtainedMarks);
    setTotalMarks(totalMarks);
    setObtainedMarks(obtainedMarks);
    setPercentage(percentage);
    setFeedback(feedback);
  };

  const getPerformanceSummary = (totalMarks, obtainedMarks) => {
    const percentage = (obtainedMarks / totalMarks) * 100;
    let feedback = '';

    if (percentage >= 90) {
      feedback = 'Excellent performance! Keep it up!';
    } else if (percentage >= 75) {
      feedback = 'Good job! But there’s room for improvement.';
    } else if (percentage >= 50) {
      feedback = 'You passed, but consider putting in more effort.';
    } else {
      feedback = 'You might need to review and study harder next time.';
    }

    return { percentage, feedback };
  };

  const getSubjectRank = (subjectId, studentMarks) => {
    // Dummy data - replace with actual fetch logic from the database or API
    const allStudentsMarks = [
      { studentId: 'student1', marks: 85 },
      { studentId: 'student2', marks: 90 },
      { studentId: 'student3', marks: 78 },
      { studentId: 'student4', marks: studentMarks }, // Current student
      // ... other students
    ];

    // Sort by marks in descending order
    allStudentsMarks.sort((a, b) => b.marks - a.marks);

    // Find the rank of the current student
    const rank = allStudentsMarks.findIndex(student => student.marks === studentMarks) + 1;

    return rank;
  };

  const exportResultsAsPDF = (studentResults) => {
    const doc = new jsPDF();

    // Set document title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Student Results', 20, 20);
    
    // Set student name
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Student Name: ${studentName}`, 20, 30);

    // Define table column and rows
    const tableColumn = ['Subject', 'Marks Obtained', 'Total Marks', 'Rank'];
    const tableRows = [];

    studentResults.forEach(result => {
        const resultData = [
            result.subject.name,
            result.marks,
            100, // Assuming each subject has 100 marks
            getSubjectRank(result.subject._id, result.marks),
        ];
        tableRows.push(resultData);
    });

    // Set table styling
    const tableOptions = {
        startY: 40,
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255], fontSize: 12 },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 20 },
    };

    doc.autoTable(tableColumn, tableRows, tableOptions);

    // Add summary info
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    const y = doc.lastAutoTable.finalY;
    doc.text(`Total Marks: ${obtainedMarks} / ${totalMarks}`, 20, y + 10);
    doc.text(`Percentage: ${percentage}%`, 20, y + 20);
    doc.text(`Feedback: ${feedback}`, 20, y + 30);

    // Save the document
    doc.save('student_results.pdf');
};

const handleExport = () => {
  exportResultsAsPDF(results);
};

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p>Error fetching results: {error}</p>;
  }

  return (
    <div className="student-result-container">
      <h1>Student Result</h1>
      <p><strong>Student Name:</strong> {studentName}</p>
      <p><strong>Total Marks:</strong> {obtainedMarks} / {totalMarks}</p>
      <p><strong>Percentage:</strong> {percentage}%</p>
      <p><strong>Feedback:</strong> {feedback}</p>
      <button onClick={handleExport}>Export Results as PDF</button>

      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
              <th>Total Marks</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{result.subject.name}</td>
                <td>{result.marks}</td>
                <td>100</td>
                <td>{getSubjectRank(result.subject._id, result.marks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentResult;
