import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();  // Utilisez useHistory ici


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token, userData) => {
    console.log("Logging in", token, userData); 
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      // Appeler la route de déconnexion du back-end
      const response = await axios.get('http://localhost:8000/user/signout');
  
      // Gérer la réponse
      if (response.status === 200) {
        // Supprimer les informations d'authentification stockées localement
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        history.push('/login');
        window.location.reload();
      } else {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
