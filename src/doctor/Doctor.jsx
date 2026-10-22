import { useState } from "react";
import { doctor, navLinks, heroBadges, facts, about, expertise, qualifications, memberships, steps, concerns } from "./data";

const icons = {
  phone: "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.2 3.6a1 1 0 0 1-.3 1L7.6 9.8a12 12 0 0 0 6.6 6.6l1.5-1.6a1 1 0 0 1 1-.3l3.6 1.2a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5z",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-13v4.5l3 2",
  brain: "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V6a2 2 0 0 0-3-2zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zm-3 9h6m-3-3v6",
  spine: "M10 3h4v3h-4zM9 8h6v3H9zM10 13h4v3h-4zM11 18h2v3h-2z",
  cpu: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4",
  check: "M5 12.5l4.5 4.5L19 7",
  arrow: "M5 12h14m-6-6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

const telLink = `tel:${doctor.phone.replace(/\s/g, "")}`;
const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy";

function SectionTitle({ eyebrow, title, light = false }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-gold" : "text-teal"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-lg text-white">KZ</span>
          <span className="leading-tight">
            <span className="block font-display text-base text-navy">Dr. Khalid Khan Zadran</span>
            <span className="block text-xs text-slate">Neurosurgeon · Kabul</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-navy lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-teal">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a href="#contact" className={`${btnPrimary} py-2.5`}>Book consultation</a>
          </div>
          <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full text-navy lg:hidden" aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-navy/5 px-4 pb-6 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-navy/5 py-3.5 font-medium text-navy">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className={`${btnPrimary} mt-5 w-full`}>Book consultation</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-teal shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal" /> {doctor.title} · {doctor.specialty}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-6xl">
            Expert brain &amp; spine surgery, <em className="text-teal">here in Kabul.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            {doctor.name} brings advanced neurosurgical care to patients at {doctor.hospital} — from brain disorders and
            complex neurotrauma to spinal interventions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={btnPrimary}>Book a consultation <Icon name="arrow" className="h-4 w-4" /></a>
            <a href={telLink} className={btnGhost}><Icon name="phone" className="h-4 w-4" /> {doctor.phone}</a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy">
            {heroBadges.map((b) => (
              <li key={b} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-teal" /> {b}</li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-teal/10" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy to-teal-dark shadow-2xl">
            {doctor.photo ? (
              <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-center text-white/80">
                <div>
                  <span className="font-display text-8xl text-white">KZ</span>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em]">Doctor's photo</p>
                </div>
              </div>
            )}
          </div>
          <div className="relative -mt-14 ml-auto mr-4 max-w-[17rem] rounded-2xl bg-white p-5 shadow-xl sm:-mr-8">
            <p className="font-display text-3xl text-teal">1st</p>
            <p className="mt-1 text-sm leading-snug text-navy">{doctor.highlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section className="border-y border-navy/5 bg-white">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div key={f.label} className={`py-8 pr-4 ${i > 0 ? "lg:border-l lg:border-navy/5 lg:pl-8" : ""}`}>
            <dt className="font-display text-3xl text-navy">{f.value}</dt>
            <dd className="mt-1 text-sm text-slate">{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
      <SectionTitle eyebrow="About the doctor" title="A pioneer of neurosurgery in Afghanistan" />
      <div className="space-y-5 text-lg leading-relaxed text-slate">
        {about.map((p) => <p key={p}>{p}</p>)}
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Areas of expertise" title="Specialist care for the brain and spine" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((e) => (
            <article key={e.title} className="group rounded-2xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-light text-teal transition group-hover:bg-teal group-hover:text-white">
                <Icon name={e.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-navy">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{e.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialList({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/50">{title}</h3>
      <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
        {items.map((q) => (
          <li key={q.short} className="flex items-center gap-5 py-4">
            <span className="w-16 shrink-0 font-display text-xl text-gold">{q.short}</span>
            <span className="text-sm text-white/80">{q.full}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Credentials() {
  return (
    <section id="credentials" className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle light eyebrow="Credentials" title="Trained and recognised internationally" />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <CredentialList title="Qualifications" items={qualifications} />
          <CredentialList title="Memberships" items={memberships} />
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionTitle eyebrow="Your visit" title="What to expect, step by step" />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative border-t-2 border-teal pt-6">
            <span className="text-sm font-bold text-teal">0{i + 1}</span>
            <h3 className="mt-2 text-lg font-bold text-navy">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", concern: concerns[0], message: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Opens WhatsApp with the request already written — nothing is stored on this site.
  const send = (e) => {
    e.preventDefault();
    const text = `Appointment request\nName: ${form.name}\nPhone: ${form.phone}\nConcern: ${form.concern}\n${form.message}`;
    window.open(`https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const field = "mt-2 w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-navy outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10";

  return (
    <section id="contact" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle eyebrow="Book a consultation" title="Take the first step toward relief" />
          <ul className="mt-10 space-y-6">
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-teal"><Icon name="pin" /></span>
              <span><b className="block text-navy">{doctor.hospital}</b><span className="text-slate">{doctor.city}</span></span>
            </li>
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-teal"><Icon name="phone" /></span>
              <span><b className="block text-navy">Phone &amp; WhatsApp</b><a href={telLink} className="text-slate hover:text-teal">{doctor.phone}</a></span>
            </li>
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-teal"><Icon name="clock" /></span>
              <span><b className="block text-navy">Clinic hours</b><span className="text-slate">Call to confirm available times</span></span>
            </li>
          </ul>
          <p className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
            <b>Emergency?</b> For a serious head or spine injury, go to the nearest emergency department straight away.
          </p>
        </div>

        <form onSubmit={send} className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">Full name
              <input required name="name" value={form.name} onChange={update} className={field} autoComplete="name" />
            </label>
            <label className="text-sm font-semibold text-navy">Phone number
              <input required name="phone" type="tel" value={form.phone} onChange={update} className={field} autoComplete="tel" />
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-navy">Reason for visit
            <select name="concern" value={form.concern} onChange={update} className={field}>
              {concerns.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="mt-5 block text-sm font-semibold text-navy">Short description <span className="font-normal text-slate">(optional)</span>
            <textarea name="message" rows={4} value={form.message} onChange={update} className={field} />
          </label>
          <button type="submit" className={`${btnPrimary} mt-7 w-full`}>Send request on WhatsApp <Icon name="arrow" className="h-4 w-4" /></button>
          <p className="mt-4 text-center text-xs text-slate">The clinic will reply to confirm your appointment time.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy py-12 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg text-white">{doctor.name}</p>
          <p className="mt-1">{doctor.title} · {doctor.hospital}, {doctor.city}</p>
        </div>
        <div className="flex gap-6">
          <a href={doctor.facebook} className="hover:text-white">Facebook</a>
          <a href={telLink} className="hover:text-white">Call</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs sm:px-6">
        This website gives general information only and is not medical advice. © {new Date().getFullYear()} {doctor.name}.
      </p>
    </footer>
  );
}

export default function Doctor() {
  return (
    <div className="bg-white font-body text-navy antialiased">
      <Header />
      <main>
        <Hero />
        <Facts />
        <About />
        <Expertise />
        <Credentials />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
