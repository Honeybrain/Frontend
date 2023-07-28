import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '@contexts/AuthContext';
import Dashboard from '@components/dashboard/Dashboard';
import ConnectionsManager from '@components/dashboard/ConnectionsManager';
import ContainerManager from '@components/dashboard/ContainerManager';
import BlockManager from '@components/dashboard/BlockManager';
import Others from '@components/dashboard/Others';

const HomePage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const history = useHistory();
  const [currentContent, setCurrentContent] = useState('dashboard');

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (currentContent === 'containerManager') {
      fetchConnections();
    }
  }, [currentContent]);

  const fetchConnections = async () => {
    const response = await fetch(''); 
    const data = await response.json();
    // setContainers(data); TODO
  };

  const handleMenuClick = (content) => {
    setCurrentContent(content);
  };

  const renderContent = () => {
    switch (currentContent) {
      case 'dashboard':
        return (<Dashboard />)
      case 'otherFeatures':
        return (<Others />)
      case 'containerManager':
        return <ContainerManager />
      case 'incomingConnections':
        return (<ConnectionsManager />)
      case 'ipManagement':
        return (<div><BlockManager /></div>);
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
