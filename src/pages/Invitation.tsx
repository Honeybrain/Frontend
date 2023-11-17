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
      setError(null);
      const loginToken = await activateUser(activationToken, password);
      loginWithToken(loginToken);
      toast.success(t('loginPage.loginSuccess'));
      setSubmitted(true);
    } catch (err) {
      setError(t('invitationSignup.usedInvitation'));   // Set the error state
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 110px)' }}>
      <Paper sx={{ p: 2, width: '25em' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">{t('invitationSignup.choosePassword')}</Typography>
          {submitted && (<Typography>{t('invitationSignup.accountCreated')}</Typography>)}
          {!submitted && (
            <>
              <TextField
                type="password"
                name='password'
                label={t('invitationSignup.passwordLabel')}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">{error}</Typography> // Display error inline
              )}
              <Button type="submit" variant="contained" color="primary" onClick={signIn} >
                {t('invitationSignup.createAccount')}
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default InvitationSignup;
