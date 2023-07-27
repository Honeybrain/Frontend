import React, { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '@contexts/AuthContext'

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
  
    const login = (token: string, userData: User) => {
      console.log("Logging in", token, userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
  
      // Redirection to home page
      history.push('/');
    };
  
    const logout = async () => {
      try {
        const response = await axios.post('/api/user/signout');
  
        if (response.status === 200) {
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
  
        } else {
          throw new Error('Failed to log out');
        }
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, login, logout, token }}>
        {children}
      </AuthContext.Provider>
    );
  };