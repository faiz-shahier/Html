import { Link } from "react-router-dom";
import { FaAsterisk, FaFacebookF, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { contact, links } from "../data";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const social = [
    { icon: FaPhone, href: `tel:${contact.phone}`, label: t.footer.call },
    { icon: FaWhatsapp, href: `https://wa.me/${contact.whatsapp}`, label: t.footer.whatsapp },
    { icon: FaFacebookF, href: contact.facebook, label: t.footer.facebook },
  ].filter((s) => s.href); // hide a link that has no address yet

  return (
    <footer className="mx-auto mt-6 max-w-6xl rounded-t-[2rem] bg-navy px-6 pb-8 pt-14 text-sm text-white/60 sm:px-14">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white"><FaAsterisk className="text-blue" /> {t.doctor.name}</p>
          <p className="mt-3">{t.doctor.title} · {t.doctor.specialty}<br />{t.doctor.hospital} · {t.doctor.city}</p>
        </div>
        <div className="flex flex-col gap-2">
          {links.map((link) => <Link key={link.to} to={link.to} className="hover:text-white">{t.nav[link.key]}</Link>)}
        </div>
        <div className="flex gap-3 md:justify-end">
          {social.map((s) => (
            <a key={s.href} href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-blue">
              <s.icon />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs">
        {t.footer.disclaimer} © {new Date().getFullYear()} {t.doctor.name}
      </p>
    </footer>
  );
}
