import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';

const LogViewerWidget = () => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/honeypot/logs');
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    selectOnLineNumbers: true,
    readOnly: true,
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, height: '520px', maxWidth: '100%', margin: '1em' }}>
        <Typography variant="h6" mb={2}>Honeypot Connections Viewer</Typography>
        <MonacoEditor
          width="100%"
          height="90%"
          language="plaintext"
          theme="vs"
          value={logs}
          options={options}
        />
      </Paper>
    </Grid>
  );
};

export default LogViewerWidget;
