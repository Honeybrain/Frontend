import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { InviteUserRequest } from '@protos/user';

const useInviteUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const inviteUser = React.useCallback( async (email: string) => {
    const request: InviteUserRequest = InviteUserRequest.create();
    request.email = email;
    request.admin = false;
    await client.inviteUser(request, {});
  }, []);

  return {
    inviteUser,
  };

};

export default useInviteUserRPC;