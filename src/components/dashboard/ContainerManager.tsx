import React, { useState, useContext } from 'react';
import { Grid, Typography, Card, CardContent, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import AuthContext from "@contexts/AuthContext";
import HelpModal from "@components/HelpModal";
import useContainersRPC from '@hooks/backend/honeypotService/useContainersRPC';
import { useTranslation } from 'react-i18next';
import { NightModeContext } from '@contexts/NightModeContext'; // Importez le contexte du mode nuit

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value: string) => void;
}

let _status: any = null;
let _IP: any = null;

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, open, ...other } = props;

  const handleCancel = () => {
    onClose('no');
  };

  const handleOk = () => {
    onClose('yes');
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    > 
      <DialogTitle id="alert-dialog-title">Change container state ?</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          if you accept, you could damage the viability and security of the honeypot.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}

const ContainerManager: React.FC = () => {
  const { containers } = useContainersRPC();
  const { token } = useContext(AuthContext);
  const { t } = useTranslation();
  const { isNightMode } = useContext(NightModeContext); // Utilisez le contexte du mode nuit
  const cardStyle = isNightMode 
    ? { backgroundColor: '#424242', color: 'white' } 
    : {};
  const [open, setOpen] = useState(false);
  const [elementsActifs, setElementsActifs] = useState<string[]>([]);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const handleClickOpen = (elementId: string, status: string) => {
    setOpen(true);
    _IP = elementId,
    _status = status
  };

  const handleClose = (newValue: string) => {
      setOpen(false);
      if (newValue.localeCompare('yes') === 0)
        toggleElement(_IP, _status)
  };
    
  const handleMouseEnter = (elementId: string) => {
    setHoveredElement(elementId);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const toggleElement = (elementId: string, status: string) => {
    setElementsActifs(prevElementsActifs => {
      if (prevElementsActifs.includes(elementId)) {
        return prevElementsActifs.filter(id => id !== elementId);
      } else {
        return [...prevElementsActifs, elementId];
    }
    });  
  };

  const getContainerStatus = (elementId: string, status: string) => {
    if (status.startsWith('running')) {
      if (elementsActifs.find((id) => elementId === id)) {
        return <PauseCircleIcon color="warning" />;
      } else {
        return <CheckCircleIcon color="success" />;
      }
    } else {
      return <ErrorIcon color="error" />;
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h4" mb={2}>{t('containerManager.title')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('containerManager.helpText')} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Box
          sx={{
            height: '100%',
            maxHeight: 'calc(100vh - 220px)', // Set max height
            overflow: 'auto',
            '& > *': {
              marginBottom: '16px', // Add a margin to each child
            },
          }}
        >
          {containers && containers.map((container, index) => (
            <Card 
              variant="outlined" 
              key={index}
              onMouseEnter={() => handleMouseEnter(container.ip)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClickOpen(container.ip, container.status)}
              sx={{
                ...cardStyle,
                backgroundColor: hoveredElement === container.ip ? '#f0f0f0' : cardStyle.backgroundColor,
              }}
              >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="h6">{container.name}</Typography>
                  {getContainerStatus(container.ip, container.status)}
                </Box>
                <Typography variant="body2" sx={{ color: isNightMode ? 'white' : 'inherit' }}>{t('containerManager.status')}: {container.status}</Typography>
                <Typography variant="body2" sx={{ color: isNightMode ? 'white' : 'inherit' }}>{t('containerManager.ip')}: {container.ip.split('/')[0]}</Typography>
              </CardContent>
            </Card>
          ))}
          <ConfirmationDialogRaw
            id="menu-dialog"
            keepMounted
            open={open}
            onClose={handleClose}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContainerManager;
