import '../../styles.css';
import BlockIpWidget from './widgets/BlockIpWidget';
import LogViewerWidget from './widgets/ListConnectionsWidget';
import ContainerMonitorWidget from './widgets/DockerWidget';
import { Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Grid item container>
        <Grid item xs={4}>
          <div />
        </Grid>
        <Grid item xs={4}>
          <div />
        </Grid>
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <LogViewerWidget />
      </Grid>
    </Grid>
  );
};

export default Dashboard;