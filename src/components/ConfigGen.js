import React, { useState } from 'react';
import '../styles.css';

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

const ConfigGenerator = () => {
  const [dummyPcNumServices, setDummyPcNumServices] = useState(2);
  const [ftpIPAddress, setFtpIPAddress] = useState('192.168.1.10');
  const [ftpPort, setFtpPort] = useState('21');
  const [subnet, setSubnet] = useState('192.168.1.0/24');
  const [dummyPcIPAddresses, setDummyPcIPAddresses] = useState(getRandomDummyPcIPAddresses(subnet, 2));

  const handleDummyPcNumServicesChange = (event) => {
    const numServices = parseInt(event.target.value) > 5 ? 5 : parseInt(event.target.value);
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
      subnet: subnet,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(configData, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'config.json');
    document.body.appendChild(downloadAnchorNode); // required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="form-container">
      <label className='input-group'>
        Number of dummy PC:
        <input
          type="number"
          min={0}
          max={5}
          value={dummyPcNumServices}
          onChange={handleDummyPcNumServicesChange}
        />
      </label>
      {dummyPcNumServices > 0 && (
        <>
          <br /><br />
          <label className='input-group'>
            IP Addresses for dummy PC:
            {dummyPcIPAddresses.map((ipAddress, index) => (
              <input
                key={index}
                type="text"
                value={ipAddress}
                onChange={(event) => handleDummyPcIPAddressChange(index, event)}
              />
            ))}
          </label>
        </>
      )}
      <br /><br />
      <label className='input-group'>
        IP Address for FTP:
        <input
          type="text"
          value={ftpIPAddress}
          onChange={(e) => setFtpIPAddress(e.target.value)}
        />
      </label>
      <br /><br />
      <label className='input-group'>
        Port for FTP:
        <input
          type="text"
          value={ftpPort}
          onChange={(e) => setFtpPort(e.target.value)}
        />
      </label>
      <br /><br />
      <label className='input-group'>
        Subnet:
        <input
          type="text"
          value={subnet}
          onChange={(e) => setSubnet(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleDownload}>Download Configuration</button>
    </div>
  );
};

export default ConfigGenerator;