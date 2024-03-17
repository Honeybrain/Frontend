import React, { useCallback, useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useNightModeContext } from '../../../contexts/NightModeContext'
import { GetHistoryRequest } from '@protos/user';
import { UserClient } from '@protos/user.client';
import { transport } from "../../../environment";

interface Data {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = () => {
  const client = new UserClient(transport);
  const { t } = useTranslation();
  const { isNightMode } = useNightModeContext();
  const paperStyle = isNightMode ? { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden', backgroundColor: '#424242', color: 'white' } : { p: 2, height: '360px', width: '25em', maxWidth: '100%', margin: '1em', overflow: 'hidden' };
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

  const data: Data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Dangerous',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Suspicious',
        data: [],
        backgroundColor: 'rgba(255, 255, 140)',
      },
    ],
  };
  
  const [dataChart, setDataChart] = useState(data);
  const getHistory = useCallback(async () => {
    try {
      return await client.getHistory(GetHistoryRequest.create(), {
        meta: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mode nuit', error);
    }
  }, []);
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const history = await getHistory();
        const newData:Data = {
          labels: data.labels,
          datasets: data.datasets.map((sets) => {
            const newDataArray = history?.response.entries.map(item => {
              return new Date(item.date).getMonth();
            })
            const MonthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            if (!newDataArray) {
              return {...sets, data: MonthArray};
            }
            newDataArray.map((data) => {
              MonthArray[data]++;
            });
            return {...sets, data: MonthArray};
          })
        }
        setDataChart(newData);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique', error);
      }
    };
    fetchData();
  }, [getHistory]);
  
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
          <Bar options={options} data={dataChart} />
        </Box>
      </Paper>
    </Grid>

  );
};

export default DoughnutChart;
