import React from 'react';
import { Typography, TextField, Button, Paper, Grid, Snackbar, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import HelpModal from "@components/HelpModal";
import useBlackListRPC from '@hooks/backend/honeypotService/useBlackListRPC';
import { useTranslation } from 'react-i18next';
import { AppGalleryButton, AppStoreButton, ButtonsContainer, GooglePlayButton } from 'react-mobile-app-button';
import useMobileRPC from '@hooks/backend/mobileService/useMobileRPC';
import { NightModeContext } from '@contexts/NightModeContext';
import { useContext } from "react";

const MobileLink = () => {
  const { t } = useTranslation();
  const { isNightMode } = useContext(NightModeContext);
  const { getWireguardConfig } = useMobileRPC();
  const [qrCode, setQrCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const paperStyle = isNightMode ? { backgroundColor: '#262626', color: 'white' } : {};

  React.useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const base64Image = await getWireguardConfig();
        setQrCode(base64Image);
      } catch (error) {
        console.error('Failed to fetch QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQrCode();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="h4">{t('mobileLink.mobileLink')}</Typography>
          </Grid>
          <Grid item>
            <HelpModal helpText={t('mobileLink.blockManagerHelpText')}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Paper sx={{ ...paperStyle, p: 2, width: '50em' }}>
            <Grid container justifyContent="space-between" alignItems="center" marginBottom="15px">
              <Grid item>
                <Typography variant="h5">{t('mobileLink.accessDistance')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={3} direction="row">
              <Grid item xs={6}>
                <Typography variant="h6" mb={2}>{t('mobileLink.installWireguardStep')}</Typography>
                <Typography variant="body2">{t('mobileLink.installWireguardDescription')}</Typography>
                <Box display="flex" justifyContent="flex-start" mt={2}>
                    <ButtonsContainer>
                      <GooglePlayButton
                        url='https://play.google.com/store/apps/details?id=com.wireguard.android'
                        theme={"light"}
                        className={"custom-style"}
                      />
                      <AppStoreButton
                        url='https://apps.apple.com/fr/app/wireguard/id1441195209'
                        theme={"light"}
                        className={"custom-style"}
                      />
                    </ButtonsContainer>
                  </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" mb={2}>{t('mobileLink.scanQRCodeStep')}</Typography>
                <Typography variant="body2">{t('mobileLink.scanQRCodeDescription')}</Typography>
                {isLoading ? (
                  <Typography>{t('mobileLink.loadingQRCode')}</Typography>
                ) : (
                  qrCode ? <img src={`data:image/png;base64,${qrCode}`} alt={t('mobileLink.qrCodeAltText')} style={{ maxWidth: '100%', height: 'auto' }} /> : <Typography>{t('mobileLink.qrCodeUnavailable')}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h6" mb={2}>{t('mobileLink.downloadAppStep')}</Typography>
                <Typography variant="body2">
                  {t('mobileLink.downloadAppDescription')}
                  <Button
                    href="https://github.com/Honeybrain/Mobile/releases"
                    target="_blank"  // Opens link in a new tab
                    rel="noopener noreferrer"  // Security for opening links in new tabs
                  >
                    Honeybrain Mobile
                  </Button>
                </Typography>
              </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MobileLink;
