import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginScreen.css';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Login Box */}
      <div className="login-box">
        <h2>Sign in</h2>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Sign in</button>

        {/* Forgot Password link */}
        <div className="login-links">
          <span onClick={() => navigate('/forgot-password')} className="link">
            Forgot password?
          </span>
        </div>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Signup link */}
        <div className="signup-link">
          <p>
            Don’t have an account?{' '}
            <span onClick={() => navigate('/register')} className="link">
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Right Side: Welcome Message and Description */}
      <div className="right-section">
        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>Welcome to My Website</div>
        <div className="description">
          This website is designed to help you practice your English speaking skills. Join our community and improve your pronunciation through interactive exercises and feedback.
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
