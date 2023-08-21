import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HelpIcon from '@mui/icons-material/Help';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
  },
}));

const HelpModal = ({ helpText }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <HelpIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        BackdropProps={{
          style: {
            backdropFilter: 'blur(1px)',
          },
        }}
      >
        <Box className={classes.paper}>
          <Box mb={2}>
            <Typography variant="h5" id="modal-modal-title">
              {t('helpModal.help')}
            </Typography>
            <Typography variant="body2" id="modal-modal-description" style={{ whiteSpace: 'pre-line', marginTop: 15 }}>
              {helpText}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleClose}>
              {t('helpModal.close')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default HelpModal;
