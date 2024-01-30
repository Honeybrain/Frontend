import React from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import HelpModal from "@components/HelpModal";
import useBlackListRPC from "@hooks/backend/honeypotService/useBlackListRPC";
import { useTranslation } from "react-i18next";
import { NightModeContext } from "@contexts/NightModeContext";
import { useContext } from "react";

const BlockManager = () => {
  const {
    blacklist,
    putBlackList,
    putWhiteList,
    blockCountry,
    unblockCountry,
    getBlockedCountries,
  } = useBlackListRPC();
  const [ip, setIp] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [blockedCountries, setBlockedCountries] = React.useState<string[]>([]);
  const { t } = useTranslation();
  const { isNightMode } = useContext(NightModeContext);
  const nightModeBgColor1 = "color1ForNightMode";
  const nightModeBgColor2 = "color2ForNightMode";
  const textFieldStyle = isNightMode
    ? {
        InputLabelProps: { style: { color: "white" } },
        inputProps: { style: { color: "white" } },
        sx: { borderBottom: "1px solid white" },
      }
    : {};
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putBlackList(ip);
      setIp("");
      setAlertText(t("blockManager.blockSuccess"));
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnblock = async (ip) => {
    try {
      await putWhiteList(ip);
      setAlertText(t("blockManager.unblockSuccess"));
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshBlockedCountries = async () => {
    try {
      const countries = await getBlockedCountries();
      setBlockedCountries(countries);
    } catch (error) {
      console.error("Error fetching blocked countries:", error);
    }
  };

  const handleBlockCountry = async (e) => {
    e.preventDefault();
    try {
      await blockCountry(country);
      setCountry("");
      setAlertText(t("blockManager.blockCountrySuccess"));
      setOpen(true);
      refreshBlockedCountries();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnblockCountry = async (country) => {
    try {
      await unblockCountry(country);
      setAlertText(t("blockManager.unblockCountrySuccess"));
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    refreshBlockedCountries();
  }, [refreshBlockedCountries]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Grid item>
            <Typography variant="h4">
              {t("blockManager.ipManagement")}
            </Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t("blockManager.helpText")} />
          </Grid>
        </Grid>
      </Grid>
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
          <Grid item xs>
            <Typography variant="h6" mb={2}>
              {t("blockManager.blockACountry")}
            </Typography>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="stretch"
              component="form"
              onSubmit={handleBlockCountry}
            >
              <Grid item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label={t("blockManager.countryCode")}
                  autoFocus
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  {...textFieldStyle}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {t("blockManager.blockCountry")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="h2" gutterBottom mt={2}>
              {t("blockManager.currentlyBlockedCountries")}
            </Typography>
            <List>
              {blockedCountries.length > 0 ? (
                blockedCountries.map((country, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      my: 1,
                      px: 2,
                      bgcolor: isNightMode
                        ? index % 2 === 0
                          ? nightModeBgColor1
                          : nightModeBgColor2
                        : index % 2 === 0
                          ? "action.hover"
                          : "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleUnblockCountry(country)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    <ListItemText primary={country} />
                    {/* Ajouter des actions pour chaque pays si nécessaire */}
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ px: 2 }}>
                  {t("blockManager.noBlockedCountries")}
                </Typography>
              )}
            </List>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" mb={2}>
              {t("blockManager.blockAnIP")}
            </Typography>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="stretch"
              component="form"
              onSubmit={handleSubmit}
            >
              <Grid item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="ip"
                  label={t("blockManager.ipAddress")}
                  autoFocus
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  {...textFieldStyle}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {t("blockManager.blockIP")}
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="h6" component="h2" gutterBottom mt={2}>
                  {t("blockManager.currentlyBlocked")}
                </Typography>
              </Grid>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {alertText}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
          <Grid item xs>
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
                {blacklist &&
                  blacklist.map((blacklistedIP, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        my: 1,
                        px: 2,
                        bgcolor: isNightMode
                          ? index % 2 === 0
                            ? nightModeBgColor1
                            : nightModeBgColor2
                          : index % 2 === 0
                            ? "action.hover"
                            : "background.default",
                        borderRadius: 1,
                      }}
                    >
                      <ListItemText primary={blacklistedIP} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleUnblock(blacklistedIP)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                      {index !== blacklist.length - 1 && <Divider />}
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BlockManager;
