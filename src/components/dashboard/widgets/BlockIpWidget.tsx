import React from 'react';
import { Typography, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpModal from "@components/HelpModal";
import useBlackListRPC from '@hooks/backend/honeypotService/useBlackListRPC';
import DashboardContext from '@contexts/DashboardContext';
import { useTranslation } from 'react-i18next';
import { useNightModeContext } from '../../../contexts/NightModeContext'

const BlacklistPage = () => {
  const { putWhiteList } = useBlackListRPC();
  const dashboard = React.useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const { t } = useTranslation();
  const { isNightMode } = useNightModeContext();
  const paperStyle = isNightMode ? { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden', backgroundColor: '#424242', color: 'white' } : { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' };
  const listItemStyle = isNightMode ? { my: 1, px: 2, borderRadius: 1, backgroundColor: '#333' } : { my: 1, px: 2, borderRadius: 1, bgcolor: 'background.default' };

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleUnblock = React.useCallback(async (ip: string) => {
    try {
      await putWhiteList(ip);
      setAlertText(t('blockManager.unblockSuccess'));
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={paperStyle}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h6" mb={2}>{t('blacklistPage.blockedIPs')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('blacklistPage.helpText')}/>
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
          { dashboard.blacklist && dashboard.blacklist.length == 0 && <Typography variant="h6" style={isNightMode ? { color: 'white' } : {}}>{t('blacklistPage.noBlockedIP')}</Typography> }
          <List sx={{ overflow: 'auto' }}>
          {dashboard.blacklist && dashboard.blacklist.map((blacklistedIP, index) => (
            <React.Fragment key={index}>
                <ListItem sx={listItemStyle}>
                <ListItemText primary={blacklistedIP} primaryTypographyProps={{ style: isNightMode ? { color: 'white' } : {} }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleUnblock(blacklistedIP)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
          </List>
        </Box>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default BlacklistPage;
