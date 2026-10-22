import { Link } from "react-router-dom";
import { FaAsterisk, FaFacebookF, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { doctor, links } from "../data";

export default function Footer() {
  const social = [
    { icon: FaPhone, href: `tel:${doctor.phone}`, label: "Call" },
    { icon: FaWhatsapp, href: `https://wa.me/${doctor.whatsapp}`, label: "WhatsApp" },
    { icon: FaFacebookF, href: doctor.facebook, label: "Facebook" },
  ];

  return (
    <footer className="mx-auto mt-6 max-w-6xl rounded-t-[2rem] bg-navy px-6 pb-8 pt-14 text-sm text-white/60 sm:px-14">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white"><FaAsterisk className="text-blue" /> {doctor.name}</p>
          <p className="mt-3">{doctor.title} · {doctor.specialty}<br />{doctor.hospital}, {doctor.city}</p>
        </div>
        <div className="flex flex-col gap-2">
          {links.map((link) => <Link key={link.to} to={link.to} className="hover:text-white">{link.name}</Link>)}
        </div>
        <div className="flex gap-3 md:justify-end">
          {social.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-blue">
              <s.icon />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs">
        General information only, not medical advice. © {new Date().getFullYear()} {doctor.name}
      </p>
    </footer>
  );
}
