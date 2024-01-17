// NightModeContext.tsx
import React, { createContext, useContext } from 'react';
import useNightMode from '../hooks/backend/userService/useNightMode'; // Assurez-vous que le chemin est correct

// Création du contexte avec une valeur par défaut
export const NightModeContext = createContext({
  isNightMode: false,
  toggleNightMode: () => {}
});

// Création du Provider
export const NightModeProvider = ({ children }) => {
  const { isNightMode, toggleNightMode } = useNightMode();

  return (
    <NightModeContext.Provider value={{ isNightMode, toggleNightMode }}>
      {children}
    </NightModeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useNightModeContext = () => useContext(NightModeContext);
