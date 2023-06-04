import React from 'react';
import Popup from 'reactjs-popup';
import { Container, Typography, Button, Box } from '@mui/material';

const IPManagementHelp = () => (
  <Popup 
    trigger={
      <Button variant="contained" color="primary">
        Tutoriel
      </Button>} 
    modal
  >
    {close => (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Gestion des IP
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            Ici, vous pouvez gérer les adresses IP, bloquer des adresses spécifiques, etc.
          </Typography>
        </Box>
        <Button 
          variant="contained" color="primary"
          onClick={close}
          sx={{ mt: 2 }}
        >
          Fermer
        </Button>
      </Container>
    )}
  </Popup>
);

export default IPManagementHelp;
