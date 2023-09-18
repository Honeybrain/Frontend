import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { EmptyRequest } from '@protos/user';

const useGetUsersRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const getUsers = React.useCallback( async () => {
    const request: EmptyRequest = EmptyRequest.create();
    return (await client.getUsers(request, {}).response).users;
  }, []);

  return {
    getUsers,
  };

};

export default useGetUsersRPC;
