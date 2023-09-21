import React from "react";
import { transport } from "../../../environment";
import { HistoryClient } from "@protos/history.client";
import { HistoryRequest } from "@protos/history";
import AuthContext from "@contexts/AuthContext";

const useFetchHistoryRPC = () => {
  const client = React.useMemo(() => new HistoryClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const fetchHistory = React.useCallback(async () => {
    const request: HistoryRequest = HistoryRequest.create({});
    return await client.getHistory(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, [client, token]);

  return {
    fetchHistory,
  };
};

export default useFetchHistoryRPC;
