import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css';
import { useHistory } from 'react-router-dom';  // importez useHistory ici

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();  // Utilisez useHistory ici
  const { login, isLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password,
      });
      console.log("Réponse du serveur:", response);

      // Stockez le token d'authentification et les autres données de l'utilisateur, si nécessaire
      const token = response.data.token;
      // Stockez le token dans localStorage ou dans les cookies pour le réutiliser dans d'autres requêtes
      localStorage.setItem('auth-token', token);

      // Redirigez l'utilisateur vers la page d'accueil ou la page suivante après la connexion
      // Par exemple, en utilisant react-router-dom
      // history.push('/home');
      login(response.data.token, {email});
      history.push('/');

    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response.data);
      // Gérez les erreurs ici, par exemple, en affichant un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="input-group">
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="input-group">
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Mot de passe" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <div className="form-footer">
        <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
