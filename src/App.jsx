import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthContext, { AuthProvider } from './AuthContext';  
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HoneyPotPage from './components/HoneyPotPage';
import InvitationSignup from './components/pages/InvitationSignup';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
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

  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar />
            <Switch>
              <PublicRoute path="/login" component={LoginPage} />
              <PrivateRoute path="/" exact component={HomePage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute path="/honeypot" component={HoneyPotPage} />
            </Switch>
          </div>
        </ThemeProvider>
      </AuthProvider>
      <Route path="/signup/:token" component={InvitationSignup} />
    </Router>
  )
}

export default App;
