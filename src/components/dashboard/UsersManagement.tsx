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
import { RoleEnum } from "../../_utils/enums/role.enum";
import { useTranslation } from "react-i18next";
import { UserDto } from "@protos/user";

const UsersManagement: React.FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");

  const [users, setUsers] = useState<UserDto[]>([]);

  const [alert, setAlert] = useState<{
    content: string;
    severity: "success" | "error";
  } | null>(null);

  const { getUsers } = useGetUsersRPC();
  const { inviteUser } = useInviteUserRPC();
  const { changeRights } = useChangeRightsRPC();
  const { deleteUser } = useDeleteUserRPC();

  const myButton = (user: UserDto) => (
    <>
      <Select
        multiple
        value={user.roles}
        onChange={(e) =>
          changeRightsClick(user, [e.target.value as RoleEnum[]].flat())
        }
        sx={{ width: "150px" }}
        label="Changer les droits"
      >
        {Object.entries(RoleEnum)
          .filter((x) => typeof x[1] == "number")
          .map((role) => (
            <MenuItem key={role[1]} value={role[1]}>
              {t(`roleEnum.${role[0]}`)}
            </MenuItem>
          ))}
      </Select>
    </>
  );

  const deleteButton = (user: UserDto) => (
    <IconButton
      edge="end"
      sx={{ marginLeft: "3px" }}
      aria-label="delete"
      onClick={() => deleteUserClick(user)}
    >
      <DeleteIcon color="error" />
    </IconButton>
  );

  const changeRightsClick = (user: UserDto, roles: number[]) =>
    changeRights(user.email, roles)
      .then((newUser) =>
        setUsers((x) => [
          ...x.filter((y) => y.id != user.id),
          newUser.response,
        ]),
      )
      .catch(() =>
        setAlert({
          content:
            "Une erreur s'est produite lors du changement de droit de l'utilisateur.",
          severity: "error",
        }),
      );

  const deleteUserClick = (user: UserDto) =>
    deleteUser(user.email)
      .then(() => setUsers((x) => [...x.filter((y) => y.id != user.id)]))
      .catch(() =>
        setAlert({
          content:
            "Une erreur s'est produite lors de la suppression de l'utilisateur.",
          severity: "error",
        }),
      );

  const inviteUserClick = (email: string) =>
    inviteUser(email)
      .then((x) => {
        setUsers((y) => [...y, x.response]);
        setAlert({
          content: "Utilisateur invité avec succès!",
          severity: "success",
        });
      })
      .catch((error) => {
        if (error instanceof RpcError) {
          if (error.code == "ALREADY_EXISTS")
            return setAlert({
              content: "Un compte avec cet email existe déjà.",
              severity: "error",
            });
        }
        setAlert({
          content:
            "Une erreur s'est produite lors de l'invitation de l'utilisateur.",
          severity: "error",
        });
      });

  const fetchUsers = () =>
    getUsers()
      .then(setUsers)
      .catch((x) =>
        console.error("Erreur lors de la récupération des utilisateurs:", x),
      );

  const handleClose = React.useCallback(() => {
    setAlert(null);
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Gestion des utilisateurs</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" mb={2}>
          Inviter un nouvel utilisateur
        </Typography>
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
              onClick={() => inviteUserClick(email)}
            >
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
                  {myButton(user)}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {deleteButton(user)}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Snackbar open={!!alert} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert?.severity}
          sx={{ width: "100%" }}
        >
          {alert?.content}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default UsersManagement;
