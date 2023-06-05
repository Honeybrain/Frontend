import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HelpIcon from '@mui/icons-material/Help';

const useStyles = makeStyles((theme) => ({
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <HelpIcon />
      </IconButton>
      <Modal
        open={open}

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
          <Typography variant="h6" id="modal-modal-title">
            Aide
          </Typography>
          <Typography variant="body2" id="modal-modal-description" style={{ whiteSpace: 'pre-line' }}>
            {helpText}
          </Typography>
          <Button variant="contained" color="primary" style={{top:14}} onClick={handleClose}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default HelpModal;
