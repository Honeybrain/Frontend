import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';

const ListConnections = () => {
    const [logs, setLogs] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/honeypot/logs', { 
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
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
        <Box flex={1}>
            <Typography variant="h4" mb={2}>Connexions entrantes</Typography>
            <Box sx={{ height: "90%"}}>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language="plaintext"
                    theme="vs"
                    value={logs}
                    options={{ selectOnLineNumbers: true, readOnly: true }}
                />
            </Box>
        </Box>
    );
};

export default ListConnections;
