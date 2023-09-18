import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { EmailRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useChangeMailRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const changeMail = React.useCallback(async (email: string) => {
    const request: EmailRequest = EmailRequest.create({ email: email });
    await client.changeEmail(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return {
    changeMail,
  };
};

export default useChangeMailRPC;
