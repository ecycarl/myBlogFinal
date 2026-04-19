import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.put('/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      setMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const picSrc = user?.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : '/default.jpg';

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Move the heading inside the card */}
        <h2>My Profile</h2>
        {msg && <p className="success-msg">{msg}</p>}

        <div className="profile-pic-section">
          <img src={picSrc} alt="Profile" className="profile-pic-preview" />
          <label className="pic-label">Change Profile Picture:</label>
          <input type="file" accept="image/*" onChange={e => setPic(e.target.files[0])} />
        </div>

        <form onSubmit={handleProfile} className="profile-form">
          <h3>Edit Profile</h3>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Display name" />
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Short bio..." rows={3} />
          <button type="submit">Save Profile</button>
        </form>

        <form onSubmit={handlePassword} className="password-form">
          <h3>Change Password</h3>
          <input type="password" placeholder="Current password" value={curPw} onChange={e => setCurPw(e.target.value)} required />
          <input type="password" placeholder="New password (min 6 chars)" value={newPw} onChange={e => setNewPw(e.target.value)} required minLength={6} />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;