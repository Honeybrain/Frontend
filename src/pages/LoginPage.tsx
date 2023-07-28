import React from 'react';
import axios from 'axios';
import AuthContext from '@contexts/AuthContext';
import '../styles.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const history = useHistory();
  const { login, user, token } = React.useContext(AuthContext);

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      // Show a success toast message
      toast.success("Connexion réussie! Vous serez redirigé dans quelques secondes.");

      // After 2 seconds, do the login and redirection
      setTimeout(() => {
        history.push('/');
      }, 2000);

    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
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
