import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { ChangeRequest } from '@protos/user';
import AuthContext from "@contexts/AuthContext";

const useChangeUserRightsRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const changeUserRights = React.useCallback( async (rights: string) => {
    const request: ChangeRequest = ChangeRequest.create();
    if (token) {
      request.token = token;
    }
    request.rights = rights;
    await client.changeUserRights(request, {});
  }, []);

  return {
    changeUserRights,
  };

};

export default useChangeUserRightsRPC;
