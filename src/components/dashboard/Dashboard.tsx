import '../../styles.css';
import BlockIpWidget from './widgets/BlockIpWidget';
import LogViewerWidget from './widgets/ListConnectionsWidget';
import ContainerMonitorWidget from './widgets/ContainerMonitorWidget';
import { Grid, Box, Container } from '@mui/material';
import { DashboardProvider } from '@providers/DashboardProvider';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <Box display={"flex"} flexDirection={"column"} height={"100%"}>
        <Box display={"flex"} flexDirection={"row"} minWidth={"30rem !important"}>
            <ContainerMonitorWidget />
            <BlockIpWidget />
        </Box>
        <Box style={{ flexGrow: 1 }}>
          <LogViewerWidget />
        </Box>
      </Box>
    </DashboardProvider>
  );
};

export default Dashboard;
