import React, { useState } from 'react';
import '../../styles.css';
import BlacklistPage from '../BlackListPage';
import ConfigGen from './widgets/ConfigGenWidget';
import { Grid } from '@mui/material';

const Dashboard = () => {

  return (
    <Grid container spacing={3} alignItems="flex-start" justifyContent="flex-start">
      <Grid item xs={true}>
        <ConfigGen />
      </Grid>

    </Grid>
  );
};

export default Dashboard;