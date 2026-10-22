import { useState } from "react";
import { contact, photos } from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";
import { motion } from "framer-motion";
import { Reveal, ease } from "../components/Motion";

const line = "mt-1 w-full border-b border-navy/15 bg-transparent py-2.5 outline-none focus:border-blue";

export default function Booking() {
  const { t, rtl } = useLanguage();
  const b = t.booking;
  // reason is saved as a number, so it stays correct when the language changes
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", reason: 0, notes: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Opens WhatsApp with the request already written
  const send = (e) => {
    e.preventDefault();
    const m = b.message;
    const text = `${m.title}\n${m.name}: ${form.name}\n${m.phone}: ${form.phone}\n${m.date}: ${form.date} ${form.time}\n${m.reason}: ${b.reasons[form.reason]}\n${form.notes}`;
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="panel grid gap-14 bg-white bg-gradient-to-br from-white from-60% to-lavender shadow-sm lg:grid-cols-2">
      <motion.form
        onSubmit={send}
        initial={{ opacity: 0, x: rtl ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.7, ease }}
      >
        <Tag>{b.tag}</Tag>
        <h2 className="heading mt-6">{b.title}</h2>

        <div className="mt-10 grid gap-x-8 gap-y-6 text-sm text-gray sm:grid-cols-2">
          <label>{b.name} <span className="text-red-500">*</span>
            <input required name="name" value={form.name} onChange={change} className={line} />
          </label>
          <label>{b.phone} <span className="text-red-500">*</span>
            <input required name="phone" type="tel" dir="ltr" value={form.phone} onChange={change} className={`${line} text-start`} />
          </label>
          {/* The browser shows its own calendar / clock icon; dates and times stay left-to-right */}
          <label>{b.date}
            <input name="date" type="date" dir="ltr" value={form.date} onChange={change} className={`${line} text-start`} />
          </label>
          <label>{b.time}
            <input name="time" type="time" dir="ltr" value={form.time} onChange={change} className={`${line} text-start`} />
          </label>
          <label className="sm:col-span-2">{b.reason}
            <select name="reason" value={form.reason} onChange={change} className={line}>
              {b.reasons.map((r, i) => <option key={i} value={i}>{r}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2">{b.notes}
            <textarea name="notes" rows={2} value={form.notes} onChange={change} className={line} />
          </label>
        </div>

        <div className="mt-10">
          <Button type="submit">{b.send}</Button>
        </div>
        <p className="mt-4 text-xs text-gray">{b.note}</p>
      </motion.form>

      <Reveal delay={0.15}>
        <Photo src={photos.booking} alt={t.photos.team} className="h-full min-h-80 rounded-3xl" />
      </Reveal>
    </section>
  );
}
