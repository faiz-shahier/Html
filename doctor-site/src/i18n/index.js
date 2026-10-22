import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en";
import fa from "./fa";
import ps from "./ps";

// Languages in the switcher. To add one: make a file like en.js and add it here + in resources.
export const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "fa", label: "دری", short: "دری" },
  { code: "ps", label: "پښتو", short: "پښتو" },
];

// Set <html lang="…" dir="…"> — i18next knows Dari (fa) and Pashto (ps) are right-to-left
const setDirection = (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
};

i18n
  .use(LanguageDetector) // remembered choice → browser language → English
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, fa: { translation: fa }, ps: { translation: ps } },
    supportedLngs: ["en", "fa", "ps"],
    fallbackLng: "en",
    load: "languageOnly", // "fa-AF" → "fa"
    interpolation: { escapeValue: false }, // React already escapes text
    returnObjects: true, // lists (bio, services ...) come back as arrays
    detection: { order: ["localStorage", "navigator"], lookupLocalStorage: "lang", caches: ["localStorage"] },
  });

setDirection(i18n.resolvedLanguage);
i18n.on("languageChanged", setDirection);

export default i18n;
