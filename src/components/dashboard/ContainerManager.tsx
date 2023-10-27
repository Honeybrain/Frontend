import React, { useState, useEffect, useContext, useRef } from 'react';
import { Grid, Typography, Card, CardContent, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import AuthContext from "@contexts/AuthContext";
import HelpModal from "@components/HelpModal";
import useContainersRPC from '@hooks/backend/honeypotService/useContainersRPC';
import { useTranslation } from 'react-i18next';
import Carousel from '@components/Carousel';

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
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
  const [elementsActifs, setElementsActifs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (elementId: string, status: string) => {
    setOpen(true);
    _IP = elementId,
    _status = status
  };

  const handleClose = (newValue?: string) => {
      setOpen(false);
      if (newValue === 'yes') 
        toggleElement(_IP, _status)
  };

  const getContainerStatus = (status: string, ip: string) => {
    if (status.startsWith('running')) {
      if (elementsActifs.includes(ip)) {
        return <PauseCircleIcon color="warning" />;
      } else {
        return <CheckCircleIcon color="success" />;
      }
    } else {
      return <ErrorIcon color="error" />;
    }
  };

   const toggleElement = (elementId: string, status: string) => {
    if (status.startsWith('running')) {
      if (elementsActifs.includes(elementId)) {
        setElementsActifs(elementsActifs.filter((id) => id !== elementId));
      } else {
        setElementsActifs([...elementsActifs, elementId]);
      }
    }
  };

  return (
    <>  
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
          <>
          <Card variant="outlined" key={index}
            aria-controls="menu-dialog"
            onClick={() => handleClickOpen(container.ip, container.status)}
            style={{
            backgroundColor: elementsActifs.includes(container.ip) ? 'lightyellow' : 'lightblue',
            cursor: 'pointer',
            marginBottom: '16px',
            }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                  >
                  <Typography variant="h6">{container.name}</Typography>
                  {getContainerStatus(container.status, container.ip)}
                </Box>
                <Typography variant="body2" color="text.secondary">{t('containerManager.status')}: {container.status}</Typography>
                <Typography variant="body2" color="text.secondary">{t('containerManager.ip')}: {container.ip.split('/')[0]}</Typography>
              </CardContent>
            </Card>
          </>
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
    <Carousel/>
    </>
  );
};

export default ContainerManager;
