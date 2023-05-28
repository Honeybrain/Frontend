import React, { useState } from 'react';
import '../styles.css';

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState('');

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={`form-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Profil</h2>
      <div className="profile-image">
        <img src={image || 'https://via.placeholder.com/150'} alt="Profile" />
        <input type="file" onChange={handleImageChange} />
      </div>
      <form>
        <div className="input-group">
          <input type="text" name="firstName" placeholder="Prénom" required />
        </div>
        <div className="input-group">
          <input type="text" name="lastName" placeholder="Nom" required />
        </div>
        <div className="input-group">
          <input type="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="input-group">
          <input type="password" name="password" placeholder="Mot de passe" required />
        </div>
        <button type="button" onClick={handleDarkMode}>{darkMode ? 'Mode clair' : 'Mode sombre'}</button>
      </form>
    </div>
  );
};

export default ProfilePage;
