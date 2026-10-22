import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaAsterisk, FaBars, FaXmark, FaRegCalendar } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [location.key]);

  return (
    <header className="sticky top-0 z-50 bg-page/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 border-b border-navy/10 px-6 py-4 sm:px-14">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <FaAsterisk className="text-2xl text-blue" /> {t.doctor.shortName}
        </Link>

        {/* Menu inside a pill; the current page is filled indigo */}
        <nav className="hidden gap-1 rounded-full bg-navy/5 p-1 text-sm font-medium lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end
              className={({ isActive }) => `relative rounded-full px-5 py-2 transition-colors ${isActive ? "text-white" : "text-gray hover:text-navy"}`}>
              {({ isActive }) => (
                <>
                  {/* The indigo pill slides to the current page */}
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-blue shadow-lg shadow-blue/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{t.nav[link.key]}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link to="/contact" className="hidden items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/30 transition hover:bg-navy lg:flex">
            <FaRegCalendar /> {t.nav.book}
          </Link>
          <button onClick={() => setOpen(!open)} className="p-2 text-2xl lg:hidden" aria-label={t.nav.menu} aria-expanded={open}>
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu slides open and closed */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="overflow-hidden px-6 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end onClick={() => setOpen(false)}
                className={({ isActive }) => `block border-b border-navy/10 py-3.5 font-medium ${isActive ? "text-blue" : ""}`}>
                {t.nav[link.key]}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mb-6 mt-5 flex items-center justify-center gap-2 rounded-full bg-blue py-3.5 font-semibold text-white">
              <FaRegCalendar /> {t.nav.book}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
