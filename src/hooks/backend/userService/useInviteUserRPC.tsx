import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { InviteUserRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useInviteUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const inviteUser = React.useCallback(async (email: string) => {
    const request: InviteUserRequest = InviteUserRequest.create();
    request.email = email;
    request.roles = [];
    return client.inviteUser(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return { inviteUser };
};

export default useInviteUserRPC;
