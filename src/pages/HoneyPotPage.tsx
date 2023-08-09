import React from 'react';
import '../styles.css';
import ipImage from '../images/adressip.gif';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';

type ConnectionStatus = 'safe' | 'danger';

interface Connection {
  id: number;
  ipAddress: string;
  time: string;
  status: ConnectionStatus;
}

const HoneyPotPage: React.FC = () => {
  const [connections, setConnections] = React.useState<Connection[]>([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    setConnections([
      { id: 1, ipAddress: '192.168.1.1', time: new Date().toLocaleString(), status: 'safe' },
      { id: 2, ipAddress: '192.168.1.2', time: new Date().toLocaleString(), status: 'danger' },
    ]);
  }, []);

  return (
    <div className="honey-pot-container">
      <Typography variant="h4" component="div" gutterBottom className="title">
        {t('HoneyPotPage:current_connections')}
      </Typography>
      <img src={ipImage} alt={t('HoneyPotPage:ip_connections')} className="ip-image" />
      <div className="connections-container">
        {connections.map((connection: Connection) => (
          <Card key={connection.id} className="connection-card">
            <CardContent>
              <Typography variant="h5" component="div" className="ip-address">
                {t('HoneyPotPage.ip')}: {connection.ipAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="ip-time">
                {t('HoneyPotPage.time')}: {connection.time}
              </Typography>
              <Chip
                icon={connection.status === 'safe' ? <CheckCircleIcon /> : <ErrorIcon />}
                label={connection.status === 'safe' ? 'safe' : 'danger'}
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
