import React from 'react';
import { useParams } from 'react-router-dom';

const InvitationSignup = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { token } = useParams();


  checkInvitation = async () => {
    
    try {
      const response = await axios.post('/user.User/validateInvitation', {
        token,
      });
      console.log("Réponse du serveur:", response);
      if (response.data === true) {
        setEmail(response.data.email);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response.data);
    }
  }

  const signIn = async () => {
    try {
      const response = await axios.post('/api/user/signIn', {
        email,
        password,
      });
      console.log("Réponse du serveur:", response);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response.data);
    }
  }

  return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 110px)'}}>
    <Paper sx={{ p: 2, width: '25em' }}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }} onSubmit={handleSubmit}>
        <Typography variant="h6">Choisissez votre nouveau mot de passe</Typography>
        {submitted && (<Typography>Votre compte a été correctement créé</Typography>)
        }
        {!submitted && (
        <>
          <TextField
            type="password"
            name='password'
            label="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit"
            onClick={() => signIn(email, password)} 
            variant="contained" color="primary">
            Créer un compte
          </Button>
        </>
      )}
      </Box>
    </Paper>
  </Box>
  );
}

export default InvitationSignup;
