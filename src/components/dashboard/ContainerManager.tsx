import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthContext from "@contexts/AuthContext";
import HelpModal from "@components/HelpModal";
import useContainersRPC from '@hooks/backend/honeypotService/useContainersRPC';
import { useTranslation } from 'react-i18next';

const ContainerManager: React.FC = () => {
  const { containers } = useContainersRPC();
  const { token } = useContext(AuthContext);
  const { t } = useTranslation();

  const getContainerStatus = (status: string) => {
    if (status.startsWith('running')) {
      return <CheckCircleIcon color="success" />;
    } else {
      return <ErrorIcon color="error" />;
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h4" mb={2}>{t('containerManager.title')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('containerManager.helpText')} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
      <Box
        sx={{
          height: '100%',
          maxHeight: 'calc(100vh - 220px)', // Set max height
          overflow: 'auto',
          '& > *': {
            marginBottom: '16px', // Add a margin to each child
          },
        }}
      >
          {containers && containers.map((container, index) => (
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
                <Typography variant="body2" color="text.secondary">{t('containerManager.status')}: {container.status}</Typography>
                <Typography variant="body2" color="text.secondary">{t('containerManager.ip')}: {container.ip.split('/')[0]}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContainerManager;
