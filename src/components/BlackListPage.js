import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Box, Paper, Snackbar,
  IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, CloseIcon,
} from '@mui/material';

const BlacklistPage = () => {
  const [ip, setIp] = useState('');
  const [blacklistedIPs, setBlacklistedIPs] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetchBlacklistedIPs();
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
      const response = await axios.post('http://localhost:8000/honeypot/blacklist');
      { ip };
      console.log(response.data);
      setIp('');
      setOpen(true);
      fetchBlacklistedIPs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url("https://example.com/path-to-your-image.jpg")', // Replace with your image url
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Block an IP
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ip"
            label="IP Address"
            name="ip"
            autoFocus
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Block IP
          </Button>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Currently Blocked IPs
        </Typography>
        <List>
          {blacklistedIPs.map((blacklistedIP, index) => (
            <ListItem key={index}>
              <ListItemText primary={blacklistedIP} />
              {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="unblock" onClick={() => unblockIP(blacklistedIP)}>
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          ))}
        </List>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="IP blocked successfully" />
      </Paper>
    </Container>
  );
};

export default BlacklistPage;
