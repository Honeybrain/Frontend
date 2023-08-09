import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { EmailRequest } from '@protos/user';

const useChangeMailRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const changeMail = React.useCallback(async (email: string) => {
    const request: EmailRequest = EmailRequest.create();
    request.email = email;
    await client.changeEmail(request, {});
  }, []);

  return {
    changeMail,
  };
};

export default useChangeMailRPC;
