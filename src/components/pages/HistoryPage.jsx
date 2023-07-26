import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';


const HistoryPage = () => {
  const [actions, setActions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    // Fetching data from API...
    const data = [
      { id: 1, user: 'LazerSquad    ', type: 'danger', description: 'Niveau de danger : élevé', date: '2023-07-29', time: '11:00:00' },
      { id: 2, user: 'Julien', type: 'safe', description: 'Niveau de danger : faible', date: '2023-07-28', time: '10:00:00' },
      { id: 3, user: 'Paul', type: 'safe', description: 'Niveau de danger : élevé', date: '2023-06-29', time: '18:53:00' },
      { id: 4, user: 'Nicolas', type: 'safe', description: 'Niveau de danger : moyen', date: '2023-05-09', time: '14:20:42' },
      { id: 5, user: 'Bastien', type: 'safe', description: 'Niveau de danger : élevé', date: '2023-04-02', time: '08:52:00' },
      { id: 6, user: 'Anonymous', type: 'danger', description: 'Niveau de danger : moyen', date: '2023-03-30', time: '06:02:00' },
      { id: 7, user: 'Jules', type: 'safe', description: 'Niveau de danger : faible', date: '2023-01-17', time: '18:42:00' },

      // Plus d'actions...
    ];
  
    // Trier les données par date en ordre décroissant
    data.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
  
    setActions(data);
  }, []);

  return (
    <div className="history-page">
      <Typography variant="h4" component="div" gutterBottom className="title">
        {t('historyPage.title')}
      </Typography>
      <div className="search-bar">
        <SearchIcon />
        <TextField 
          id="search"
          label={t('historyPage.search')}
          variant="outlined"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>
      <TableContainer component={Paper} className="history-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('historyPage.date')}</TableCell>
              <TableCell>{t('historyPage.time')}</TableCell>
              <TableCell>{t('historyPage.type')}</TableCell>
              <TableCell>{t('historyPage.user')}</TableCell>
              <TableCell>{t('historyPage.description')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions
              .filter(action => action.user.includes(searchTerm) || action.type.includes(searchTerm))
              .map(action => (
                <TableRow key={action.id}>
                  <TableCell>{action.date}</TableCell>
                  <TableCell>{action.time}</TableCell>
                  <TableCell>
                    <Chip
                      icon={
                        action.type === 'safe' ? 
                          <CheckCircleIcon style={{ color: 'white' }} /> 
                          : 
                          <ErrorIcon style={{ color: 'white' }} />
                      }
                      label={t(`historyPage.${action.type}`)}
                      style={{
                        backgroundColor: action.type === 'safe' ? 'green' : 'red',
                        color: 'white',
                      }}
                    />
                  </TableCell>
                  <TableCell>{action.user}</TableCell>
                  <TableCell>{action.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryPage;
