import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { EmptyRequest } from '@protos/user';

const useSignOutRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const signOut = React.useCallback(async () => {
    const request: EmptyRequest = EmptyRequest.create();
    await client.signOut(request);
  }, []);

  return {
    signOut,
  };
};

export default useSignOutRPC;
