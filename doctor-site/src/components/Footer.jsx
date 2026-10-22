import { Link } from "react-router-dom";
import { FaFacebookF, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { doctor, links } from "../data";

export default function Footer() {
  return (
    <footer className="bg-navy text-sm text-white/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-white">{doctor.name}</p>
          <p className="mt-2">{doctor.title}<br />{doctor.hospital}, {doctor.city}</p>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-white">{link.name}</Link>
          ))}
        </div>

        <div className="flex gap-3 md:justify-end">
          <a href={`tel:${doctor.phone}`} aria-label="Call" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-teal"><FaPhone /></a>
          <a href={`https://wa.me/${doctor.whatsapp}`} aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-teal"><FaWhatsapp /></a>
          <a href={doctor.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-teal"><FaFacebookF /></a>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-6 text-center text-xs">
        This website gives general information only and is not medical advice. © {new Date().getFullYear()} {doctor.name}
      </p>
    </footer>
  );
}
