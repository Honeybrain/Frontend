import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';
import HelpModal from '../../../TutorielPopUp/HelpModal';
import { useTranslation } from 'react-i18next';

const LogViewerWidget = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
          console.log(`Bearer ${localStorage.getItem('token')}`);
          const response = await axios.get('/api/honeypot/logs', {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setLogs(response.data);
      } catch (error) {
          console.error(error);
      }
  };

    const interval = setInterval(fetchLogs, 1000); // Mettre à jour les logs toutes les 5 secondes

    return () => {
      clearInterval(interval); // Clear the interval when the component is unmounted
    };
  }, []);

  return (
    <Grid item xs={12} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', margin: '1em', overflow: 'auto' }}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h6" mb={2}>{t('logViewerWidget.incomingConnections')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('logViewerWidget.helpText')}/>
          </Grid>
        </Grid>
        <Box flex={1}>
          <MonacoEditor
            width="100%"
            height="100%"
            language="plaintext"
            theme="vs"
            value={logs}
            options={{ selectOnLineNumbers: true, readOnly: true }}
          />
        </Box>
      </Paper>
    </Grid >
  );
};

export default LogViewerWidget;
