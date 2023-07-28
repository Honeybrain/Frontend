import React, { useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '@contexts/AuthContext'
import { UserClient } from '@protos/user.client';
import { SignInSignUpRequest, EmailRequest, EmptyRequest, UserResponse, EmptyResponse } from '@protos/user';
import { transport } from "../environment";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = React.useState<any | null>(null);
    const history = useHistory();
    const [token, setToken] = React.useState<string | null>(null);
    
    const client = React.useMemo(() => {
      return new UserClient(transport);
    }, []);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      console.log(storedUser);
      console.log(storedToken);
  
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    }, []);
  
    const login = React.useCallback(async (email: string, password: string) => {
      const request: SignInSignUpRequest = SignInSignUpRequest.create();
      request.email = email;
      request.password = password;

      const signinResponse = await client.signIn(request, {});
      const token = signinResponse.response.token;
      console.log("Logging in", token, user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);

      // Redirection to home page
      history.push('/');
    }, []);
  
    const logout = React.useCallback(async () => {
      const request: EmptyRequest = EmptyRequest.create();
      await client.signOut(request, {});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);

      toast.success("Vous avez été déconnecté avec succès", {
        position: toast.POSITION.BOTTOM_CENTER
      });

      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }, []);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, login, logout, token }}>
        {children}
      </AuthContext.Provider>
    );
  };
