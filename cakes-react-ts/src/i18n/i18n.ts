import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // English translations go here
        catalog: 'Catalog',
        about: 'About',
        contact: 'Contact',
        profile: 'Profile',
        exit: 'Exit',
        eng:"ENG",
        name:"Your name",
        phone: "Your phone number",
        buy: "Payment"
      },
    },
    ru: {
      translation: {
        // Russian translations go here
        catalog: 'Каталог',
        about: 'О нас',
        contact: 'Контакты',
        profile: 'Профиль',
        exit: 'Выход',
        eng:"RU",
        name:"Ваше имя",
        phone: "Ваш номер телефона",
        buy: "Оплата"

      },
    },
    kz: {
      translation: {
        // Kazakh translations go here
        catalog: 'Каталог',
        about: 'Біз туралы',
        contact: 'Байланыс',
        profile: 'Профиль',
        exit: 'Шығу',
        eng: "KZ",
        name:"Аты-жөні",
        phone: "Сіздің номерініз",
        buy: "Төлем"

      },
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language in case translation is missing for the current language
  interpolation: {
    escapeValue: false, // React already escapes the values, so no need for extra escaping
  },
});

export default i18n;
