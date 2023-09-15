import React, { useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '@contexts/AuthContext'
import useSignInRPC from '@hooks/backend/userService/useSignInRPC';
import { useTranslation } from 'react-i18next';

export const AuthProvider = ({ children }) => {
    const { signIn } = useSignInRPC();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const history = useHistory();
    const [token, setToken] = React.useState<string | null>(null);
    const { t } = useTranslation();
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    }, []);
  
    const login = React.useCallback(async (email: string, password: string) => {
      try {
        const token = await signIn(email, password);
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);
        history.push('/');
      } catch (error) {
        throw error;
      }
    }, []);
  
    const logout = React.useCallback(async () => {
      try {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);

        toast.success(t('AuthContext.logout'), {
          position: toast.POSITION.BOTTOM_CENTER
        });

        setTimeout(() => {
          history.push('/login');
        }, 2000);
      }
      catch (error) {
        throw error;
      }
    }, []);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
