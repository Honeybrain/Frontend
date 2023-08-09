import React from 'react';
import { Typography, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpModal from "@components/HelpModal";
import useBlackListRPC from '@hooks/backend/honeypotService/useBlackListRPC';
import DashboardContext from '@contexts/DashboardContext';
import { useTranslation } from 'react-i18next';

const BlacklistPage = () => {
  const { putWhiteList } = useBlackListRPC();
  const dashboard = React.useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const { t } = useTranslation();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleUnblock = React.useCallback(async (ip: string) => {
    try {
      await putWhiteList(ip);
      setAlertText('IP unblocked successfully');
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden'}}>
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
          { dashboard.blacklist && dashboard.blacklist.length == 0 && <h4>{t('blacklistPage.noBlockedIP')}</h4> }
          <List sx={{ overflow: 'auto' }}>
          {dashboard.blacklist && dashboard.blacklist.map((blacklistedIP, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{
                my: 1,
                px: 2,
                bgcolor: index % 2 === 0 ? 'action.hover' : 'background.default',
                borderRadius: 1
              }}>
                <ListItemText primary={blacklistedIP} />
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
    </Grid>
  );
}

export default BlacklistPage;
