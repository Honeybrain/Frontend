import React from "react";
import { transport } from "../../../environment";
import { UserClient } from "@protos/user.client";
import { ChangeLanguageRequest } from "@protos/user";
import AuthContext from "@contexts/AuthContext";

const useChangeLanguageRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  let { token } = React.useContext(AuthContext);

  const changeLanguage = React.useCallback(async (language: string) => {
    //console.log(token);
    if (token == null)
      token = localStorage.getItem("token");
    const request: ChangeLanguageRequest = ChangeLanguageRequest.create({ language: language });
    await client.changeLanguage(request, {
      meta: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return {
    changeLanguage,
  };
};

export default useChangeLanguageRPC;
