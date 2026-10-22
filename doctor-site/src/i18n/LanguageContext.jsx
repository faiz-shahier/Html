import { createContext, useContext, useEffect, useState } from "react";
import en from "./en";
import fa from "./fa";
import ps from "./ps";

// To add a language: create a new file like en.js and add it here
export const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "fa", label: "دری", short: "دری" },
  { code: "ps", label: "پښتو", short: "پښتو" },
];
const texts = { en, fa, ps };

// Remembered choice → otherwise the browser's language → otherwise English
function startLanguage() {
  try {
    const saved = localStorage.getItem("lang");
    if (texts[saved]) return saved;
  } catch {}
  const browser = (navigator.language || "").slice(0, 2);
  return texts[browser] ? browser : "en";
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(startLanguage);
  const t = texts[lang];

  // Tell the browser the language and direction (rtl for Dari and Pashto)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang, t.dir]);

  return <LanguageContext.Provider value={{ lang, setLang, t, rtl: t.dir === "rtl" }}>{children}</LanguageContext.Provider>;
}

// Use in any component:  const { t, lang, setLang, rtl } = useLanguage();
export const useLanguage = () => useContext(LanguageContext);
