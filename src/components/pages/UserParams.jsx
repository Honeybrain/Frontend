import React, { useState, useContext } from 'react';
import '../../styles.css';

const UserParams = () => {
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [submitted, setSubmitted] = useState(true);
    const [emailSubmitted, setEmailSubmitted] = useState(true);
    const [state, setState] = useState(0);
    let statement = null;

    const changePassword = (e) => {
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

      const changeEmail = (e) => {
        e.preventDefault();
    
        fetch("http://localhost:8000/user/changeEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newEmail }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Affiche la réponse du serveur
            setEmailSubmitted(false);
          })
          .catch((error) => {
            console.error(error);
          });
        }

    if (state == 1) {
      statement = (
      <div>
        <h2>Changement de mot de passe</h2>
        {submitted ?
        <form id="register-form" onSubmit={changePassword}>
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
      );
    }

    if (state == 2) {
      statement = ( 
      <div>
        <h2>Changement d'adresse Email</h2>
        {emailSubmitted ?
        <form id="register-form" onSubmit={changeEmail}>
          <div className="input-group">
            <input
              onChange={(e) => setNewEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Nouvelle adresse Email"
              required
            />
          </div>
          <button type="submit">Valider</button>
        </form>
        :
        <div> Votre adresse email a bien été changée</div>
        }
      </div>
      );
    }
  
    return (
      <div className='form-container'>
        <h2>Paramètres utilisateurs</h2>
        <button onClick={() => setState(1)}>Changer de mot de passe</button>
        <button onClick={() => setState(2)}>Changer d'adresse email</button>
        {statement}
      </div>
    )
  };
  
  export default UserParams;