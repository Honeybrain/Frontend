import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import HelpModal from "@components/HelpModal";

const BlacklistPage = () => {
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
    const interval = setInterval(fetchBlacklistedIPs, 5000); // Mettre à jour la liste toutes les 5 secondes
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchBlacklistedIPs = async () => {
    try {
      const response = await axios.get('/api/honeypot/blacklist', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setIp('');
    setOpen(true);
    fetchBlacklistedIPs();
  } catch (error) {
    console.error(error);
  }
};

const handleUnblock = async (ip) => {
  try {
    await axios.post('/api/honeypot/whitelist', { ip }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setAlertText('IP unblocked successfully');
    setOpen(true);
    fetchBlacklistedIPs();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden'}}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h6" mb={2}>IP bloquées</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText="
            Avec le widget IP bloquées, vous pouvez voir les addresses IP de la liste noire. Cela signifie que toute tentative d'accès au honeypot à partir de cette adresse IP sera bloquée.

            Pour chaque adresse IP de la liste, un bouton de suppression est disponible.

            Pour supprimer une adresse IP de la liste noire, vous avez un boutton permettant cette suppression.

            Une notification apparaît à l'écran pour vous informer de l'action qui a été effectuée."/>
          </Grid>
        </Grid>
        <Box
          sx={{
            height: '80%',
            overflow: 'auto',
            '& > *': {
              marginBottom: '16px', // Add a margin to each child
            },
          }}
        >
          { blacklistedIPs.length == 0 && <h4>Aucune ip bloquée !</h4>

          }
          <List sx={{ overflow: 'auto' }}>
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
      </Paper>
    </Grid>
  );
}

export default BlacklistPage;
