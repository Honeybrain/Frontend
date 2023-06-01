import React, { useState, useContext } from 'react';
import '../styles.css';

const UserParams = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState(0);
    const [submitted, setSubmitted] = useState(true);
    let statement = null;


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
  
    if (state === 1) {
      statement = (
        <div className='form-container'>
          <h2>Changement d'adresse email</h2>
          <form id="register-form">
            <div className="input-group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="New e-mail"
                required
              />
            </div>
            <button type="submit">Valider</button>
          </form>
        </div>
      );
    }
    if (state === 2) {
      statement = (
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
          <div> Vous allez recevoir un email permtettant de réinitialiser votre mot de passe</div>
          }
        </div>
      );
    }
  
    return (
      <div className='form-container'>
        <h2>Paramètres utilisateurs</h2>
        {state != 1 ?
        <button type="button" onClick={() => setState(1)}>Changer d'adresse email</button>
        : null
        }
        {state != 2 ?
        <button type="button" onClick={() => setState(2)}>Changer de mot de passe</button>
        : null
        }
        {statement}
      </div>
    );
  };
  
  export default UserParams;