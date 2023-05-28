import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import '../App';
import '../styles.css';
import AuthContext from '../AuthContext';
import Dashboard from './dashboard/Dashboard';
import ListConnections from './dashboard/pages/ListConnections';
import Others from './dashboard/pages/Others';

const HomePage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const history = useHistory();
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (currentContent === 'ipManagement') {
      fetchConnections();
    }
  }, [currentContent]);

  const fetchConnections = async () => {
    // Replace this with your actual API call or data fetching
    const response = await fetch('your-api-endpoint');
    const data = await response.json();
    setConnections(data);
  };

  const handleMenuClick = (content) => {
    setCurrentContent(content);
  };

  const renderContent = () => {
    switch (currentContent) {
      case 'ipManagement':
        return (
          <div>
            {connections.map((connection, index) => (
              <div key={index}>
                <p>{connection.ip}</p>
                <p>{connection.dateTime}</p>
              </div>
            ))}
          </div>
        );
      case 'dashboard':
        return (
          <Dashboard>
          </Dashboard>)
      case 'otherFeatures':
        return (<Others />)
      case 'containerManager':

      case 'incomingConnections':
        return (<ListConnections></ListConnections>)
      default:

    }
  }

  return (
    <div className="home-container">
      <div className="home-sidebar">
        <h3>HoneyPot</h3>
        <ul>
          <li onClick={() => handleMenuClick('dashboard')}>Tableau de bord</li>
          <li onClick={() => handleMenuClick('ipManagement')}>Gestion des IP</li>
          <li onClick={() => handleMenuClick('containerManager')}>Manager des conteneurs</li>
          <li onClick={() => handleMenuClick('incomingConnections')}>Connexions entrantes</li>
          <li onClick={() => handleMenuClick('otherFeatures')}>Autres fonctionnalités</li>
        </ul>
      </div>
      <div className="home-content">
        <div className="content-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
