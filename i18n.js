import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "./polyfill";
import viTranslation from "./translations/vi.json";

// Cấu hình i18next
i18n.use(initReactI18next).init({
  lng: "vi",
  fallbackLng: "vi",
  debug: false,

  resources: {
    vi: {
      translation: viTranslation,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
