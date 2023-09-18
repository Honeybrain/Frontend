import React, { useState, useEffect } from 'react';
import {
  Typography, TextField, Button, Grid, List, ListItem, ListItemText, Box, Select, MenuItem, Card, CardContent, Snackbar, Alert
} from '@mui/material';
import useGetUsersRPC from '@hooks/backend/userService/useGetUsersRPC';
import useInviteUserRPC from '@hooks/backend/userService/useInviteUserRPC';
import useChangeRightsRPC from '@hooks/backend/userService/useChangeRightsRPC';
import useDeleteUserRPC from '@hooks/backend/userService/useDeleteUserRPC';

interface User {
  email: string;
  activated: boolean;
  admin: boolean;
  id: string;
}

const UsersManagement: React.FC = () => {
  const [selectedRights, setSelectedRights] = useState<Record<string, string>>({});
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

  const { getUsers } = useGetUsersRPC();
  const { inviteUser } = useInviteUserRPC();
  const { changeRights } = useChangeRightsRPC();
  const { deleteUser } = useDeleteUserRPC();

  const myButton = (email: string, right: boolean) => (
    <>
      <Select
        value={selectedRights[email] || (right ? "Administrateur" : "Utilisateur")}
        onChange={(e) => {
          setSelectedRights((prevSelectedRights) => ({
            ...prevSelectedRights,
            [email]: e.target.value as string,
          }));
          const admin = e.target.value === "Administrateur";  // Cette ligne transforme la valeur en un booléen
          changeRights(email, admin);
        }}
        sx={{ width: '150px' }}
        label="Changer les droits"
      >
        <MenuItem value="Utilisateur">Utilisateur</MenuItem>
        <MenuItem value="Administrateur">Administrateur</MenuItem>
      </Select>
    </>
  );

  const deleteButton = (email: string) => (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        deleteUser(email);
      }}
    >
      Supprimer
    </Button>
  )

  const inviteUserClick = async (email: string) => {
    try {
      await inviteUser(email);
      setAlertText("Utilisateur invité avec succès!");
      setOpen(true);
      await fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'invitation", error);
    }
  };

  const fetchUsers = async () => {
    try {
        const fetchedUsers = (await getUsers()).map((userString: string) => JSON.parse(userString) as User);
        setUsers(fetchedUsers);

        const initialRights: Record<string, string> = {};
        fetchedUsers.forEach(user => {
            initialRights[user.email] = user.admin ? "Administrateur" : "Utilisateur";
        });
        setSelectedRights(initialRights);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Gestion des utilisateurs
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" mb={2}>Inviter un nouvel utilisateur</Typography>
        <Grid container spacing={2} direction="column">
            <Grid item>
                <TextField
                    type="email"
                    label="Email nouvel utilisateur"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => { inviteUserClick(email) }}>
                    Envoyer l'invitation
                </Button>
            </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom>
          Liste des utilisateurs
        </Typography>
      </Grid>
      <Grid item xs sx={{ marginBottom: 0.4 }}>
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
            {users.map((user, index) => (
              <ListItem key={index} sx={{
                my: 1,
                px: 2,
                bgcolor: index % 2 === 0 ? 'action.hover' : 'background.default',
                borderRadius: 1
              }}>
                <ListItemText
                  primary={`${user.email}`}
                  secondary={`${user.activated ? "Activé" : "En attente d'activation"}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {myButton(user.email, user.admin)}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {deleteButton(user.email)}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Grid>
  );

};

export default UsersManagement;
