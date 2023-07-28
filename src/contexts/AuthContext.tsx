import { createContext } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  user: any | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
}

const defaultAuth: AuthContextProps = {
  isLoggedIn: false,
  user: null,
  login: function (email: string, password: string): void {
    throw new Error('Function not implemented.');
  },
  logout: function (): void {
    throw new Error('Function not implemented.');
  },
  token: null
};

const AuthContext = createContext<AuthContextProps>(defaultAuth);

export default AuthContext;
