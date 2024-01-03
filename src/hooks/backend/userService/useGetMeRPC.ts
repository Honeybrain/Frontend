import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { UserDto } from "@protos/user";

const useGetMeRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);

  const getMe = React.useCallback(async (token: string): Promise<UserDto> => {
    const getMeResponse = await client.getMe(
      {},
      { meta: { Authorization: `Bearer ${token}` } },
    );
    return getMeResponse.response;
  }, []);

  return { getMe };
};

export default useGetMeRPC;
