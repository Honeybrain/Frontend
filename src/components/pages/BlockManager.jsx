import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import HelpModal from '../../TutorielPopUp/HelpModal';
import { useTranslation } from 'react-i18next';

const BlockManager = () => {
    const { t } = useTranslation();
    const [ip, setIp] = useState('');
    const [blacklistedIPs, setBlacklistedIPs] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    useEffect(() => {
      fetchBlacklistedIPs();
      const interval = setInterval(fetchBlacklistedIPs, 5000); // Update the list every 5 seconds
      return () => {
          clearInterval(interval);
      };
  }, []);

  const fetchBlacklistedIPs = async () => {
      try {
          const response = await axios.get('/api/honeypot/blacklist', {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          setBlacklistedIPs(response.data);
      } catch (error) {
          console.error(error);
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('/api/honeypot/blacklist', { ip }, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          setIp('');
          setAlertText(t('blockManager.blockSuccess'));
          setOpen(true);
          fetchBlacklistedIPs();
      } catch (error) {
          console.error(error);
      }
  };

  const handleUnblock = async (ip) => {
      try {
          await axios.post('/api/honeypot/whitelist', { ip }, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          setAlertText(t('blockManager.unblockSuccess'));
          setOpen(true);
          fetchBlacklistedIPs();
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h4">{t('blockManager.ipManagement')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('blockManager.helpText')}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs sx={{ marginBottom: 0.4 }}>
        <Typography variant="h6" mb={2}>{t('blockManager.blockAnIP')}</Typography>
        <Grid container spacing={2} direction="column" alignItems="stretch" component="form" onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="ip"
              label={t('blockManager.ipAddress')}
              autoFocus
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              {t('blockManager.blockIP')}
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h2" gutterBottom mt={2}>
              {t('blockManager.currentlyBlocked')}
            </Typography>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
      <Grid item xs>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              height: '100%',
              maxHeight: 'calc(100vh - 440px)', // Set max height
              overflow: 'auto',
            }}
          >
            <List>
              {blacklistedIPs.map((blacklistedIP, index) => (
                <ListItem key={index} sx={{
                  my: 1,
                  px: 2,
                  bgcolor: index % 2 === 0 ? 'action.hover' : 'background.default',
                  borderRadius: 1
                }}>
                  <ListItemText primary={blacklistedIP} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleUnblock(blacklistedIP)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                  {index !== blacklistedIPs.length - 1 && <Divider />}
                </ListItem>
              ))}
            </List>
          </Box>
      </Grid>
    </Grid>
  );
};

export default BlockManager;
