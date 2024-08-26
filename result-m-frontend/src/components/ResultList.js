import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultList.css';

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [newMarks, setNewMarks] = useState('');
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'student.name', direction: 'ascending' });
  const [selectedResults, setSelectedResults] = useState([]); // New state for bulk actions

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
        setFilteredResults(response.data); // Initialize filteredResults with all results
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    filterResults(); // Apply filter whenever filter state changes
  }, [filter]);

  const filterResults = () => {
    const filtered = results.filter(
      (result) =>
        result.student.name.toLowerCase().includes(filter.toLowerCase()) ||
        result.subject.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const sortResults = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });

    const sortedResults = [...filteredResults].sort((a, b) => {
      const aValue = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], a);
      const bValue = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], b);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'ascending' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setFilteredResults(sortedResults);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  const updateResult = async (resultId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/results/${resultId}`,
        { marks: newMarks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedResult = response.data;
      setResults((prevResults) =>
        prevResults.map((result) => (result._id === updatedResult._id ? updatedResult : result))
      );
      setFilteredResults((prevFiltered) =>
        prevFiltered.map((result) => (result._id === updatedResult._id ? updatedResult : result))
      );
      setSelectedResult(null);
      setNewMarks('');
    } catch (err) {
      console.error('Error updating result:', err);
      alert('Failed to update result.');
    }
  };


  

  const deleteResult = async (resultId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/results/${resultId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(results.filter((result) => result._id !== resultId));
      setFilteredResults(filteredResults.filter((result) => result._id !== resultId));
      alert('Result deleted successfully.');
    } catch (err) {
      console.error('Error deleting result:', err);
      alert('Failed to delete result.');
    }
  };

  const handleBulkDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selectedResults.map((resultId) =>
          axios.delete(`http://localhost:5000/api/results/${resultId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      setResults(results.filter((result) => !selectedResults.includes(result._id)));
      setFilteredResults(filteredResults.filter((result) => !selectedResults.includes(result._id)));
      setSelectedResults([]); // Clear selection after delete
      alert('Selected results deleted successfully.');
    } catch (err) {
      console.error('Error deleting selected results:', err);
      alert('Failed to delete selected results.');
    }
  };

  const toggleResultSelection = (resultId) => {
    setSelectedResults((prevSelected) =>
      prevSelected.includes(resultId)
        ? prevSelected.filter((id) => id !== resultId)
        : [...prevSelected, resultId]
    );
  };

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p>Error fetching results: {error}</p>;
  }

  return (
    <div className="result-list-container">
  <h1>Result List</h1>
  <div className="bulk-actions">
    <button onClick={handleBulkDelete} disabled={selectedResults.length === 0}>
      Delete Selected
    </button>
    {/* Add more bulk action buttons here if needed */}
  </div>
  <input
    type="text"
    placeholder="Filter by student name or subject"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />
  {filteredResults.length === 0 ? (
    <p>No results available.</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th onClick={() => sortResults('student.name')} className="sortable">
            Student Name {getSortIndicator('student.name')}
          </th>
          <th onClick={() => sortResults('subject.name')} className="sortable">
            Subject {getSortIndicator('subject.name')}
          </th>
          <th onClick={() => sortResults('marks')} className="sortable">
            Score {getSortIndicator('marks')}
          </th>
          <th onClick={() => sortResults('date')} className="sortable">
            Date {getSortIndicator('date')}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.map((result) => (
          <tr key={result._id}>
            <td>
              <input
                type="checkbox"
                checked={selectedResults.includes(result._id)}
                onChange={() => toggleResultSelection(result._id)}
              />
            </td>
            <td>{result.student.name}</td>
            <td>{result.subject.name}</td>
            <td>{result.marks}</td>
            <td>{new Date(result.date).toLocaleDateString()}</td>
            <td>
  <button
    className="table-button"
    onClick={() => {
      setSelectedResult(result);
      setNewMarks(result.marks);
    }}
  >
    Update
  </button>
  <button
    className="table-button"
    onClick={() => deleteResult(result._id)}
  >
    Delete
  </button>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  )}
  {selectedResult && (
  <div className="update-container">
    <h2>Update Result</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateResult(selectedResult._id);
      }}
    >
      <div>
        <label>New Marks:</label>
        <input
          type="number"
          value={newMarks}
          onChange={(e) => setNewMarks(e.target.value)}
        />
      </div>
      <button type="submit" className="update-btn">Update</button>
      <button
        type="button"
        className="delete-btn"
        onClick={() => {
          setSelectedResult(null);
          setNewMarks('');
        }}
      >
        Cancel
      </button>
    </form>
  </div>
)}

</div>

  );
};

export default ResultList;
