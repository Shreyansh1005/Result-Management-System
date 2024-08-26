import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResultScreen = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const filteredResults = results.filter((result) =>
    result.subject.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Results</h1>
      <div>
        <input
          type="text"
          placeholder="Filter by subject"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading results...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h2>Results Summary</h2>
          <p>Total Results: {results.length}</p>
          <p>Average Score: {results.reduce((acc, result) => acc + result.score, 0) / results.length}</p>

          <h2>Results List</h2>
          {filteredResults.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result._id}>
                    <td>{result.subject}</td>
                    <td>{result.score}</td>
                    <td>{new Date(result.date).toLocaleDateString()}</td>
                    <td>{result.remarks}</td>
                    <td>
                      {/* Action buttons for edit, delete */}
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ResultScreen;
