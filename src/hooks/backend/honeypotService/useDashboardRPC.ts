import React from "react";
import { transport } from "../../../environment";
import { DashboardClient } from '@protos/dashboard.client';
import { DashboardRequest, DashboardReply, Container } from '@protos/dashboard';

const useDashboardRPC = () => {
  const client = React.useMemo(() => new DashboardClient(transport), []);
  const [containers, setContainers] = React.useState<Container[]>();
  const [logs, setLogs] = React.useState<string | undefined>('');
  const [blacklist, setBlacklist] = React.useState<string[] | undefined>();
  const controller = new AbortController();

  const streamDashboardInformation = React.useCallback(async () => {
    const request: DashboardRequest = DashboardRequest.create();

    const stream = client.streamDashboardInformation(request, { abort: controller.signal });
    stream.responses.onNext((message) => {
      setContainers(message?.containers);
      setLogs(message?.logs);
      setBlacklist(message?.ips);
    });
  }, []);

  React.useEffect(() => {
    streamDashboardInformation();

    return () => {
      controller.abort();
    }
  }, []);

  return {
    containers,
    logs,
    blacklist,
  };
};

export default useDashboardRPC;
