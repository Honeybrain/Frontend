import React, { useState, useEffect, ChangeEvent } from 'react';
import {Typography, TextField, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';
import useFetchHistoryRPC from '../hooks/backend/userService/useFetchHistoryRPC';
import { CircularProgress } from '@mui/material';


interface Action {
  id: number;
  user: string;
  type: 'danger' | 'safe';
  dangerKey: string;
  date: string;
  time: string;
  emailChanged?: boolean;
}

const HistoryPage: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { t } = useTranslation();
  const { fetchHistory } = useFetchHistoryRPC();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
    const data: Action[] = [
        { id: 1, user: 'atiteux@dev-id.fr', type: 'safe', dangerKey: 'dangerMedium', date: '21-09-2023', time: '09:43' },
        { id: 2, user: 'atiteuxtest@dev-id.fr', type: 'safe', dangerKey: 'dangerHigh', date: '20-09-2023', time: '15:43' },
      ];
  
    data.sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime());
    setActions(data);
    setLoading(false);
  }, 2000);
};
fetchData();
}, []);
if (loading) {
  return <CircularProgress />;
}
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
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
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
                  <TableCell>{t(`historyPage.${action.dangerKey}`)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>    </div>
  );
};

export default HistoryPage;
