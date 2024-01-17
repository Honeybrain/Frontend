import React from 'react';
import AuthContext from '@contexts/AuthContext';
import '../styles.css';
import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { NightModeContext } from '@contexts/NightModeContext'; // Importez NightModeContext

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const history = useHistory();
  const { login } = React.useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const { isNightMode } = useContext(NightModeContext); 

  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const formContainerClassName = isNightMode ? 'form-container night-mode' : 'form-container'; // Ajoutez une classe conditionnelle

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      toast.success(t("loginPage.loginSuccess"));

      setTimeout(() => {
        history.push('/');
      }, 2000);

    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage(t("loginPage.errorMessage"));
    }
  };

  return (
    <div className={formContainerClassName}>
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
