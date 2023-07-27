import React, { useState } from 'react';
import { Grid, TextField, Box, Button, Paper, Typography } from '@mui/material';

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/user/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const changeEmail = (e) => {
    e.preventDefault();

    fetch("/api/user/changeEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Affiche la réponse du serveur
        setSubmittedEmail(true);
      })
      .catch((error) => {
        console.error(error);
      });
    }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 110px)'}}>
      <Paper sx={{ p: 2, width: '25em' }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }} onSubmit={handleSubmit}>
          <Typography variant="h6">Changement de mot de passe</Typography>
          {submitted && (<Typography>Vous allez recevoir un email permettant de réinitialiser votre mot de passe</Typography>)
          }
          {!submitted && (
          <>
            <TextField
              type="email"
              name='email'
              label="Adresse email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">Réinitialiser le mot de passe</Button>
          </>
        )}
        </Box>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={changeEmail}>
          <Typography variant="h6">Changement d'adresse email</Typography>
          {submittedEmail && (<Typography>Votre Email a bien été modifié.</Typography>)
          }
          {!submittedEmail && (
          <>
          <TextField
            type="newEmail"
            name="newEmail"
            label="Nouvel e-mail"
            value = {newEmail}
            required
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Valider</Button>
          </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
