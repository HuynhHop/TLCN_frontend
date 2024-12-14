import React, { useState } from 'react';
import axios from 'axios';
import '../css/EditProfileModal.css';

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
  });
  const [avatarFile, setAvatarFile] = useState(null); // New state for the avatar file
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formDataToSend = new FormData();
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile); // Append the image file
      }

      const response = await axios.put('http://localhost:8080/v1/api/user/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onUpdate(response.data.updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
        <img
        src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar}
        alt="Avatar Preview"
        style={{ width: 100, height: 100, borderRadius: '50%' }}
        />
          <label>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Avatar:
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
