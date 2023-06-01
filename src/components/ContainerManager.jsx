import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles.css';
import { useHistory } from 'react-router-dom';

const ContainerManager = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


 
    return (
      <div className='form-container'>
        <h2>Containers</h2>
        <button type="button" >Détruire container</button>
        <button type="button" >Déployer container</button>
        {statement}
      </div>
    );
  };
  
  export default UserParams;
  