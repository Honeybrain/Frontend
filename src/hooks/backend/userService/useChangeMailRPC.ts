import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { EmailRequest } from '@protos/user';
import AuthContext from "@contexts/AuthContext";

const useChangeMailRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const changeMail = React.useCallback(async (email: string) => {
    const request: EmailRequest = EmailRequest.create();
    if (token) {
      request.token = token;
    }
    request.email = email;
    await client.changeEmail(request, {});
  }, []);

  return {
    changeMail,
  };
};

export default useChangeMailRPC;
