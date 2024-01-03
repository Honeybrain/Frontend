import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Select, SelectChangeEvent }  from '@mui/material';
import { useState } from 'react';
import { BorderAll } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import useChangeLanguageRPC from "@hooks/backend/userService/useChangeLanguageRPC";
import getUserLanguageRPC from "@hooks/backend/userService/useGetUserLanguageRPC";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { changeLanguage } = useChangeLanguageRPC();
  const { getUserLanguage } = getUserLanguageRPC();
  const [lan, setLan] = useState('');

  const fetchUserLanguage = () => {
    getUserLanguage().then((res) => {
      i18n.changeLanguage(res);
      setLan(res);
    });
  }

  if (lan == '')
    fetchUserLanguage();

  const handleLanguageSwitch = (event: any, newLang: string) => {
    if (newLang !== null) {
      i18n.changeLanguage(newLang);
    }
  }
    const handleLanguageSwitch2 = (event: SelectChangeEvent) => {
      const newLang = event.target.value;
      if (newLang !== null) {
        i18n.changeLanguage(newLang);
        setLan(newLang);
        try {
          changeLanguage(newLang);
        } catch(error) {
          console.log(error);
        }
      }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      paddingRight={2}
      marginRight={2}
      borderRight={1}
      borderColor="grey.500"
    >
      <Select
        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' } }}
        color="info"
        value={lan}
        label="language"
        onChange={handleLanguageSwitch2}
      >
        <MenuItem value={"fr"}>🇫🇷</MenuItem>
        <MenuItem value={"en"}>🇬🇧</MenuItem>
        <MenuItem value={"es"}>🇪🇸</MenuItem>
        <MenuItem value={"ch"}>🇨🇳</MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;