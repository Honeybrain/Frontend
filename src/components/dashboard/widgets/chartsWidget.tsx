import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid, Paper, Typography, Box } from '@mui/material';
import HelpModal from "@components/HelpModal";
import DashboardContext from '@contexts/DashboardContext';
import { useTranslation } from 'react-i18next';
import { useNightModeContext } from '../../../contexts/NightModeContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = () => {
  const dashboard = React.useContext(DashboardContext);
  const { t } = useTranslation();
  const { isNightMode } = useNightModeContext();
  const paperStyle = isNightMode ? { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden', backgroundColor: '#424242', color: 'white' } : { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('chartsWidget.blockedIPsYear'),
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Dangerous',
        data: [50, 10, 13, 45, 68, 34, 75],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Suspicious',
        data: [20, 30, 23, 15, 38, 42, 56],
        backgroundColor: 'rgba(255, 255, 140)',
      },
    ],
  };
  
  return (
    <Grid item xs={12}>
      <Paper sx={paperStyle}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
          <Typography variant="h6"  mb={2}>{t('chartsWidget.charts')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('chartsWidget.helpText')} />
          </Grid>
        </Grid>
        <Box
          sx={{
            height: '80%',
            overflow: 'auto',
            '& > *': {
              marginBottom: '16px',
            },
          }}
        >
          <Bar options={options} data={data} />
        </Box>
      </Paper>
    </Grid>

  );
};

export default DoughnutChart;
