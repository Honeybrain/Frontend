import React, { useState, useContext } from 'react';
import '../styles.css';

const UserParams = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(true);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch("http://localhost:8000/user/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Affiche la réponse du serveur
          setSubmitted(false);
        })
        .catch((error) => {
          console.error(error);
        });
      }
  
    return (
        <div className='form-container'>
          <h2>Changement de mot de passe</h2>
          {submitted ?
          <form id="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name='email'
                value={email}
                placeholder="Adresse email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Réinitialiser le mot de passe</button>
          </form>
          :
          <div> Vous allez recevoir un email permtettant de réinitialiser votre mot de passe, pensez à vérifier votre dossier spam</div>
          }
        </div>
    )
  };
  
  export default UserParams;