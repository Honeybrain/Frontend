import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';
import HelpModal from '../../TutorielPopUp/HelpModal';
import { useTranslation } from 'react-i18next';

const ListConnections = () => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
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
            clearInterval(interval); // Effacer l'intervalle lorsque le composant est démonté
        };
    }, []);

    return (
        <Box flex={1}>
            <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Grid item>
                    <Typography variant="h4" mb={2}>{t('listConnections.title')}</Typography>
                </Grid>
                <Grid item>
                    <HelpModal helpText={t('listConnections.helpText')}/>
                </Grid>
            </Grid>
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
