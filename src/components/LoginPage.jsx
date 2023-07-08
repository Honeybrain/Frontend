import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });
      console.log("Réponse du serveur:", response);

      // Show a success toast message
      toast.success("Connexion réussie! Vous serez redirigé dans quelques secondes.");

      // After 2 seconds, do the login and redirection
      setTimeout(() => {
        console.log('voici le token du user :', response.data.token)
        login(response.data.token, { email });
        history.push('/');
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response.data);
      setErrorMessage('Nom d\'utilisateur et/ou mot de passe incorrect.');
    }
  };

  return (
    <div className="form-container">
      <h2>Connexion</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} id="login-form">
        <div className="input-group">
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="input-group">
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Mot de passe" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
