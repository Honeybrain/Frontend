import React from 'react';
import '../../styles.css';
import BlockIpWidget from './widgets/BlockIpWidget';
import ConfigGen from './widgets/ConfigGenWidget';
import { Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container direction="row">
      <Grid item style={{ flexGrow: 0 }}>
        <ConfigGen />
      </Grid>
      <Grid item style={{ flexGrow: 0 }}>
        <BlockIpWidget />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
