import React, { useState } from 'react';
import practiceImage from '../assets/speak.png';

const ProductCard = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '20%',
    padding: '30px',
    margin: '50px',
    backgroundColor: '#CCFFFF',
    textAlign: 'center',
    transition: 'transform 0.2s',
    flex: '0 0 calc(25% - 20px)',
    boxSizing: 'border-box',
    transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
  };

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
    borderRadius: '20%', // Optional, for slightly rounded corners
  };

  const headingStyle = {
    margin: '10px 0',
    fontSize: '1.5rem',
  };

  const paragraphStyle = {
    color: '#666',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '15px',
  };

  return (
    <div
      style={productCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={practiceImage} alt="Practice" style={imageStyle} />
      <h3 style={headingStyle}>{title}</h3>
      <p style={paragraphStyle}>{description}</p>
      <button style={buttonStyle}>Practice</button>
    </div>
  );
};

export default ProductCard;
