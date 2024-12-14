// DetailUserScreen.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { FiMail, FiPhone, FiUser, FiShield, FiEdit, FiLock } from 'react-icons/fi';
import '../css/DetailUserScreen.css';
import EditProfileModal from '../modals/EditProfileModal'; // Import the modal component
import ChangePassModal from '../modals/ChangePassModal'; // Import the change password modal

const DetailUserScreen = () => {
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Track modal visibility for profile
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false); // Track modal visibility for password change

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser); // Update the user state with the new data
    setIsEditModalOpen(false); // Close the modal
  };

  const handlePasswordChange = () => {
    // Update user information or refresh if needed after password change
    setIsChangePassModalOpen(false); // Close modal after successful password change
  };

  if (!user) {
    return (
      <div className="loading-spinner">
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="detail-user-container">
      <Header />
      <div className="content-container" style={{ display: 'flex', flex: 1 }}>
        <motion.div
          className="user-info-box"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="user-avatar-container">
            <img
              src={user.avatar || 'https://via.placeholder.com/150'}
              alt="User Avatar"
              className="user-avatar"
            />
          </div>
          <h1 className="user-name">{user.fullname}</h1>
          <div className="user-actions">
            <button
              className="icon-button"
              title="Edit Profile"
              onClick={() => setIsEditModalOpen(true)} // Open modal on click
            >
              <FiEdit />
            </button>
            <button
              className="icon-button"
              title="Change Password"
              onClick={() => setIsChangePassModalOpen(true)} // Open password change modal
            >
              <FiLock />
            </button>
          </div>

          <InfoItem icon={<FiUser />} label="Full Name" value={user.fullname} />
          <InfoItem icon={<FiMail />} label="Email" value={user.email} />
          <InfoItem icon={<FiPhone />} label="Phone" value={user.phone} />
          <InfoItem
            icon={<FiShield />}
            label="Status"
            value={
              <span className={`user-status ${user.isBlocked ? 'status-blocked' : 'status-active'}`}>
                {user.isBlocked ? 'Blocked' : 'Active'}
              </span>
            }
          />
        </motion.div>

        <div className="background-section">
          <h2>Welcome to Your Profile</h2>
          <p className="description">Here you can view and manage your personal information.</p>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <EditProfileModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleProfileUpdate}
          />
        )}

        {/* Change Password Modal */}
        {isChangePassModalOpen && (
          <ChangePassModal
            user={user}
            onClose={() => setIsChangePassModalOpen(false)}
            onPasswordChange={handlePasswordChange}
          />
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <motion.div
    className="info-item"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      {React.cloneElement(icon, { style: { width: '20px', height: '20px', marginRight: '8px', color: '#4CAF50' } })}
      <p className="info-label">{label}</p>
    </div>
    <p className="info-value">{value}</p>
  </motion.div>
);

export default DetailUserScreen;
