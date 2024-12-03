import React, { useState } from 'react';

const WordPractice = ({ word, onClose }) => {
  const [accuracy, setAccuracy] = useState(null);

  const checkAccuracy = () => {
    // Giả sử API kiểm tra độ chính xác là: http://localhost:8080/v1/api/word/practice
    fetch('http://localhost:8080/v1/api/word/practice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAccuracy(data.accuracy); // Độ chính xác trả về từ API
        } else {
          alert('Cannot check accuracy. Please try again!');
        }
      })
      .catch(() => alert('Error checking accuracy.'));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <h2>Practice Word: {word}</h2>
      <button
        onClick={checkAccuracy}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#1D4ED8',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Check Accuracy
      </button>
      {accuracy !== null && <p>Your Accuracy: {accuracy}%</p>}
      <button
        onClick={onClose}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#DC2626',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default WordPractice;
