import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import useGetUsersRPC from "@hooks/backend/userService/useGetUsersRPC";
import useInviteUserRPC from "@hooks/backend/userService/useInviteUserRPC";
import useChangeRightsRPC from "@hooks/backend/userService/useChangeRightsRPC";
import useDeleteUserRPC from "@hooks/backend/userService/useDeleteUserRPC";
import DeleteIcon from "@mui/icons-material/Delete";
import { RpcError } from "@protobuf-ts/runtime-rpc";
import { useTranslation } from 'react-i18next';

interface User {
  email: string;
  activated: boolean;
  admin: boolean;
  id: string;
}

const UsersManagement: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRights, setSelectedRights] = useState<Record<string, string>>(
    {},
  );
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success",
  );

  const { getUsers } = useGetUsersRPC();
  const { inviteUser } = useInviteUserRPC();
  const { changeRights } = useChangeRightsRPC();
  const { deleteUser } = useDeleteUserRPC();

  const myButton = (email: string, right: boolean) => (
    <>
      <Select
        value={
          selectedRights[email] || (right ? "Administrateur" : "Utilisateur")
        }
        onChange={async (e) => {
          setSelectedRights((prevSelectedRights) => ({
            ...prevSelectedRights,
            [email]: e.target.value as string,
          }));
          const admin = e.target.value === "Administrateur"; 
          await changeRightsClick(email, admin);
        }}
        sx={{ width: "150px" }}
        label="Changer les droitas"
      >
        <MenuItem value="Utilisateur">User</MenuItem>
        <MenuItem value="Administrateur">Admin</MenuItem>
      </Select>
    </>
  );

  const deleteButton = (email: string) => (
    <IconButton
      edge="end"
      sx={{ marginLeft: "3px" }}
      aria-label="delete"
      onClick={() => {
        deleteUserClick(email);
      }}
    >
      <DeleteIcon color="error" />
    </IconButton>
  );

  const changeRightsClick = async (email: string, admin: boolean) => {
    try {
      await changeRights(email, admin);
    } catch (error: any) {
      setAlertText(
        "Une erreur s'est produite lors du changement de droit de l'utilisateur.",
      );
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const deleteUserClick = async (email: string) => {
    try {
      await deleteUser(email);
      await fetchUsers();
    } catch (error) {
      setAlertText(
        "Une erreur s'est produite lors de la suppression de l'utilisateur.",
      );
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const inviteUserClick = async (email: string) => {
    try {
      await inviteUser(email);
      setAlertText("Utilisateur invité avec succès!");
      setAlertSeverity("success");
      setOpen(true);
      await fetchUsers();
    } catch (error) {
      setAlertSeverity("error");
      setOpen(true);
      if (error instanceof RpcError) {
        if (error.code == "ALREADY_EXISTS")
          return setAlertText("Un compte avec cet email existe déjà.");
      }
      setAlertText(
        "Une erreur s'est produite lors de l'invitation de l'utilisateur.",
      );
    }
  };

  const fetchUsers = async () => {
    try {
      const fetchedUsers = (await getUsers()).map(
        (userString: string) => JSON.parse(userString) as User,
      );
      setUsers(fetchedUsers);

      const initialRights: Record<string, string> = {};
      fetchedUsers.forEach((user) => {
        initialRights[user.email] = user.admin
          ? "Administrateur"
          : "Utilisateur";
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
        <Typography variant="h4">{t('usersManagement.title')}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" mb={2}>
          {t('usersManagement.inviteSection')}
        </Typography>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              type="email"
              label={t('usersManagement.emailLabel')}
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
              onClick={() => inviteUserClick(email)}
            >
              {t('usersManagement.sendInvitation')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom>
          {t('usersManagement.userList')}
        </Typography>
      </Grid>
      <Grid item xs sx={{ marginBottom: 0.4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            height: "100%",
            maxHeight: "calc(100vh - 440px)", // Set max height
            overflow: "auto",
          }}
        >
          <List>
            {users.map((user, index) => (
              <ListItem
                key={index}
                sx={{
                  my: 1,
                  px: 2,
                  bgcolor:
                    index % 2 === 0 ? "action.hover" : "background.default",
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={`${user.email}`}
                  secondary={`${
                    user.activated ? "Activé" : "En attente d'activation"
                  }`}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {myButton(user.email, user.admin)}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {deleteButton(user.email)}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default UsersManagement;
