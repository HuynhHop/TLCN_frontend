import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modals/Modal'; // Assuming you have a reusable Modal component
import '../css/LoginScreen.css';

const ResetPassScreen = () => {
  const [email, setEmail] = useState('');
  const [passwordReset, setPasswordReset] = useState('');
  const [newPassword, setNewpassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleResetPass = async () => {
    if (!email || !newPassword || !confirmPassword || !passwordReset) {
      setError('Missing Inputs');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/v1/api/user/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email , passwordReset, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(true); // Open the modal on success
        setError('');
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (err) {
      setError('An error occurred while change password.');
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate('/login'); // Redirect to the password reset page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Password Reset Code"
            value={passwordReset}
            onChange={(e) => setPasswordReset(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="text"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewpassword(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleResetPass}>
          Change Password
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
          message="Your password was changed successfully."
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm} // Confirm button will navigate to reset-password
        />
      )}
    </div>
  );
};

export default ResetPassScreen;    