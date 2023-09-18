import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { DeleteUserRequest } from '@protos/user';

const useDeleteUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const deleteUser = React.useCallback(async (userId: string): Promise<string> => {
    const request: DeleteUserRequest = DeleteUserRequest.create();
    request.userId = userId;

    const deleteUserResponse = await client.deleteUser(request, {});
    return deleteUserResponse.response.token;
  }, []);

  return {
    deleteUser,
  };
};

export default useDeleteUserRPC;
