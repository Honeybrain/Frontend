import "../../styles.css";
import BlockIpWidget from "./widgets/BlockIpWidget";
import LogViewerWidget from "./widgets/ListConnectionsWidget";
import ContainerMonitorWidget from "./widgets/ContainerMonitorWidget";
import { Grid } from "@mui/material";
import { DashboardProvider } from "@providers/DashboardProvider";
import { HaveRoles } from "../../_utils/function/have-roles";
import { RoleEnum } from "@protos/user";
import { useContext } from "react";
import AuthContext from "@contexts/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <DashboardProvider>
      <Grid container direction="column" style={{ height: "100%" }}>
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
