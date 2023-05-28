import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';

const LogViewerWidget = () => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/honeypot/logs');
        setLogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchLogs, 1000); // Mettre à jour les logs toutes les 5 secondes

    return () => {
      clearInterval(interval); // Effacer l'intervalle lorsque le composant est démonté
    };
  }, []);

  return (
    <Grid item xs={12} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', margin: '1em', overflow: 'auto' }}>
        <Typography variant="h6" mb={2}>Honeypot Connections Viewer</Typography>
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
