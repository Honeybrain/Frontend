import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { SignInSignUpRequest } from '@protos/user';

const useSignInRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const signIn = React.useCallback(async (email: string, password: string): Promise<string> => {
    const request: SignInSignUpRequest = SignInSignUpRequest.create();
    request.email = email;
    request.password = password;

    const signinResponse = await client.signIn(request, {});
    return signinResponse.response.token;
  }, []);

  return {
    signIn,
  };
};

export default useSignInRPC;
