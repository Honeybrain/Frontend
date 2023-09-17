import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { InvitRequest } from '@protos/user';
import AuthContext from "@contexts/AuthContext";

const useUsersByProjectIdRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const usersByProjectId = React.useCallback( async (email: string) => {
    const request: InvitRequest = InvitRequest.create();
    if (token) {
      request.token = token;
    }
    request.email = email;
    const InvitResponse = await client.invitUser(request, {});
    return InvitResponse.response.token;
  }, []);

  return {
    usersByProjectId,
  };

};

export default useUsersByProjectIdRPC;