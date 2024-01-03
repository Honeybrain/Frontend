import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { ChangeRightsRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useChangeRightsRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const changeRights = React.useCallback((email: string, roles: number[]) => {
    const request: ChangeRightsRequest = ChangeRightsRequest.create();
    request.email = email;
    request.roles = roles;
    return client.changeRights(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return {
    changeRights,
  };
};

export default useChangeRightsRPC;
