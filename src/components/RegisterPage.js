import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css';
import { useHistory } from 'react-router-dom';  

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Ici, utilisez 'login' au lieu de 'RegisterPage'
  const history = useHistory();  // Utilisez useHistory ici


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('handleSubmit appelé'); // Ajout d'un console.log ici
    console.log('email:', email); // Afficher l'email
    console.log('password:', password); // Afficher le mot de passe

    try {
      console.log('work1');
      const response = await axios.post('http://localhost:8000/user/signup', {
        password,
        email,
      });
      console.log('work2');
      console.log(response.data);
      // Utilisez la fonction login pour mettre à jour l'état de l'authentification et stocker les informations utilisateur
      const token = response.data.token;
      const userData = response.data.user;
      login(response.data.token, {email}); 

      history.push('/');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.response.data);
      console.log('error');      // Gérez les erreurs ici, par exemple, en affichant un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="form-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} id="register-form">
        <div className="input-group">
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="input-group">
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Mot de passe" required />
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
