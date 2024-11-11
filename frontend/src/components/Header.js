// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from '../modals/Modal';

// const Header = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     navigate('/login');
//   };

//   const handleAccountClick = () => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       navigate('/profile'); // Chuyển đến ProfileScreen nếu đã đăng nhập
//     } else {
//       setModalOpen(true); // Hiển thị modal nếu chưa đăng nhập
//     }
//   };

//   const closeModal = () => setModalOpen(false);

//   const headerStyle = {
//     backgroundColor: '#9feea2',
//     padding: '20px',
//     color: 'black',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const headerItemStyle = {
//     margin: '0 20px',
//     cursor: 'pointer',
//   };

//   const brandStyle = {
//     fontWeight: 'bold',
//     fontSize: '28px',
//     fontFamily: "'Poppins', sans-serif",
//     letterSpacing: '2px',
//     color: '#2b2b2b',
//   };

//   return (
//     <header style={headerStyle}>
//       <div style={brandStyle}>SpeechFriend</div>
//       <div style={{ display: 'flex' }}>
//         <div style={headerItemStyle}>Talk with AI</div>
//         <div style={headerItemStyle}>My Course</div>
//         <div style={headerItemStyle} onClick={handleAccountClick}>Account</div>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       {/* Modal component */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         message="Vui lòng đăng nhập"
//         onConfirm={() => {
//           setModalOpen(false);
//           navigate('/login'); // Chuyển hướng đến LoginScreen nếu chưa đăng nhập
//         }}
//       />
//     </header>
//   );
// };

// export default Header;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from '../modals/Modal';

// const Header = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   // Hàm lấy thông tin người dùng từ token
//   const getUserFromToken = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         console.error("No token found in localStorage");
//         return;
//       }
  
//       const response = await fetch("http://localhost:8080/v1/api/user/getUserToken", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP status ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log("API response:", data);
  
//       if (data.success) {
//         setUser(data.user);
//       } else {
//         console.error("API did not return success:", data.message);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     setUser(null); // Xóa dữ liệu người dùng khi đăng xuất
//     navigate('/login');
//   };

//   const handleAccountClick = () => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       getUserFromToken(); // Gọi API nếu đã đăng nhập
//       setDropdownOpen(!isDropdownOpen); // Mở dropdown
//     } else {
//       setModalOpen(true); // Hiển thị modal nếu chưa đăng nhập
//     }
//   };

//   const closeModal = () => setModalOpen(false);

//   // CSS-in-JS cho phần giao diện
//   const headerStyle = {
//     backgroundColor: '#9feea2',
//     padding: '20px',
//     color: 'black',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const headerItemStyle = {
//     margin: '0 20px',
//     cursor: 'pointer',
//     position: 'relative',
//   };

//   const brandStyle = {
//     fontWeight: 'bold',
//     fontSize: '28px',
//     fontFamily: "'Poppins', sans-serif",
//     letterSpacing: '2px',
//     color: '#2b2b2b',
//   };

//   const dropdownStyle = {
//     position: 'absolute',
//     top: '100%',
//     right: 0,
//     backgroundColor: '#ffffff',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     padding: '15px',
//     borderRadius: '8px',
//     width: '200px',
//     zIndex: 1,
//   };

//   const dropdownItemStyle = {
//     margin: '10px 0',
//     color: '#333',
//   };

//   return (
//     <header style={headerStyle}>
//       <div style={brandStyle}>SpeechFriend</div>
//       <div style={{ display: 'flex' }}>
//         <div style={headerItemStyle}>Talk with AI</div>
//         <div style={headerItemStyle}>My Course</div>
//         <div style={headerItemStyle} onClick={handleAccountClick}>
//           Account
//           {isDropdownOpen && user && (
//             <div style={dropdownStyle}>
//               <div style={dropdownItemStyle}><strong>Name:</strong> {user.fullname}</div>
//               <div style={dropdownItemStyle}><strong>Username:</strong> {user.username}</div>
//               <div style={dropdownItemStyle}><strong>Email:</strong> {user.email}</div>
//               <div style={dropdownItemStyle}><strong>Phone:</strong> {user.phone}</div>
//               <div style={dropdownItemStyle}><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</div>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal component */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         message="Vui lòng đăng nhập"
//         onConfirm={() => {
//           setModalOpen(false);
//           navigate('/login'); // Chuyển hướng đến LoginScreen nếu chưa đăng nhập
//         }}
//       />
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modals/Modal';
import userAvatar from '../assets/user.png';

// Thêm icon cho avatar (tùy chọn)
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Hàm lấy thông tin người dùng từ token
  const getUserFromToken = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch("http://localhost:8080/v1/api/user/getUserToken", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      if (data.success) {
        setUser(data.user);
      } else {
        console.error("API did not return success:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (isDropdownOpen && user === null) {
      getUserFromToken();
    }
  }, [isDropdownOpen, user]);

  // Đóng dropdown khi nhấp ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null); // Xóa dữ liệu người dùng khi đăng xuất
    navigate('/login');
  };

  const handleAccountClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setDropdownOpen(!isDropdownOpen); // Mở hoặc đóng dropdown
    } else {
      setModalOpen(true); // Hiển thị modal nếu chưa đăng nhập
    }
  };

  const closeModal = () => setModalOpen(false);

  // CSS-in-JS cho phần giao diện
  const headerStyle = {
    backgroundColor: '#bdb76b', // Màu xanh lá cây hiện đại
    padding: '20px 40px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const headerItemStyle = {
    margin: '0 20px',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
  };

  const brandStyle = {
    fontWeight: 'bold',
    fontSize: '28px',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '2px',
    color: '#ffffff',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '60px',
    right: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    borderRadius: '10px',
    width: '250px',
    zIndex: 1,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    visibility: isDropdownOpen ? 'visible' : 'hidden',
  };

  const dropdownHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  };

  const dropdownInfoStyle = {
    textAlign: 'left',
    color: '#333333',
    marginBottom: '10px',
  };

  const dropdownButtonStyle = {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  };

  return (
    <header style={headerStyle}>
      <div style={brandStyle}>SpeechFriend</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={headerItemStyle}>Talk with AI</div>
        <div style={headerItemStyle}>My Course</div>
        <div style={headerItemStyle} onClick={handleAccountClick}>
          <FaUserCircle style={{ marginRight: '8px', fontSize: '20px' }} />
          Account
          {isDropdownOpen && (
            <div style={dropdownStyle} ref={dropdownRef}>
              {user ? (
                <>
                  <div style={dropdownHeaderStyle}>
                    <img
                      src= {userAvatar}
                      alt="User Avatar"
                      style={avatarStyle}
                    />
                    <div>
                      <h3 style={{ margin: 0 }}>{user.fullname}</h3>
                      <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{user.email}</p>
                    </div>
                  </div>
                  <div style={dropdownInfoStyle}>
                    <p><strong>Name:</strong> {user.fullname}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</p>
                  </div>
                  <button
                    style={dropdownButtonStyle}
                    onClick={handleLogout}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                  >
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                  </button>
                </>
              ) : (
                // <p style={{ color: '#555' }}>Loading...</p>
                <button
                    style={dropdownButtonStyle}
                    onClick={handleLogout}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                  >
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message="You don't have account, please log in !"
        messageStyle={{ color: 'black' }}
        onConfirm={() => {
          setModalOpen(false);
          navigate('/login'); // Chuyển hướng đến LoginScreen nếu chưa đăng nhập
        }}
      />
    </header>
  );
};

export default Header;

