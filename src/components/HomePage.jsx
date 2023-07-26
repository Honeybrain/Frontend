import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../App';
import '../styles.css';
import AuthContext from '../AuthContext';
import Dashboard from './dashboard/Dashboard';
import ConnectionsManager from './pages/ConnectionsManager';
import ContainerManager from './pages/ContainerManager';
import BlockManager from './pages/BlockManager';
import Others from './pages/Others';
import History from './pages/HistoryPage';

const HomePage = () => {
  const { t } = useTranslation(); // <---- useTranslation hook
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
    setContainers(data);
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
        return (<div><BlockManager /></div>)
      case 'history':
        return <History />;
      default:

    }
  }

  return (
    <div className="home-container">
      <div className="home-sidebar">
        <h3>HoneyPot</h3>
        <ul>
          <li onClick={() => handleMenuClick('dashboard')}>{t('homePage.dashboard')}</li>
          <li onClick={() => handleMenuClick('ipManagement')}>{t('homePage.ipManagement')}</li>
          <li onClick={() => handleMenuClick('containerManager')}>{t('homePage.containerManager')}</li>
          <li onClick={() => handleMenuClick('incomingConnections')}>{t('homePage.incomingConnections')}</li>
          <li onClick={() => handleMenuClick('otherFeatures')}>{t('homePage.otherFeatures')}</li>
          <li onClick={() => handleMenuClick('history')}>{t('homePage.history')}</li>
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
