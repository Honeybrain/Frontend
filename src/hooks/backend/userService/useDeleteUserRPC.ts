import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { DeleteUserRequest } from '@protos/user';

const useDeleteUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const deleteUser = React.useCallback(async (email: string) => {
    const request: DeleteUserRequest = DeleteUserRequest.create();
    request.email = email;

    await client.deleteUser(request, {});
  }, []);

  return {
    deleteUser,
  };
};

export default useDeleteUserRPC;
