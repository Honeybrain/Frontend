import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import '../styles.css';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { useTranslation } from "react-i18next"; // <-- Import useTranslation hook
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';
import theme from './theme';
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
  const { t } = useTranslation(); // <-- useTranslation hook
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {t('navbar.dashboard')} {/* Use the t function to get the translated string */}
        </Typography>
        <LanguageSwitcher />
        {!isLoggedIn && (
          <>
            <Button component={Link} to="/login" color="inherit" className={classes.navButton}>
              {t('navbar.login')} {/* Use the t function to get the translated string */}
            </Button>
          </>
        )}
        {isLoggedIn && (
          <>
            <Button component={Link} to="/" color="inherit" className={classes.navButton}>
              {t('navbar.home')} {/* Use the t function to get the translated string */}
            </Button>
            <Button component={Link} to="/profile" color="inherit" className={classes.navButton}>
              {t('navbar.profile')} {/* Use the t function to get the translated string */}
            </Button>
            <Button color="inherit" onClick={handleLogout} className={classes.navButton}>
              {t('navbar.logout')} {/* Use the t function to get the translated string */}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
