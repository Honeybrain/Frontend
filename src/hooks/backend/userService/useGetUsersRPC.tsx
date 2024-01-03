import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { EmptyRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useGetUsersRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const getUsers = React.useCallback(async () => {
    const request: EmptyRequest = EmptyRequest.create();
    return (
      await client.getUsers(request, {
        meta: { Authorization: `Bearer ${token}` },
      }).response
    ).users;
  }, []);

  return {
    getUsers,
  };
};

export default useGetUsersRPC;
