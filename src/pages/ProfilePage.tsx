import React from 'react';
import { TextField, Box, Button, Paper, Typography } from '@mui/material';
import useChangeMailRPC from '@hooks/backend/userService/useChangeMailRPC';
import useResetPasswordRPC from '@hooks/backend/userService/useResetPasswordRPC';

const ProfilePage = () => {
  const { changeMail } = useChangeMailRPC();
  const { resetPassword } = useResetPasswordRPC();
  const [email, setEmail] = React.useState<string>('');
  const [newEmail, setNewEmail] = React.useState<string>('');
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }, [setSubmitted]);

  const changeEmail = React.useCallback(async (e) => {
    e.preventDefault();

    try {
      await changeMail(email);
      setSubmittedEmail(true);
    } catch (error) {
      console.error(error);
    }
  }, [setSubmitted]);

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
