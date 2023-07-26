import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';  
import { useTranslation } from 'react-i18next';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [token, setToken] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken); // Ajoutez cette ligne
      setIsLoggedIn(true);
    }
  }, []);

const login = (token, userData) => {
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
      // Appeler la route de déconnexion du back-end
      const response = await axios.post('/api/user/signout');

      // Gérer la réponse
      if (response.status === 200) {
        // Supprimer les informations d'authentification stockées localement
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);

        // Ajouter cette ligne ici pour afficher un message de succès à la déconnexion
        toast.success(t('AuthContext.logout'), {
          position: toast.POSITION.BOTTOM_CENTER
        });

        // Attendez 2 secondes avant de rediriger et de recharger la page
        setTimeout(() => {
          history.push('/login');
        }, 2000);

      } else {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Erreur lors de la déconnexion:', error);
    }
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, token }}>
    {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
