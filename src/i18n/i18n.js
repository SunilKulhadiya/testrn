import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./translations/en.json";
import hi from "./translations/hi.json";
import ar from "./translations/ar.json";
import mr from "./translations/mr.json";
import gu from "./translations/gu.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import zh from "./translations/zh.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ar: { translation: ar },
  mr: { translation: mr },
  gu: { translation: gu },
  es: { translation: es },
  fr: { translation: fr },
  zh: { translation: zh }
};

// Detect device language
const locales = RNLocalize.getLocales();
const deviceLanguage = locales?.[0]?.languageCode || "en";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: deviceLanguage, // auto detect device language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;