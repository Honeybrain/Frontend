import React, { ChangeEvent, useState } from 'react';
import '../../styles.css';
import { Grid, TextField, Box, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import HelpModal from '@components/HelpModal';
import { useTranslation } from 'react-i18next';
import { NightModeContext } from '@contexts/NightModeContext';
import { useContext } from "react";
import useReconfigRPC from '@hooks/backend/honeypotService/useReconfigRPC';

const getRandomDummyPcIPAddresses = (subnet: string, numServices: number) => {
    const subnetParts = subnet.split('/');
    const baseIP = subnetParts[0];
    const subnetMask = parseInt(subnetParts[1]);
    const maxNumServices = Math.pow(2, 32 - subnetMask) - 2;
    const ipAddresses: string[] = [];

    if (numServices > maxNumServices)
        numServices = maxNumServices;
    for (let i = 0; i < numServices; i++) {
        const randomIP = generateRandomIP(baseIP, subnetMask);
        ipAddresses.push(randomIP);
    }
    return ipAddresses.join(", ");
};

const generateRandomIP = (baseIP: string, subnetMask: number) => {
    const baseIPParts = baseIP.split('.');
    const hostRange = Math.pow(2, 32 - subnetMask) - 2;
    const randomIPParts: string[] = [];

    for (let i = 0; i < 4; i++) {
        if (i < 3)
            randomIPParts.push(baseIPParts[i]);
        else {
            const randomHost = Math.floor(Math.random() * hostRange) + 1;
            randomIPParts.push(randomHost.toString());
        }
    }
    return randomIPParts.join('.');
};

const getTextFieldStyles = (isNightMode) => ({
    '& label': { color: isNightMode ? 'white' : 'inherit' },
    '& input': { color: isNightMode ? 'white' : 'inherit' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: isNightMode ? 'white' : 'inherit' },
      '&:hover fieldset': { borderColor: isNightMode ? 'white' : 'inherit' },
      '&.Mui-focused fieldset': { borderColor: isNightMode ? 'white' : 'inherit' }
    }
  });
  

const Others = () => {
    const { reconfigure } = useReconfigRPC();
    const [dummyPcNumServices, setDummyPcNumServices] = useState<number>(2);
    const [ftpPort, setFtpPort] = useState<string>('21');
    const [netinterface, setNetinterface] = useState<string>('eth0');
    const [subnet, setSubnet] = useState<string>('192.168.1.0/24');
    const [ftpIPAddress, setFtpIPAddress] = useState<string>(generateRandomIP(subnet.split('/')[0], parseInt(subnet.split('/')[1])));
    const [dockerPath, setDockerPath] = useState<string>('/home/shop/Dockerfile');
    const [dummyPcIPAddresses, setDummyPcIPAddresses] = useState<string>(getRandomDummyPcIPAddresses(subnet, dummyPcNumServices));
    const { t } = useTranslation();
    const { isNightMode } = useContext(NightModeContext);
    const paperStyle = isNightMode ? { backgroundColor: '#262626', color: 'white' } : {};
    const [open, setOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState("");
    const [isReconfiguring, setIsReconfiguring] = useState(false);

    const handleReconfig = async (e) => {
        setIsReconfiguring(true);
        const numServices = dummyPcIPAddresses ? dummyPcIPAddresses.split(',').filter(Boolean).length : 0;
        const configData = {
            dummy_pc: {
                num_services: numServices,
                ip_addresses: dummyPcIPAddresses.split(',').map(ip => ip.trim()),
            },
            ftp: {
                ip_address: ftpIPAddress,
                port: ftpPort,
            },
            interface: netinterface,
            subnet: subnet,
            dockerfile: dockerPath,
        };
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(configData, null, 4));
        /*const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'honeybrain_config.json');
        document.body.appendChild(downloadAnchorNode); // required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();*/
        e.preventDefault();
        try {
            console.log(configData)
            await reconfigure(JSON.stringify(configData, null, 4));
            setAlertText(t("configGenerator.configurationApplied"));
            setOpen(true);
        } catch (error) {
            console.error("error is : " + error);
        }
        setIsReconfiguring(false);
    };

    const handleClose = React.useCallback(() => {
        setOpen(false);
      }, []);

    React.useEffect(() => {
        if (isReconfiguring) {
            document.body.style.cursor = 'wait';
        } else {
            document.body.style.cursor = 'default';
        }
    }, [isReconfiguring]);

    return (
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <Paper sx={{ ...paperStyle, p: 2, width: '50em' }}>
                <Grid container justifyContent="space-between" alignItems="center" >
                    <Grid item>
                        <Typography variant="h5">{t('configGenerator.title')}</Typography>
                    </Grid>
                    <Grid item>
                        <HelpModal helpText={t('configGenerator.helpText')} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mb={3} direction="row">
                    {/* Services Configuration */}
                    <Grid item xs={12}>
                        <Typography variant="h6" mb={2}>{t('configGenerator.services')}</Typography>
                        <Grid container spacing={2} direction="column" alignItems="stretch">
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.ipAddressesForDummyPCsLabel')}
                                    value={dummyPcIPAddresses}
                                    onChange={(e) => setDummyPcIPAddresses(e.target.value)}
                                    fullWidth
                                    sx={getTextFieldStyles(isNightMode)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.ipAddressForFTPLabel')}
                                    value={ftpIPAddress}
                                    onChange={(e) => setFtpIPAddress(e.target.value)}
                                    fullWidth
                                    sx={getTextFieldStyles(isNightMode)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.portForFTPLabel')}
                                    value={ftpPort}
                                    onChange={(e) => setFtpPort(e.target.value)}
                                    fullWidth
                                    sx={getTextFieldStyles(isNightMode)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleReconfig}>
                            {t('configGenerator.downloadConfiguration')}
                        </Button>
                    </Box>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                    >
                  {alertText}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default Others;
