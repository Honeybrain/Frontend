import React, { useState, useEffect, useCallback, useContext } from 'react';
import AuthContext from '@contexts/AuthContext';
import { NightModeRequest } from '@protos/user';
import { UserClient } from '@protos/user.client';
import { transport } from "../../../environment";

const useNightMode = () => {
  const { user } = useContext(AuthContext);
  const [isNightMode, setIsNightMode] = useState(false);
  const client = new UserClient(transport);

  // Charge l'état initial du mode nuit depuis localStorage (ou un autre stockage)
  useEffect(() => {
    const initialMode = localStorage.getItem('nightMode') === 'true';
    setIsNightMode(initialMode);
  }, []);

  const toggleNightMode = useCallback(async () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    localStorage.setItem('nightMode', newMode.toString()); // Enregistre dans le localStorage

    try {
      const request = NightModeRequest.create({ nightMode: newMode });
      await client.nightMode(request, {
        meta: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mode nuit', error);
    }
  }, [isNightMode, client]);

  return { isNightMode, toggleNightMode };
};

export default useNightMode;
