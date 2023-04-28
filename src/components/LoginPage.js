import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
  
    const handleSubmit = async () => {
        const response = await axios.post('http://127.0.0.1:8000/login', {
          email,
          password,
        });
  
        // Utilisez la fonction login pour mettre à jour l'état de l'authentification et stocker les informations utilisateur
        const token = response.data.token;
        const userData = response.data.user;
        login(token, userData);
  
        // Redirigez l'utilisateur vers la page d'accueil
      } 
  return (
    <div className="form-container">
      <h2>Connexion</h2>
      <form>
        <div className="input-group">
          <input onChange={(text) => setEmail({value: text, error: 'NameError'})} type="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="input-group">
          <input onChange={(text) => setPassword({value: text, error: 'NameError'})} type="password" name="password" placeholder="Mot de passe" required />
        </div>
        <button onClick={handleSubmit} type="submit">Se connecter</button>
      </form>
      <div className="form-footer">
        <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
