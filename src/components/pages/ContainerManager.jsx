import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper, Typography, Card, CardContent, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthContext from '../../AuthContext';
import HelpModal from '../../TutorielPopUp/HelpModal';

const ContainerManager = () => {
  const [containers, setContainers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchContainers();
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
    <Box flex={1}>
        <Typography variant="h4" mb={2}>Gestion des conteneurs
        <HelpModal helpText="
        - En utilisant le Gestion des conteneurs , vous pouvez voir une liste de tous les conteneurs actuellement en cours d'exécution, ainsi que leur état et leur adresse IP. Chaque conteneur est affiché sur une carte individuelle. 
        
        - L'état du conteneur peut être Up ou Down indiquant si le conteneur est actuellement en cours d'exécution ou non. 
        
        - L'adresse IP du conteneur est également affichée, permettant de voir facilement l'adresse réseau du conteneur." />
        </Typography>
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
      </Box>
  );
};

export default ContainerManager;
