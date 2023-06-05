import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Card, CardContent, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpModal from '../../../TutorielPopUp/HelpModal';

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
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/honeypot/containers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setContainers(data);
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
      <Paper sx={{ p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' }}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
          <Typography variant="h6" mb={2}>Services honeypot</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText="
            En utilisant le widget Gestion des conteneurs, vous pouvez voir une liste de tous les conteneurs actuellement en cours d'exécution, ainsi que leur état et leur adresse IP. Chaque conteneur est affiché sur une carte individuelle. 
            
            L'état du conteneur peut être Up ou Down indiquant si le conteneur est actuellement en cours d'exécution ou non. 
            
            L'adresse IP du conteneur est également affichée, permettant de voir facilement l'adresse réseau du conteneur." />
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
      </Paper>
    </Grid>
  );
};

export default ContainerMonitorWidget;
