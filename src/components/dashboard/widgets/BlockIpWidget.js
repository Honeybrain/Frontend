import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';

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
      const response = await axios.post('http://localhost:8000/honeypot/blacklist', { ip });
      setIp('');
      setOpen(true);
      fetchBlacklistedIPs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 2, height: '520px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' }}>
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
          <List sx={{maxHeight: '280px', overflow: 'auto'}}>
            {blacklistedIPs.map((blacklistedIP, index) => (
              <ListItem key={index} sx={{ 
                my: 1, 
                px: 2, 
                bgcolor: index % 2 === 0 ? 'action.hover' : 'background.default',
                borderRadius: 1 }}>
                <ListItemText primary={blacklistedIP} />
                {index !== blacklistedIPs.length - 1 && <Divider />}
              </ListItem>
            ))}
          </List>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            IP blocked successfully
          </Alert>
        </Snackbar>
      </Grid>
    </Paper>
  );
};

export default BlacklistPage;
