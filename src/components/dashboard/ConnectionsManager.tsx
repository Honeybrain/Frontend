import { Grid, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';
import HelpModal from '@components/HelpModal';
import useLogsRPC from '@hooks/backend/honeypotService/useLogsRPC';

const ListConnections = () => {
	const { logs } = useLogsRPC();

	return (
		<Box flex={1}>
			<Grid container justifyContent="space-between" alignItems="center" mb={2}>
				<Grid item>
					<Typography variant="h4" mb={2}>Connexions entrantes</Typography>
				</Grid>
				<Grid item>
						<HelpModal helpText="
				La fonctionnalité Connexions entrantes offre une vue en temps réel des logs de connexions au système de honeypot.

				Ces logs sont généralement des enregistrements d'événements produits par le système, en particulier des tentatives de connexion entrantes.

				Un honeypot est une ressource de réseau mise en place pour attirer et détecter les tentatives d'accès non autorisées."/>
				</Grid>
			</Grid>
			<Box sx={{ height: "90%"}}>
				<MonacoEditor
						width="100%"
						height="100%"
						language="plaintext"
						theme="vs"
						value={logs}
						options={{ selectOnLineNumbers: true, readOnly: true }}
				/>
			</Box>
		</Box>
	);
};

export default ListConnections;
