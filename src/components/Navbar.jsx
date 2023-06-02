import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import '../styles.css';
import { makeStyles } from '@mui/styles';

import React, { useContext } from 'react';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';
import theme from './theme';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  navButton: {
    '&:hover': {
      backgroundColor: '#778899',
      color: theme.palette.primary.main,
    },
  },
});

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Dashboard
        </Typography>
        {!isLoggedIn && (
          <>
            <Button component={Link} to="/login" color="inherit" className={classes.navButton}>Login</Button>
          </>
        )}
        {isLoggedIn && (
          <>
            <Button component={Link} to="/" color="inherit" className={classes.navButton}>Accueil</Button>
            <Button component={Link} to="/profile" color="inherit" className={classes.navButton}>Profil</Button>
            <Button color="inherit" onClick={handleLogout} className={classes.navButton}>Déconnexion</Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

