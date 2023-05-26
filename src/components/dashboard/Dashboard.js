import React from 'react';
import '../../styles.css';
import BlockIpWidget from './widgets/BlockIpWidget';
import ConfigGen from './widgets/ConfigGenWidget';
import LogViewerWidget from './widgets/ListConnectionsWidget';
import { Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container direction="column">
      <Grid container item direction="row">
        <Grid item>
          <ConfigGen />
        </Grid>
        <Grid item>
          <BlockIpWidget />
        </Grid>
      </Grid>
      <Grid item style={{ flexGrow: 1, width: '100%' }}>
        <LogViewerWidget />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
