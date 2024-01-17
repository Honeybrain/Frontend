import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from "@contexts/AuthContext";
import Navbar from '@components/Navbar';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import ProfilePage from '@pages/ProfilePage';
import HoneyPotPage from '@pages/HoneyPotPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@providers/AuthProvider';
import './i18n/i18n';
import InvitationSignup from '@pages/Invitation';
import { NightModeProvider, NightModeContext } from '@contexts/NightModeContext';
import './styles.css'

function App() {
  
  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isNightMode } = useContext(NightModeContext);

    useEffect(() => {
      if (isNightMode) {
        document.body.classList.add('night-mode-body');
      } else {
        document.body.classList.remove('night-mode-body');
      }
    }, [isNightMode]);
    const { isLoggedIn } = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  const PublicRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={props =>
          !isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  const { isNightMode } = useContext(NightModeContext);

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add('night-mode-body');
    } else {
      document.body.classList.remove('night-mode-body');
    }
  }, [isNightMode]);

  return (
    <Router>
      <AuthProvider>
        <NightModeProvider>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <div className="App">
              <Navbar />
              <Switch>
                <PublicRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/" exact component={HomePage} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <PrivateRoute path="/honeypot" component={HoneyPotPage} />
                <Route path="/activate/:activationToken" component={InvitationSignup} />
              </Switch>
            </div>
          </ThemeProvider>
        </NightModeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
