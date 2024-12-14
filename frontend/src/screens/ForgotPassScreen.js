import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modals/Modal'; // Assuming you have a reusable Modal component
import '../css/LoginScreen.css';

const ForgotPassScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleForgotPass = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/v1/api/user/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(true); // Open the modal on success
        setError('');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred while sending the OTP.');
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate('/reset-password'); // Redirect to the password reset page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleForgotPass}>
          Send to Email
        </button>
      </div>
      <div className="right-section">
        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>Welcome to My Website</div>
        <div className="description">
          This website is designed to help you practice your English speaking skills. Join our community and improve your pronunciation through interactive exercises and feedback.
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          message="OTP has been sent to your email."
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm} // Confirm button will navigate to reset-password
        />
      )}
    </div>
  );
};

export default ForgotPassScreen;    