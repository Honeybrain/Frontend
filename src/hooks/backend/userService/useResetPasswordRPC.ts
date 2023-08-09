import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { EmailRequest } from '@protos/user';

const useResetPasswordRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const resetPassword = React.useCallback(async (email: string) => {
    const request: EmailRequest = EmailRequest.create();
    request.email = email;
    await client.resetPassword(request, {});
  }, []);

  return {
    resetPassword,
  };
};

export default useResetPasswordRPC;
