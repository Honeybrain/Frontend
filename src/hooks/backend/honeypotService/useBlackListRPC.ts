import React from "react";
import { transport } from "../../../environment";
import { BlacklistClient } from '@protos/blacklist.client';
import { GetBlackListRequest } from '@protos/blacklist';

const useBlackListRPC = () => {
  const client = React.useMemo(() => new BlacklistClient(transport), []);
  const [blacklist, setBlacklist] = React.useState<string[] | undefined>();

  const getBlackList = React.useCallback(async () => {
    const request: GetBlackListRequest = GetBlackListRequest.create();

    const stream = client.getBlackList(request);
    stream.responses.onNext((message) => {
      setBlacklist(message?.ip);
    });
  }, []);

  React.useEffect(() => {
    getBlackList();
  }, []);

  return {
    blacklist,
  };
};

export default useBlackListRPC;
