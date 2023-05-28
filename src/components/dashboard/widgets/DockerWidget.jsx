import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Card, CardContent, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ContainerMonitorWidget = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, 10000); // Mettre à jour les informations toutes les 10 secondes

    return () => {
      clearInterval(interval); // Effacer l'intervalle lorsque le composant est démonté
    };
  }, []);

  const fetchContainers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/honeypot/containers');
      setContainers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getContainerStatus = (status) => {
    if (status.startsWith('Up')) {
      return <CheckCircleIcon color="success" />;
    } else {
      return <ErrorIcon color="error" />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, height: '520px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' }}>
        <Typography variant="h6" mb={2}>Honeypot services</Typography>
        <Box
          sx={{
            height: 'calc(100% - 36px)',
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
            {containers.map((container, index) => (
              <Card variant="outlined" key={index}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="h6">{container.name}</Typography>
                    {getContainerStatus(container.status)}
                  </Box>
                  <Typography variant="body2" color="text.secondary">Status: {container.status}</Typography>
                  <Typography variant="body2" color="text.secondary">IP: {container.ip.split('/')[0]}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ContainerMonitorWidget;