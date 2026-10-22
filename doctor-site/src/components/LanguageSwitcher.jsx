import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGlobe, FaCheck } from "react-icons/fa6";
import { languages, useLanguage } from "../i18n/LanguageContext";

// "🌐 EN" button in the navbar that opens a small list: English / دری / پښتو
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const current = languages.find((l) => l.code === lang);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const close = (e) => (e.key === "Escape" || !box.current?.contains(e.target)) && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <div ref={box} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t.nav.language}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-blue"
      >
        <FaGlobe className="text-base" /> {current.short}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl shadow-navy/10"
          >
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  lang={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                    l.code === lang ? "bg-lavender-light font-semibold text-blue" : "hover:bg-page"
                  }`}
                >
                  {l.label}
                  {l.code === lang && <FaCheck />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
