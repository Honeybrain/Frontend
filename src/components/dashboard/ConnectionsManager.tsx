import { Grid, Typography, Box } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';
import HelpModal from '@components/HelpModal';
import useLogsRPC from '@hooks/backend/honeypotService/useLogsRPC';
import { useTranslation } from 'react-i18next';
import { NightModeContext } from '@contexts/NightModeContext';
import { useContext } from "react";

const ListConnections = () => {
	const { logs } = useLogsRPC();
	const { t } = useTranslation();
	const { isNightMode } = useContext(NightModeContext); 
	const editorTheme = isNightMode ? "vs-dark" : "vs";

	return (
		<Box flex={1}>
			<Grid container justifyContent="space-between" alignItems="center" mb={2}>
				<Grid item>
					<Typography variant="h4" mb={2}>{t('listConnections.title')}</Typography>
				</Grid>
				<Grid item>
					<HelpModal helpText={t('listConnections.helpText')}/>
				</Grid>
			</Grid>
			<Box sx={{ height: "90%"}}>
				<MonacoEditor
						width="100%"
						height="100%"
						language="plaintext"
						theme={editorTheme}
						value={logs}
						options={{ selectOnLineNumbers: true, readOnly: true }}
				/>
			</Box>
		</Box>
	);
};

export default ListConnections;
