import React, { useContext } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useTranslation } from 'react-i18next';
import { NightModeContext } from '@contexts/NightModeContext';

const HelpModal = ({ helpText }) => {
  const { isNightMode } = useContext(NightModeContext);
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const paperStyle = {
    backgroundColor: isNightMode ? '#262626' : 'background.paper',
    color: isNightMode ? 'white' : 'text.primary',
    boxShadow: 5,
    padding: 2,
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
  };

  const buttonStyle = {
    backgroundColor: isNightMode ? '#333' : 'primary.main',
    color: isNightMode ? 'white' : 'primary.contrastText',
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <HelpIcon color={isNightMode ? 'inherit' : 'action'} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={paperStyle}>
          <Typography variant="h5" id="modal-modal-title">
            {t('helpModal.help')}
          </Typography>
          <Typography variant="body2" id="modal-modal-description" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {helpText}
          </Typography>
          <Button variant="contained" onClick={handleClose} sx={buttonStyle}>
            {t('helpModal.close')}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default HelpModal;
