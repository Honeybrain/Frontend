import { createContext } from "react";
import { ActivateUserResponse, UserDto } from "@protos/user";

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  user: UserDto | null;
  login: (email: string, password: string) => void;
  loginWithToken: (activateUserResponse: ActivateUserResponse) => void;
  logout: () => void;
}

const defaultAuth: AuthContextProps = {
  isLoggedIn: false,
  token: null,
  user: null,
  login: function (email: string, password: string): void {
    throw new Error("Function not implemented.");
  },
  loginWithToken: function (activateUserResponse: ActivateUserResponse): void {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
};

const AuthContext = createContext<AuthContextProps>(defaultAuth);

export default AuthContext;
