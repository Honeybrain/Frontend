import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from "@contexts/AuthContext";
import Navbar from 'components/Navbar';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import ProfilePage from '@pages/ProfilePage';
import HoneyPotPage from '@pages/HoneyPotPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@providers/AuthProvider';

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = React.useContext(AuthContext);
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
    const { isLoggedIn } = React.useContext(AuthContext);
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
    </Router>
  )
}

export default App;
