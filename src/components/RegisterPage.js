import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css'; 

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('', {
          email,
          password,
        });
  
        // Utilisez la fonction login pour mettre à jour l'état de l'authentification et stocker les informations utilisateur
        const token = response.data.token;
        const userData = response.data.user;
        login(token, userData);
  
        // Redirigez l'utilisateur vers la page d'accueil
      } catch (error) {
      }
    };
  return (
    <div className="form-container">
      <h2>Inscription</h2>
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
        <div className="input-group">
          <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <div className="form-footer">
        <p>Vous avez déjà un compte ? <a href="/login">Se connecter</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
