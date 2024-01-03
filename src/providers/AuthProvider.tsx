import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "@contexts/AuthContext";
import useSignInRPC from "@hooks/backend/userService/useSignInRPC";
import { useTranslation } from "react-i18next";
import { ActivateUserResponse, UserDto } from "@protos/user";
import useGetMeRPC from "@hooks/backend/userService/useGetMeRPC";

export const AuthProvider = ({ children }) => {
  const { signIn } = useSignInRPC();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { getMe } = useGetMeRPC();
  const history = useHistory();
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserDto | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      getMe(storedToken).then(setUser);
    }
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    try {
      const userResponse = await signIn(email, password);
      localStorage.setItem("token", userResponse.token);
      setToken(userResponse.token);
      setUser(userResponse.user!);
      setIsLoggedIn(true);
      history.push("/");
    } catch (error) {
      // if (error instanceof RpcError) {
      //   if (error.code === "UNAUTHENTICATED")
      //     toast.error("Mauvais email ou mots de passe.", {
      //       position: toast.POSITION.BOTTOM_CENTER,
      //     });
      // }
      throw error;
    }
  }, []);

  const loginWithToken = React.useCallback(
    async (activateUserResponse: ActivateUserResponse) => {
      try {
        localStorage.setItem("token", activateUserResponse.token);
        setToken(activateUserResponse.token);
        setUser(activateUserResponse.user!);
        setIsLoggedIn(true);
        history.push("/");
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const logout = React.useCallback(async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);

      toast.success(t("AuthContext.logout"), {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, login, loginWithToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
