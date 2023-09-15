import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { PasswordRequest } from '@protos/user';
import AuthContext from "@contexts/AuthContext";

const useResetPasswordRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const resetPassword = React.useCallback(async (password: string) => {
    const request: PasswordRequest = PasswordRequest.create();
    if (token) {
      request.token = token;
    }
    request.password = password;
    await client.resetPassword(request, {});
  }, []);

  return {
    resetPassword,
  };
};

export default useResetPasswordRPC;
