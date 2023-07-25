import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

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
      toast.success(t("loginPage.loginSuccess"));

      // After 2 seconds, do the login and redirection
      setTimeout(() => {
        console.log('voici le token du user :', response.data.token)
        login(response.data.token, { email });
        history.push('/');
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response.data);
      setErrorMessage(t("loginPage.errorMessage"));
    }
  };

  return (
    <div className="form-container">
      <h2>{t("loginPage.login")}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} id="login-form">
        <div className="input-group">
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder={t("loginPage.emailPlaceholder")} required />
        </div>
        <div className="input-group">
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder={t("loginPage.passwordPlaceholder")} required />
        </div>
        <button type="submit">{t("loginPage.submit")}</button>
      </form>
    </div>
  );
};

export default LoginPage;
