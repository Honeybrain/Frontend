import React, { useState, useEffect } from 'react';
import './../App';
import '../styles.css';
import ConfigGen from './ConfigGen';


const HomePage = () => {
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [connections, setConnections] = useState([]);

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
      case 'containerManager':
        
      case 'incomingConnections':
        
      case 'otherFeatures':
       
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
        <div className="content-header">
          <h2>{currentContent}</h2>
          <button>Actions</button>
        </div>
        <div className="content-body">
          {renderContent()}
        </div>
        <div className='selector'>
          <ConfigGen />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
