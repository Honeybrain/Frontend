import { useTranslation } from 'react-i18next';
import '../styles.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const otherLanguage = currentLanguage === 'en' ? 'fr' : 'en';

  const handleLanguageSwitch = () => {
    i18n.changeLanguage(otherLanguage);
  };

  return (
    <button className="language-switch-button" onClick={handleLanguageSwitch}>
      {currentLanguage === 'en' ? 'English' : 'Français'}
    </button>
  );
};

export default LanguageSwitcher;
