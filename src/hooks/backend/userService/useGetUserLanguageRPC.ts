import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { EmptyRequest, UserRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useGetUserlanguageRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  let { token } = React.useContext(AuthContext);

  const getUserLanguage = React.useCallback(async () => {
    if (token == null)
      token = localStorage.getItem("token");
    const request: UserRequest = UserRequest.create();
    const lan = (await client.getUserLanguage(request, {
      meta: { Authorization: `Bearer ${token}` },
    }).response).lan
    return (lan);
    }, []);

  return {
    getUserLanguage,
  };
};

export default useGetUserlanguageRPC;