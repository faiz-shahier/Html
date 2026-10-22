import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaAsterisk, FaBars, FaXmark } from "react-icons/fa6";
import { links } from "../data";
import Button from "./Button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-page/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-navy/10 px-6 py-4 sm:px-14">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <FaAsterisk className="text-2xl text-blue" /> Dr. Zadran
        </Link>

        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={({ isActive }) => (isActive ? "text-blue" : "hover:text-blue")}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/contact" light>Let's talk</Button>
        </div>

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
          <div onClick={() => setOpen(false)} className="mt-5">
            <Button to="/contact">Book a consultation</Button>
          </div>
        </nav>
      )}
    </header>
  );
}
