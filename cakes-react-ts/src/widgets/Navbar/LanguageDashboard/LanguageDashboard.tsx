import { useTranslation } from "react-i18next"; // Add this line
type Props = {};

const LanguageDashboard = (_props: Props) => {
  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language_dropdown">
      <span onClick={() => changeLanguage("en")}>ENG</span>
      <span onClick={() => changeLanguage("ru")}>RU</span>
      <span onClick={() => changeLanguage("kz")}>KZ</span>
    </div>
  );
};

export default LanguageDashboard;
