import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { validateInvitation } from '@protos/user';
import AuthContext from "@contexts/AuthContext";

const useCheckInvitationRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const checkInvitation = React.useCallback( async (id: string) => {
    const request: validateInvitation = validateInvitation.create();
    if (token) {
      request.token = token;
    }
    request.token = id;
    const validateInvitationResponse = await client.checkInvitation(request, {});
    return validateInvitationResponse.response.token;
  }, []);

  return {
    checkInvitation,
  };

};

export default useCheckInvitationRPC;