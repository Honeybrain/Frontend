import React, { useState } from 'react';
import '../../styles.css';
import { Grid, TextField, Box, Button, Paper, Typography } from '@mui/material';
import HelpModal from '../../TutorielPopUp/HelpModal';
import { useTranslation } from 'react-i18next';

function getRandomDummyPcIPAddresses(subnet, numServices) {
    const subnetParts = subnet.split('/');
    const baseIP = subnetParts[0];
    const subnetMask = parseInt(subnetParts[1]);
    const maxNumServices = Math.pow(2, 32 - subnetMask) - 2;
    const ipAddresses = [];

    if (numServices > maxNumServices)
        numServices = maxNumServices;
    for (let i = 0; i < numServices; i++) {
        const randomIP = generateRandomIP(baseIP, subnetMask);
        ipAddresses.push(randomIP);
    }
    return ipAddresses;
};

function generateRandomIP(baseIP, subnetMask) {
    const baseIPParts = baseIP.split('.');
    const hostRange = Math.pow(2, 32 - subnetMask) - 2;
    const randomIPParts = [];

    for (let i = 0; i < 4; i++) {
        if (i < 3)
            randomIPParts.push(baseIPParts[i]);
        else {
            const randomHost = Math.floor(Math.random() * hostRange) + 1;
            randomIPParts.push(randomHost);
        }
    }
    return randomIPParts.join('.');
};

const Others = () => {
    const { t } = useTranslation();
    const [dummyPcNumServices, setDummyPcNumServices] = useState(2);
    const [ftpIPAddress, setFtpIPAddress] = useState('192.168.1.10');
    const [ftpPort, setFtpPort] = useState('21');
    const [netinterface, setNetinterface] = useState('eth0');
    const [subnet, setSubnet] = useState('192.168.1.0/24');
    const [dockerPath, setDockerPath] = useState('/home/shop/Dockerfile');
    const [dummyPcIPAddresses, setDummyPcIPAddresses] = useState(getRandomDummyPcIPAddresses(subnet, 2));

    const handleDummyPcNumServicesChange = (event) => {
        const numServices = parseInt(event.target.value) > 5 ? 5 : parseInt(event.target.value) < 0 ? 0 : parseInt(event.target.value);
        setDummyPcNumServices(numServices);

        if (numServices === 0) {
            setDummyPcIPAddresses([]);
        } else {
            const randomIPAddresses = getRandomDummyPcIPAddresses(subnet, numServices);
            setDummyPcIPAddresses(randomIPAddresses);
        }
    };

    const handleDummyPcIPAddressChange = (index, event) => {
        const updatedIPAddresses = [...dummyPcIPAddresses];
        updatedIPAddresses[index] = event.target.value;
        setDummyPcIPAddresses(updatedIPAddresses);
    };

    const handleDownload = () => {
        const configData = {
            dummy_pc: {
                num_services: dummyPcNumServices,
                ip_addresses: dummyPcIPAddresses,
            },
            ftp: {
                ip_address: ftpIPAddress,
                port: ftpPort,
            },
            interface: netinterface,
            subnet: subnet,
            docker: dockerPath,
        };

        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(configData, null, 4));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'honeybrain_config.json');
        document.body.appendChild(downloadAnchorNode); // required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <Paper sx={{ p: 2, width: '50em' }}>
                <Grid container justifyContent="space-between" alignItems="center" >
                    <Grid item>
                    <Typography variant="h5">{t('configGenerator.title')}</Typography>
                    </Grid>
                    <Grid item>
                        <HelpModal helpText={t('configGenerator.helpText')} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mb={3} direction="row">
                    {/* General Configuration */}
                    <Grid item xs={6}>
                    <Typography variant="h6" mb={2}>{t('configGenerator.generalConfiguration')}</Typography>
                        <Grid container spacing={2} direction="column" alignItems="stretch">
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.networkInterfaceLabel')}
                                    value={netinterface}
                                    onChange={(e) => setNetinterface(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.subnetLabel')}
                                    value={subnet}
                                    onChange={(e) => setSubnet(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.dockerfilePathLabel')}
                                    value={dockerPath}
                                    onChange={(e) => setDockerPath(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Services Configuration */}
                    <Grid item xs={6}>
                    <Typography variant="h6" mb={2}>{t('configGenerator.services')}</Typography>
                        <Grid container spacing={2} direction="column" alignItems="stretch">
                            <Grid item>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    label={t('configGenerator.numberOfDummyPCLabel')}
                                    value={dummyPcNumServices}
                                    onChange={handleDummyPcNumServicesChange}
                                    fullWidth
                                />
                            </Grid>
                            {dummyPcIPAddresses.map((ipAddress, index) => (
                                <Grid item key={index}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        label={t('configGenerator.ipAddressForDummyPCLabel') + ' ' + (index + 1)}
                                        value={ipAddress}
                                        onChange={(event) => handleDummyPcIPAddressChange(index, event)}
                                        fullWidth
                                    />
                                </Grid>
                            ))}
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    label={t('configGenerator.ipAddressForFTPLabel')}
                                    value={ftpIPAddress}
                                    onChange={(e) => setFtpIPAddress(e.target.value)}
                                    fullWidth
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
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handleDownload}>{t('configGenerator.downloadConfiguration')}</Button>
                </Grid>
            </Paper>
        </Box>
    );
}

export default Others;
