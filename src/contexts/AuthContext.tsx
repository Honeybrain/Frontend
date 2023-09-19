import { createContext } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  rights: boolean | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const defaultAuth: AuthContextProps = {
  isLoggedIn: false,
  token: null,
  rights: null,
  login: function (email: string, password: string): void {
    throw new Error('Function not implemented.');
  },
  logout: function (): void {
    throw new Error('Function not implemented.');
  }
};

const AuthContext = createContext<AuthContextProps>(defaultAuth);

export default AuthContext;
