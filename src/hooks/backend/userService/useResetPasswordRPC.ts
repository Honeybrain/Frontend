import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { PasswordRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useResetPasswordRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const resetPassword = React.useCallback(async (password: string) => {
    const request: PasswordRequest = PasswordRequest.create({
      password: password,
    });
    await client.resetPassword(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return {
    resetPassword,
  };
};

export default useResetPasswordRPC;
