import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';

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
      const response = await axios.get('http://localhost:8000/honeypot/blacklist');
      setBlacklistedIPs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/honeypot/blacklist', { ip });
      setIp('');
      setAlertText('IP blocked successfully');
      setOpen(true);
      fetchBlacklistedIPs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnblock = async (ip) => {
    try {
      await axios.post('http://localhost:8000/honeypot/whitelist', { ip });
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
        <Typography variant="h6" mb={2}>IP bloquées</Typography>
        <Box
          sx={{
            height: '88%',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              gap: 2,
              marginBottom: 2,  // Ajoutez une marge en bas
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
        </Box>
      </Paper>
    </Grid>
  );
}

export default BlacklistPage;
