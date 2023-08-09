import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import HelpModal from "@components/HelpModal";
import useBlackListRPC from '@hooks/backend/honeypotService/useBlackListRPC';

const BlockManager = () => {
  const { blacklist, putBlackList, putWhiteList } = useBlackListRPC();
  const [ip, setIp] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

  const handleClose = React.useCallback(() => {
    //if (reason === 'clickaway') {
    //  return;
    //} // TODO
    setOpen(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putBlackList(ip);
      setIp('');
      setAlertText('IP blocked successfully');
      setOpen(true);
    } catch (error) {
        console.error(error);
    }
  };

  const handleUnblock = async (ip) => {
    try {
      await putWhiteList(ip);
      setAlertText('IP unblocked successfully');
      setOpen(true);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h4">Gestion des IP</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText="
            Vous pouvez ajouter une addresse IP à la liste noire. Cela signifie que toute tentative d'accès au honeypot à partir de cette adresse IP sera bloquée.

            Une liste de toutes les adresses IP actuellement bloquées est affichée à l'écran. Pour chaque adresse IP de la liste, un bouton de suppression est disponible.

            Pour supprimer une adresse IP de la liste noire, vous avez un boutton permettant cette suppression.

            - Une notification apparaît à l'écran pour vous informer de l'action qui a été effectuée."/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs sx={{ marginBottom: 0.4 }}>
        <Typography variant="h6" mb={2}>Block an IP</Typography>
        <Grid container spacing={2} direction="column" alignItems="stretch" component="form" onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="ip"
              label="IP Address"
              autoFocus
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Block IP
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h2" gutterBottom mt={2}>
              Currently Blocked IPs
            </Typography>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
      <Grid item xs>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              height: '100%',
              maxHeight: 'calc(100vh - 440px)', // Set max height
              overflow: 'auto',
            }}
          >
            <List>
              {blacklist && blacklist.map((blacklistedIP, index) => (
                <ListItem key={index} sx={{
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
                  {index !== blacklist.length - 1 && <Divider />}
                </ListItem>
              ))}
            </List>
          </Box>
      </Grid>
    </Grid>
  );
};

export default BlockManager;
