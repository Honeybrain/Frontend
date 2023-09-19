import React, { useState, useEffect, useContext } from 'react';
import {
  Typography, TextField, Button, Grid, List, ListItem, ListItemText, Box, Select, MenuItem, Card, CardContent, Snackbar, Alert, IconButton
} from '@mui/material';
import useGetUsersRPC from '@hooks/backend/userService/useGetUsersRPC';
import useInviteUserRPC from '@hooks/backend/userService/useInviteUserRPC';
import useChangeRightsRPC from '@hooks/backend/userService/useChangeRightsRPC';
import useDeleteUserRPC from '@hooks/backend/userService/useDeleteUserRPC';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from "@contexts/AuthContext";

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
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const { rights} = useContext(AuthContext);

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
          changeRightsClick(email, admin);
        }}
        sx={{ width: '150px' }}
        label="Changer les droitas"
      >
        <MenuItem value="Utilisateur">Utilisateur</MenuItem>
        <MenuItem value="Administrateur">Administrateur</MenuItem>
      </Select>
    </>
  );

  const deleteButton = (email: string) => (
    <IconButton edge="end" sx={{ marginLeft: '3px' }} aria-label="delete" onClick={() => { deleteUserClick(email); }}>
        <DeleteIcon color="error" />
      </IconButton>
  )

  const changeRightsClick = async (email: string, admin: boolean) => {
    try {
      changeRights(email, admin);
    } catch (error: any) {
      setAlertText("Une erreur s'est produite lors du changement de droit de l'utilisateur.");
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  const deleteUserClick = async (email: string) => {
    try {
      deleteUser(email);
      fetchUsers();
    } catch (error: any) {
      setAlertText("Une erreur s'est produite lors de la suppression de l'utilisateur.");
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  const inviteUserClick = async (email: string) => {
    try {
      inviteUser(email);
      setAlertText("Utilisateur invité avec succès!");
      setAlertSeverity('success');
      setOpen(true);
      fetchUsers();
    } catch (error: any) {
      if (error.toString().toLowerCase().includes("exists")) {
        setAlertText("Un compte avec cet email existe déjà.");
      } else {
        setAlertText("Une erreur s'est produite lors de l'invitation de l'utilisateur.");
      }
      setAlertSeverity('error');
      setOpen(true);
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
    (rights ? <>
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
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Grid>
  </>
  : <></>
  )
  );
};

export default UsersManagement;
