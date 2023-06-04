import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';

const BlockManager = () => {
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
          const response = await axios.get('http://localhost:8000/honeypot/blacklist', {
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
          const response = await axios.post('http://localhost:8000/honeypot/blacklist', { ip }, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
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
          await axios.post('http://localhost:8000/honeypot/whitelist', { ip }, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          setAlertText('IP unblocked successfully');
          setOpen(true);
          fetchBlacklistedIPs();
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <Box flex={1}>
        <Typography variant="h4" mb={2}>Gestion des IP</Typography>
        <Box
          sx={{
            height: '100%',
            overflow: 'auto',
          }}
        >
        <Typography variant="h6" mb={2}>Block an IP</Typography>
        <Grid container spacing={2} direction="column" alignItems="stretch" component="form" onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="ip"
              label="IP Address"
              autoFocus
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Block IP
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h2" gutterBottom mt={2}>
              Currently Blocked IPs
            </Typography>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          </Snackbar>
        </Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              gap: 2,
              marginBottom: 3,  // Ajoutez une marge en bas
              
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
        </Box>
      </Box>
  );
};

export default BlockManager;
