import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { ChangeRightsRequest } from '@protos/user';

const useChangeRightsRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const changeRights = React.useCallback( async (email: string, admin: boolean) => {
    const request: ChangeRightsRequest = ChangeRightsRequest.create();
    request.email = email;
    request.admin = admin;
    await client.changeRights(request, {});
  }, []);

  return {
    changeRights,
  };

};

export default useChangeRightsRPC;