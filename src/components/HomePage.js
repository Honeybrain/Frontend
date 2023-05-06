import React from 'react';
import './../App';
import '../styles.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-sidebar">
        <h3>HoneyPot</h3>
        <ul>
          <li>Tableau de bord</li>
          <li>Gestion des IP</li>
          <li>Manager des conteneurs</li>
          <li>Connexions entrantes</li>
          <li>Autres fonctionnalités</li>
        </ul>
      </div>
      <div className="home-content">
        <div className="content-header">
          <h2>Tableau de bord</h2>
          <button>Actions</button>
        </div>
        <div className="content-body">
          <div className="stat-box">
            <h4>IP bloquées</h4>
            <p>150</p>
          </div>
          <div className="stat-box">
            <h4>Conteneurs actifs</h4>
            <p>12</p>
          </div>
          <div className="stat-box">
            <h4>Connexions entrantes</h4>
            <p>500</p>
          </div>
          <div className="stat-box">
            <h4>Autres fonctionnalités</h4>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
