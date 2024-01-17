import { Grid, Paper, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';
import HelpModal from '@components/HelpModal';
import React from 'react';
import DashboardContext from '@contexts/DashboardContext';
import { useTranslation } from 'react-i18next';
import { useNightModeContext } from '../../../contexts/NightModeContext'

const LogViewerWidget = () => {
  const dashboard = React.useContext(DashboardContext);
  const { t } = useTranslation();
  const { isNightMode } = useNightModeContext();

  const monacoTheme = isNightMode ? 'vs-dark' : 'vs';

  return (
    <Grid item xs={12} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper 
        sx={{
          p: 2, 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          margin: '1em', 
          overflow: 'auto',
          ...(isNightMode && {
            backgroundColor: '#424242',
            color: 'white',
          })
        }}>        
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h6" mb={2}>{t('logViewerWidget.incomingConnections')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('logViewerWidget.helpText')} />
          </Grid>
        </Grid>
        <Box flex={1}>
          <MonacoEditor
            width="100%"
            height="100%"
            language="plaintext"
            theme={monacoTheme}
            value={dashboard.logs}
            options={{ selectOnLineNumbers: true, readOnly: true }}
          />
        </Box>
      </Paper>
    </Grid >
  );
};

export default LogViewerWidget;
