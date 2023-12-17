import { Grid, Paper, Typography, Card, CardContent, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpModal from "@components/HelpModal";;
import React from 'react';
import DashboardContext from '@contexts/DashboardContext';
import { useTranslation } from 'react-i18next';

const ContainerMonitorWidget = () => {
  const dashboard = React.useContext(DashboardContext);
  const { t } = useTranslation();

  const getContainerStatus = (status) => {
    if (status.startsWith('running')) {
      return <CheckCircleIcon color="success" />;
    } else {
      return <ErrorIcon color="error" />;
    }
  };

  return (
    <>
      <Paper sx={{ flexShrink: 1, p: 2, height: '360px', width: '25em', minWidth: '20rem', margin: '1em', overflow: 'hidden' }}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
          <Typography variant="h6" mb={2}>{t('containerMonitorWidget.honeypotServices')}</Typography>
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
                <Typography variant="body2" color="text.secondary">{t('containerMonitorWidget.status')}: {container.status}</Typography>
                <Typography variant="body2" color="text.secondary">{t('containerMonitorWidget.ip')}: {container.ip.split('/')[0]}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default ContainerMonitorWidget;
