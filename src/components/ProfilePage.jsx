import React, { useState } from 'react';
import { Grid, TextField, Box, Button, Paper, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(false);

  const handleSubmit = (e) => {
    // your existing code
  };

  const changeEmail = (e) => {
    // your existing code
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 110px)'}}>
      <Paper sx={{ p: 2, width: '25em' }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }} onSubmit={handleSubmit}>
          <Typography variant="h6">{t('profilePage.passwordChange')}</Typography>
          {submitted && (<Typography>{t('profilePage.resetEmailSent')}</Typography>)
          }
          {!submitted && (
          <>
            <TextField
              type="email"
              name='email'
              label={t('profilePage.emailAddress')}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">{t('profilePage.resetPassword')}</Button>
          </>
        )}
        </Box>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={changeEmail}>
          <Typography variant="h6">{t('profilePage.emailChange')}</Typography>
          {submittedEmail && (<Typography>{t('profilePage.emailUpdated')}</Typography>)
          }
          {!submittedEmail && (
          <>
          <TextField
            type="newEmail"
            name="newEmail"
            label={t('profilePage.newEmail')}
            value = {newEmail}
            required
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">{t('profilePage.validate')}</Button>
          </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
