import React from 'react';
import '../../styles.css';
import BlockIpWidget from './widgets/BlockIpWidget';
import LogViewerWidget from './widgets/ListConnectionsWidget';
import ContainerMonitorWidget from './widgets/DockerWidget';
import { Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container direction="column">
      <Grid container item direction="row">
        <Grid item>
          <BlockIpWidget />
        </Grid>
        <Grid item>
          <ContainerMonitorWidget />
        </Grid>
      </Grid>
      <Grid item style={{ flexGrow: 1, width: '100%' }}>
        <LogViewerWidget />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
