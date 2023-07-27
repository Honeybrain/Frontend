import React, { useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '@contexts/AuthContext'
import { UserClient } from '@protos/user_grpc_pb';
import { SignInSignUpRequest, EmailRequest, EmptyRequest } from '@protos/user_pb';

const client = new UserClient('http://localhost:50051', null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = React.useState<User | null>(null);
    const history = useHistory();
    const [token, setToken] = React.useState<string | null>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
  
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    }, []);
  
    const login = (email: string, password: string) => {
      const request = new SignInSignUpRequest();
      request.setEmail(email);
      request.setPassword(password);
  
      client.signIn(request, {}, (error, response) => {
        if (error) {
          console.error('Erreur lors de la connexion:', error);
        } else {
          const token = response.getToken();
          console.log("Logging in", token, user);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsLoggedIn(true);
  
          // Redirection to home page
          history.push('/');
        }
      });
    };
  
    const logout = () => {
      const request = new EmptyRequest();

      client.signOut(request, {}, (error, response) => {
        if (error) {
          console.error('Erreur lors de la déconnexion:', error);
        } else {
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
        }
      });
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, login, logout, token }}>
        {children}
      </AuthContext.Provider>
    );
  };
