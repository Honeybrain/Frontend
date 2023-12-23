import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import useActivateUserRPC from '@hooks/backend/userService/useActivateUserRPC';
import AuthContext from '@contexts/AuthContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const InvitationSignup: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { loginWithToken } = React.useContext(AuthContext);
  const { activateUser } = useActivateUserRPC();
  const { activationToken } = useParams<{ activationToken: string }>();

  const { t } = useTranslation();

  const signIn = async () => {
    try {
      setError(null); // Clear any previous errors before attempting the operation again
      const activateUserResponse = await activateUser(activationToken, password);
      loginWithToken(activateUserResponse);
      toast.success(t("loginPage.loginSuccess"));
      setSubmitted(true);
    } catch (err) {
      setError("Invitation déjà utilisée!");   // Set the error state
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 110px)' }}>
      <Paper sx={{ p: 2, width: '25em' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Choisissez votre nouveau mot de passe</Typography>
          {submitted && (<Typography>Votre compte a été correctement créé</Typography>)}
          {!submitted && (
            <>
              <TextField
                type="password"
                name='password'
                label="Mot de passe"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">{error}</Typography> // Display error inline
              )}
              <Button type="submit" variant="contained" color="primary" onClick={signIn} >
                Créer un compte
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default InvitationSignup;
