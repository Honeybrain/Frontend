import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Snackbar, Alert, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useRulesRPC from '@hooks/backend/honeypotService/useRulesRPC';

const ConfigManager = () => {
  const { getDetectionRules, putFilters, putRules } = useRulesRPC();
  const [fail2BanData, setFail2BanData] = useState('');
  const [suricataData, setSuricataData] = useState('');

  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const loadConfig = async () => {
      const rules = await getDetectionRules();
      setFail2BanData(rules.filters);
      setSuricataData(rules.rules);
    };
    loadConfig();
  }, []);

  const handleSubmitFail2Ban = async (e) => {
    e.preventDefault();
    try {
      await putFilters(fail2BanData);
      setAlertText(t('rulesManager.saveSuccess'));
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitSuricata = async (e) => {
    e.preventDefault();
    try {
      await putRules(suricataData);
      setAlertText(t('rulesManager.saveSuccess'));
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = (label, data, setData, handleSubmit) => (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <Typography variant="h6" mb={2}>{label}</Typography>
      <TextField
        variant="outlined"
        required
        fullWidth
        multiline
        rows={10}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {t('rulesManager.saveChanges')}
      </Button>
    </Box>
  );

  return (
    <Box>
      {renderForm(t('rulesManager.fail2BanConfig'), fail2BanData, setFail2BanData, handleSubmitFail2Ban)}
      {renderForm(t('rulesManager.suricataConfig'), suricataData, setSuricataData, handleSubmitSuricata)}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConfigManager;
