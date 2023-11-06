import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { EmailRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useDeleteUserRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const deleteUser = React.useCallback(async (email: string) => {
    const request: EmailRequest = EmailRequest.create();
    request.email = email;

    await client.deleteUser(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return {
    deleteUser,
  };
};

export default useDeleteUserRPC;
