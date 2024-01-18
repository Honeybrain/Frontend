import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import '../styles.css';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import AuthContext from "@contexts/AuthContext";
import { Link } from 'react-router-dom';
import theme from '../theme';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';
import useNightMode from '../hooks/backend/userService/useNightMode'; // Assurez-vous que le chemin d'accès est correct
import Brightness7Icon from '@mui/icons-material/Brightness7'; // icône de soleil
import Brightness4Icon from '@mui/icons-material/Brightness4'; // icône de lune

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  navButton: {
    '&:hover': {
      color: theme.palette.primary.main , 
      backgroundColor: 'white !important',
    },
  },
});


const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const { isNightMode, toggleNightMode } = useNightMode();

  const handleLogout = () => {
    logout();
  };

  const handleToggleNightMode = () => {
    toggleNightMode().then(() => {
      window.location.reload();
    }).catch(err => {
      console.error('Erreur while switching night mode', err);
    });
  };

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {t('navbar.dashboard')}
        </Typography>
        <IconButton onClick={handleToggleNightMode} color="inherit">
          {isNightMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <LanguageSwitcher />
        {!isLoggedIn && (
          <>
            <Button component={Link} to="/login" color="inherit" className={classes.navButton}>{t('navbar.login')}</Button>
          </>
        )}
        {isLoggedIn && (
          <>
            <Button component={Link} to="/" color="inherit" className={classes.navButton}>{t('navbar.home')}</Button>
            <Button component={Link} to="/profile" color="inherit" className={classes.navButton}>{t('navbar.profile')}</Button>
            <Button color="inherit" onClick={handleLogout} className={classes.navButton}>{t('navbar.logout')}</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;