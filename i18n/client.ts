import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/locales/en/common.json";
import trCommon from "@/locales/tr/common.json";
import deCommon from "@/locales/de/common.json";
import enNotFound from "@/locales/en/notFound.json";
import trNotFound from "@/locales/tr/notFound.json";
import deNotFound from "@/locales/de/notFound.json";

const resources = {
  en: { translation: { ...enCommon, notFound: enNotFound } },
  tr: { translation: { ...trCommon, notFound: trNotFound } },
  de: { translation: { ...deCommon, notFound: deNotFound } },
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
