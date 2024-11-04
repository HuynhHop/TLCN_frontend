import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const headerStyle = {
    backgroundColor: '#9feea2', // Green background
    padding: '20px',
    color: 'black', // Black text color
    display: 'flex',
    justifyContent: 'space-between', // Space between brand and right-side items
    alignItems: 'center', // Center items vertically
  };

  const headerItemStyle = {
    margin: '0 20px', // Space between items
    cursor: 'pointer', // Change cursor to pointer
  };

  const brandStyle = {
    fontWeight: 'bold', // Make the brand name bold
    fontSize: '28px', // Increase font size
    fontFamily: "'Poppins', sans-serif", // Apply Poppins font
    letterSpacing: '2px', // Add some letter spacing
    color: '#2b2b2b', // Darker color for contrast
  };

  return (
    <header style={headerStyle}>
      <div style={brandStyle}>SpeechFriend</div> {/* Brand name on the left */}
      <div style={{ display: 'flex' }}> {/* Container for right-side items */}
        <div style={headerItemStyle}>Talk with AI</div>
        <div style={headerItemStyle}>My Course</div>
        <div style={headerItemStyle}>Account</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
