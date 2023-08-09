import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import HelpModal from "@components/HelpModal";
import useBlackListRPC from '@hooks/backend/honeypotService/useBlackListRPC';
import DashboardContext from '@contexts/DashboardContext';

const BlacklistPage = () => {
  const { putWhiteList } = useBlackListRPC();
  const dashboard = React.useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

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
            <Typography variant="h6" mb={2}>IP bloquées</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText="
            Avec le widget IP bloquées, vous pouvez voir les addresses IP de la liste noire. Cela signifie que toute tentative d'accès au honeypot à partir de cette adresse IP sera bloquée.

            Pour chaque adresse IP de la liste, un bouton de suppression est disponible.

            Pour supprimer une adresse IP de la liste noire, vous avez un boutton permettant cette suppression.

            Une notification apparaît à l'écran pour vous informer de l'action qui a été effectuée."/>
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
          { dashboard.blacklist && dashboard.blacklist.length == 0 && <h4>Aucune ip bloquée !</h4> }
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
              {dashboard.blacklist && index !== dashboard.blacklist.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default BlacklistPage;
