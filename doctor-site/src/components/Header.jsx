import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { links } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const linkStyle = ({ isActive }) => (isActive ? "text-teal" : "hover:text-teal");

  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-white">KZ</span>
          <span>
            <b className="block font-display font-normal">Dr. Khalid Khan Zadran</b>
            <small className="text-gray">Neurosurgeon · Kabul</small>
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkStyle} end>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn hidden py-2.5 md:inline-flex">Book consultation</Link>

        <button onClick={() => setOpen(!open)} className="p-2 text-2xl md:hidden" aria-label="Menu">
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-navy/5 px-4 pb-6 md:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => `block border-b border-navy/5 py-3.5 font-medium ${isActive ? "text-teal" : ""}`} end>
              {link.name}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn mt-5 w-full">Book consultation</Link>
        </nav>
      )}
    </header>
  );
}
