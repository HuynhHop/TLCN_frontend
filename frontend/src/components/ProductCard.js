// import React from 'react';

// const ProductCard = ({ title, description, price }) => {
//   // Các style được định nghĩa dưới dạng đối tượng
//   const productCardStyle = {
//     border: '1px solid #ccc', // Light gray border
//     borderRadius: '8px', // Rounded corners
//     padding: '30px', // Tăng padding để sản phẩm lớn hơn
//     margin: '10px',
//     backgroundColor: '#f9f9f9', // Light background
//     textAlign: 'center', // Center text
//     transition: 'transform 0.2s', // Smooth hover effect
//     flex: '0 0 calc(25% - 20px)', // Mỗi sản phẩm chiếm 25% chiều rộng của hàng (4 sản phẩm mỗi hàng)
//     boxSizing: 'border-box', // Đảm bảo padding và border được tính vào chiều rộng
//   };

//   const productCardHoverStyle = {
//     ...productCardStyle,
//     transform: 'scale(1.05)', // Slightly enlarge on hover
//   };

//   const headingStyle = {
//     margin: '10px 0', // Space around heading
//   };

//   const paragraphStyle = {
//     color: '#666', // Gray text for description
//   };

//   // Để xử lý hiệu ứng hover, bạn có thể sử dụng state
//   const [isHovered, setIsHovered] = React.useState(false);

//   return (
//     <div
//       style={isHovered ? productCardHoverStyle : productCardStyle}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <h3 style={headingStyle}>{title}</h3>
//       <p style={paragraphStyle}>{description}</p>
//       <p>Price: {price} VNĐ</p>
//       <button style={buyButtonStyle}>Practice</button>
//     </div>
//   );
// };

// // Cài đặt style cho nút đăng ký
// const buyButtonStyle = {
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   padding: '10px',
//   cursor: 'pointer',
// };

// export default ProductCard;


import React from 'react';

const ProductCard = ({ title, description }) => {
  const productCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '20%',
    padding: '60px',
    margin: '50px',
    backgroundColor: '#CCFFFF',
    textAlign: 'center',
    transition: 'transform 0.2s',
    flex: '0 0 calc(25% - 20px)',
    boxSizing: 'border-box',
  };

  const productCardHoverStyle = {
    ...productCardStyle,
    transform: 'scale(1.05)',
  };

  const headingStyle = {
    margin: '10px 0',
  };

  const paragraphStyle = {
    color: '#666',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={isHovered ? productCardHoverStyle : productCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={headingStyle}>{title}</h3>
      <p style={paragraphStyle}>{description}</p>
      <button style={buyButtonStyle}>Practice</button>
    </div>
  );
};

const buyButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
};

export default ProductCard;
