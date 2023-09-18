import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { ActivateUserRequest } from '@protos/user';

const useActivateUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const activateUser = React.useCallback( async (token: string, password: string) => {
    const request: ActivateUserRequest = ActivateUserRequest.create();
    request.token = token;
    request.password = password;
    const response = await client.activateUser(request, {}).response;
    return response.token;
  }, []);

  return {
    activateUser,
  };

};

export default useActivateUserRPC;