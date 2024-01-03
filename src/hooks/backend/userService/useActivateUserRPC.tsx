import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { ActivateUserRequest } from "@protos/user";

const useActivateUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const activateUser = React.useCallback(
    async (token: string, password: string) => {
      const request: ActivateUserRequest = ActivateUserRequest.create();
      request.token = token;
      request.password = password;
      return client.activateUser(request, {}).response;
    },
    [],
  );

  return {
    activateUser,
  };
};

export default useActivateUserRPC;
