import "../../styles.css";
import BlockIpWidget from "./widgets/BlockIpWidget";
import LogViewerWidget from "./widgets/ListConnectionsWidget";
import ChartsWidget from "./widgets/chartsWidget";
import ContainerMonitorWidget from "./widgets/ContainerMonitorWidget";
import { Grid } from "@mui/material";
import { DashboardProvider } from "@providers/DashboardProvider";
import { HaveRoles } from "../../_utils/function/have-roles";
import { RoleEnum } from "@protos/user";
import { useContext } from "react";
import AuthContext from "@contexts/AuthContext";
import { NightModeContext } from '@contexts/NightModeContext'; // Assurez-vous que ce chemin est correct

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { isNightMode } = useContext(NightModeContext);
  const containerClassName = isNightMode ? "dashboard-container night-mode" : "dashboard-container";

  return (
    <DashboardProvider>
      <Grid container direction="column" style={{ height: "100%" }} className={containerClassName}>
        <Grid item container>
          {HaveRoles(user, [RoleEnum.CAN_READ_SERVICES]) && (
            <Grid item xs={4}>
              <ContainerMonitorWidget />
            </Grid>
          )}
          {HaveRoles(user, [RoleEnum.CAN_READ_IP]) && (
            <Grid item xs={4}>
              <BlockIpWidget />
            </Grid>
          )}
          {HaveRoles(user, [RoleEnum.CAN_READ_SERVICES]) && (
            <Grid item xs={4}>
              <ChartsWidget />
            </Grid>
          )}
        </Grid>
        {HaveRoles(user, [RoleEnum.CAN_READ_LOGS]) && (
          <Grid item style={{ flexGrow: 1 }}>
            <LogViewerWidget />
          </Grid>
        )}
      </Grid>
    </DashboardProvider>
  );
};

export default Dashboard;
