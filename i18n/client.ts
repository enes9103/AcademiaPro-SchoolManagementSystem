import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/locales/en/common.json";
import trCommon from "@/locales/tr/common.json";
import deCommon from "@/locales/de/common.json";

const resources = {
  en: { translation: enCommon },
  tr: { translation: trCommon },
  de: { translation: deCommon },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
