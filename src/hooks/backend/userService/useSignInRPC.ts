import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { SignInSignUpRequest, UserResponse } from '@protos/user';

const useSignInRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const signIn = React.useCallback(async (email: string, password: string): Promise<UserResponse> => {
    const request: SignInSignUpRequest = SignInSignUpRequest.create();
    request.email = email;
    request.password = password;

    const signinResponse = await client.signIn(request, {});
    return signinResponse.response;
  }, []);

  return {
    signIn,
  };
};

export default useSignInRPC;
