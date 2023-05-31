import React, { useState, useEffect } from 'react';
import '../../../styles.css';

const ContainerManager = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    const response = await fetch('http://localhost:8000/honeypot/containers'); // Remplacer par votre endpoint réel
    const data = await response.json();
    setContainers(data);
  };

  return (
    <div className="container-manager">
      <h2>Gestion des conteneurs</h2>
      <ul className="container-list">
        {containers.map((container, index) => (
          <li key={index} className="container-item">
            <p>Nom: {container.name}</p>
            <p>Status: {container.status}</p>
            <p>IP: {container.ip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainerManager;
