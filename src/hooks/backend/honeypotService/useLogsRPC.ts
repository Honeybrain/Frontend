import React from "react";
import { transport } from "../../../environment";
import { LogsClient } from '@protos/logs.client';
import { LogRequest } from '@protos/logs';

const useLogsRPC = () => {
  const client = React.useMemo(() => new LogsClient(transport), []);
  const [logs, setLogs] = React.useState<string | undefined>('');
  const controller = new AbortController();

  const streamLogs = React.useCallback(async () => {
    const request: LogRequest = LogRequest.create();

    const stream = client.streamLogs(request, { abort: controller.signal });
    stream.responses.onNext((message) => {
      setLogs(message?.content);
    });
  }, []);

  React.useEffect(() => {
    streamLogs();

    return () => {
      controller.abort();
    }
  }, []);

  return {
    logs,
  };
};

export default useLogsRPC;
