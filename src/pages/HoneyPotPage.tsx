import React from 'react';
import '../styles.css';
import ipImage from '../Images/adressip.gif';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

type ConnectionStatus = 'safe' | 'danger';

interface Connection {
  id: number;
  ipAddress: string;
  time: string;
  status: ConnectionStatus;
}

const HoneyPotPage: React.FC = () => {
  const [connections, setConnections] = React.useState<Connection[]>([]);

  React.useEffect(() => {
    setConnections([
      { id: 1, ipAddress: '192.168.1.1', time: new Date().toLocaleString(), status: 'safe' },
      { id: 2, ipAddress: '192.168.1.2', time: new Date().toLocaleString(), status: 'danger' },
    ]);
  }, []);

  return (
    <div className="honey-pot-container">
      <Typography variant="h4" component="div" gutterBottom className="title">
        Connexions actuelles
      </Typography>
      <img src={ipImage} alt="IP Connections" className="ip-image" />
      <div className="connections-container">
        {connections.map((connection: Connection) => (
          <Card key={connection.id} className="connection-card">
            <CardContent>
              <Typography variant="h5" component="div" className="ip-address">
                IP: {connection.ipAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="ip-time">
                Heure: {connection.time}
              </Typography>
              <Chip
                icon={connection.status === 'safe' ? <CheckCircleIcon /> : <ErrorIcon />}
                label={connection.status === 'safe' ? 'Sûr' : 'Danger'}
                color={connection.status === 'safe' ? 'success' : 'error'}
                className="ip-status"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HoneyPotPage;
