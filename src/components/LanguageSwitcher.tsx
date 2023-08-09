import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { Box }  from '@mui/material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageSwitch = (event: any, newLang: string) => {
    if (newLang !== null) {
      i18n.changeLanguage(newLang);
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
      <ToggleButtonGroup
        color="info"
        value={i18n.language}
        exclusive
        onChange={handleLanguageSwitch}
      >
        <ToggleButton value="fr" style={{ backgroundColor: i18n.language === 'fr' ? 'grey' : 'transparent' }}>
          🇫🇷
        </ToggleButton>
        <ToggleButton value="en" style={{ backgroundColor: i18n.language === 'en' ? 'grey' : 'transparent' }}>
          🇬🇧
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;