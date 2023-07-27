import { createContext } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  token: string | null;
}

const defaultAuth: AuthContextProps = {
  isLoggedIn: false,
  user: null,
  login: function (token: string, userData: User): void {
    throw new Error('Function not implemented.');
  },
  logout: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  token: null
};

const AuthContext = createContext<AuthContextProps>(defaultAuth);

export default AuthContext;
