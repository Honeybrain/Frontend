import React, { useState, useEffect, useContex} from 'react';
import { Grid, Typography, Card, Button, CardContent, Box, MenuItem, Select} from '@mui/material';

const Item = ({ children }) => (
  <Typography variant="body1">{children}</Typography>
);

const UsersManagement = () => {
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [selectedRights, setSelectedRights] = useState({});
  const newEmail = 'example@example.com';
  const [users, setUsers] = useState([]);

  const changeRights = async (e, userId) => {
    e.preventDefault();
    console.log(selectedRights[userId]);

    fetch('http://localhost:8000/user/changeUserRights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newRights: selectedRights[userId], uid: userId}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmittedEmail(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const myButton = (userId) => (
    <Grid item>
      <Select
        value={selectedRights[userId] || ""}
        onChange={(e) => {
          setSelectedRights((prevSelectedRights) => ({
            ...prevSelectedRights,
            [userId]: e.target.value,
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
        onClick={(e) => changeRights(e, userId)}
      >
        Changer les droits
      </Button>
    </Grid>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/user/usersByProjectId', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
  };

  return (
    <Grid container direction="column">
          <Grid item>
            <Typography variant="h4" mb={2}>
              Gestion des utilisateurs
            </Typography>
          </Grid>
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>


          <Grid item xs>
            <Box
              sx={{
                height: '100%',
                maxHeight: 'calc(100vh - 220px)', // Set max height
                overflow: 'auto',
                '& > *': {
                  marginBottom: '16px', // Add a margin to each child
                },
              }}
            >
            {users.map((item, index) => {
            const key = Object.keys(item)[0]; // Get the key of the object
            const values = item[key];
            return (
              <Card variant="outlined" key={index}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="h6">Mail: {values.mail}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">ID: {key}</Typography>
                  <Typography variant="body2" color="text.secondary">Rights: {values.rights}</Typography>
                        {myButton(key)}
                </CardContent>
              </Card>
            )
            })}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UsersManagement;
