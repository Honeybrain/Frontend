import { Grid, Paper, Typography, Card, CardContent, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpModal from "@components/HelpModal";;
import React from 'react';
import DashboardContext from '@contexts/DashboardContext';
import { useTranslation } from 'react-i18next';
import { useNightModeContext } from '../../../contexts/NightModeContext'

const ContainerMonitorWidget = () => {
  const dashboard = React.useContext(DashboardContext);
  const { t } = useTranslation();
  const { isNightMode } = useNightModeContext();
  const paperStyle = isNightMode ? { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden', backgroundColor: '#424242', color: 'white' } : { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' };
  const cardStyle = isNightMode ? { backgroundColor: '#333', color: 'white' } : {}; 

  const getContainerStatus = (status) => {
    if (status.startsWith('running')) {
      return <CheckCircleIcon color="success" />;
    } else {
      return <ErrorIcon color="error" />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper sx={paperStyle}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
          <Typography variant="h6"  mb={2}>{t('containerMonitorWidget.honeypotServices')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('containerMonitorWidget.helpText')} />
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
          {dashboard.containers && dashboard.containers.map((container, index) => (
            <Card sx={cardStyle} key={index}>
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
                <Typography variant="body2" style={isNightMode ? { color: 'white' } : { color: 'text.secondary' }}>{t('containerMonitorWidget.status')}: {container.status}</Typography>
                <Typography variant="body2" style={isNightMode ? { color: 'white' } : { color: 'text.secondary' }}>{t('containerMonitorWidget.ip')}: {container.ip.split('/')[0]}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ContainerMonitorWidget;
