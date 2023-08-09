import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import '../styles.css';
import { makeStyles } from '@mui/styles';

import React, { useContext } from 'react';
import AuthContext from "@contexts/AuthContext";
import { Link } from 'react-router-dom';
import theme from '../theme';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from '../i18n/LanguageSwitcher';

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

  const handleLogout = () => {
    logout();
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {t('navbar.dashboard')}
        </Typography>
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
