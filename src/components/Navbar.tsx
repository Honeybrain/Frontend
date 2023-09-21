import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Tooltip, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import '../styles.css';
import { makeStyles } from '@mui/styles';
import { Settings, Logout } from '@mui/icons-material';
import React, { useContext } from 'react';
import AuthContext from "@contexts/AuthContext";
import { Link } from 'react-router-dom';
import theme from '../theme';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleRoutes = (path) => {
    history.push(path);
  }

  const classes = useStyles();

  return (
    <React.Fragment>
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
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Button component={Link} to="/" color="inherit" className={classes.navButton}>{t('navbar.home')}</Button>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                  <MenuItem onClick={()=>handleRoutes('/profile')}>
                    <Avatar />
                    {t('navbar.profile')}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <LanguageSwitcher />
                    <div style={{ margin: '10px' }}>{t('navbar.language')}</div>                  
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('navbar.logout')}
                  </MenuItem>
                </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
