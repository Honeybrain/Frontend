import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HoneyPotPage from './components/HoneyPotPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/honeypot" component={HoneyPotPage} />
            </Switch>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
