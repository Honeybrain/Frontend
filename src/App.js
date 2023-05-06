import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import './styles.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage}/>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
