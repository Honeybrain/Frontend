import React from "react";
import { transport } from "../../../environment";
import { LogsClient } from '@protos/logs.client';
import { LogRequest, LogReply } from '@protos/logs';

const useLogsRPC = () => {
  const client = React.useMemo(() => new LogsClient(transport), []);
  const [logs, setLogs] = React.useState<string>('');
  const abortController = new AbortController();

  const streamLogs = React.useCallback(async () => {
    const request: LogRequest = LogRequest.create();

    const stream = client.streamLogs(request, {
      abort: abortController.signal,
    });

    stream.responses.onMessage((message: LogReply) => {
      setLogs(message.content);
    });
  }, []);

  React.useEffect(() => {
    streamLogs();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    logs,
  };
};

export default useLogsRPC;
