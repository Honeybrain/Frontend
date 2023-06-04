import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import '../App';
import '../styles.css';
import AuthContext from '../AuthContext';
import Dashboard from './dashboard/Dashboard';
import ListConnections from './pages/ListConnections';
import ContainerManager from './pages/ContainerManager';
import BlockManager from './pages/BlockManager';
import Others from './pages/Others';
import IPManagementHelp from '../TutorielPopUp/IpManagementHelp';

const HomePage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const history = useHistory();
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [connections, setConnections] = useState([]);
  const [showTutorial, setShowTutorial] = useState(false);

  const openTutorial = () => {
    setShowTutorial(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
  };

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
    setContainers(data);
  };

  const handleMenuClick = (content) => {
    setCurrentContent(content);
  };

  const renderContent = () => {
    switch (currentContent) {
      case 'dashboard':
        return (
          <Dashboard>
          </Dashboard>)
      case 'otherFeatures':
        return (<Others />)
      case 'containerManager':
        return <ContainerManager />
      case 'incomingConnections':
        return (<ListConnections></ListConnections>)
      case 'ipManagement':
        return (
          <div>
            <BlockManager></BlockManager>
            <IPManagementHelp />
          </div>
        );
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
          <li onClick={openTutorial}>Voir le tutoriel</li>
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
