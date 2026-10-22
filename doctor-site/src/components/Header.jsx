import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaAsterisk, FaBars, FaXmark, FaRegCalendar } from "react-icons/fa6";
import { links } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [location.key]);

  return (
    <header className="sticky top-0 z-50 bg-page/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-navy/10 px-6 py-4 sm:px-14">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <FaAsterisk className="text-2xl text-blue" /> Dr. Zadran
        </Link>

        {/* Menu inside a pill; the current page is filled indigo */}
        <nav className="hidden gap-1 rounded-full bg-navy/5 p-1 text-sm font-medium md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end
              className={({ isActive }) => `rounded-full px-5 py-2 transition ${isActive ? "bg-blue text-white shadow-lg shadow-blue/30" : "text-gray hover:text-navy"}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="hidden items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/30 transition hover:bg-navy md:flex">
          <FaRegCalendar /> Book appointment
        </Link>

        <button onClick={() => setOpen(!open)} className="p-2 text-2xl md:hidden" aria-label="Menu">
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {open && (
        <nav className="px-6 pb-6 md:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end onClick={() => setOpen(false)}
              className={({ isActive }) => `block border-b border-navy/10 py-3.5 font-medium ${isActive ? "text-blue" : ""}`}>
              {link.name}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-blue py-3.5 font-semibold text-white">
            <FaRegCalendar /> Book appointment
          </Link>
        </nav>
      )}
    </header>
  );
}
