import React, { useState, useEffect } from 'react';
import {
  Typography, TextField, Button, Grid, List, ListItem, ListItemText, Box, Select, MenuItem, Card, CardContent
} from '@mui/material';
import useGetUsersRPC from '@hooks/backend/userService/useGetUsersRPC';
import useInviteUserRPC from '@hooks/backend/userService/useInviteUserRPC';

interface User {
  _id: string;
  email: string;
  activated: boolean;
  admin: boolean;
}

const UsersManagement: React.FC = () => {
  const [selectedRights, setSelectedRights] = useState<Record<string, string>>({});
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const { getUsers } = useGetUsersRPC();
  const { inviteUser } = useInviteUserRPC();

  const changeRights = async (e: React.FormEvent, userId: string) => {
    e.preventDefault();
    // Logic pour changer les droits ici
  };

  const myButton = (userId: string) => (
    <>
      <Select
        value={selectedRights[userId] || ""}
        onChange={(e) => {
          setSelectedRights((prevSelectedRights) => ({
            ...prevSelectedRights,
            [userId]: e.target.value as string,
          }));
        }}
        label="Changer les droits"
      >
        <MenuItem value="Utilisateur">Utilisateur</MenuItem>
        <MenuItem value="Administrateur">Administrateur</MenuItem>
        <MenuItem value="Propriétaire">Propriétaire</MenuItem>
      </Select>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={(e) => changeRights(e as React.FormEvent, userId)}
        sx={{ marginLeft: 2 }}
      >
        Changer
      </Button>
    </>
  );

  const inviteUserClick = async (email: string) => {
    try {
      await inviteUser(email);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const fetchedUsers = (await getUsers()).map((userString: string) => JSON.parse(userString) as User);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

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
                  primary={`Mail: ${user.email}`}
                  secondary={`ID: ${user._id} | Rights: ${user.admin ? "Administrateur" : "Utilisateur"}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {myButton(user._id)}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );

};

export default UsersManagement;
