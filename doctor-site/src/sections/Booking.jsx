import { useState } from "react";
import { contact, photos } from "../data";
import { useTranslation } from "react-i18next";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";
import { motion } from "framer-motion";
import { Reveal, ease } from "../components/Motion";

const line = "mt-1 w-full border-b border-navy/15 bg-transparent py-2.5 outline-none focus:border-blue";

export default function Booking() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.dir() === "rtl";
  // reason is saved as a number, so it stays correct when the language changes
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", reason: 0, notes: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Opens WhatsApp with the request already written
  const send = (e) => {
    e.preventDefault();
    const text = `${t("booking.message.title")}\n${t("booking.message.name")}: ${form.name}\n${t("booking.message.phone")}: ${form.phone}\n${t("booking.message.date")}: ${form.date} ${form.time}\n${t("booking.message.reason")}: ${t("booking.reasons")[form.reason]}\n${form.notes}`;
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
        <Tag>{t("booking.tag")}</Tag>
        <h2 className="heading mt-6">{t("booking.title")}</h2>

        <div className="mt-10 grid gap-x-8 gap-y-6 text-sm text-gray sm:grid-cols-2">
          <label>{t("booking.name")} <span className="text-red-500">*</span>
            <input required name="name" value={form.name} onChange={change} className={line} />
          </label>
          <label>{t("booking.phone")} <span className="text-red-500">*</span>
            <input required name="phone" type="tel" dir="ltr" value={form.phone} onChange={change} className={`${line} text-start`} />
          </label>
          {/* The browser shows its own calendar / clock icon; dates and times stay left-to-right */}
          <label>{t("booking.date")}
            <input name="date" type="date" dir="ltr" value={form.date} onChange={change} className={`${line} text-start`} />
          </label>
          <label>{t("booking.time")}
            <input name="time" type="time" dir="ltr" value={form.time} onChange={change} className={`${line} text-start`} />
          </label>
          <label className="sm:col-span-2">{t("booking.reason")}
            <select name="reason" value={form.reason} onChange={change} className={line}>
              {t("booking.reasons").map((r, i) => <option key={i} value={i}>{r}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2">{t("booking.notes")}
            <textarea name="notes" rows={2} value={form.notes} onChange={change} className={line} />
          </label>
        </div>

        <div className="mt-10">
          <Button type="submit">{t("booking.send")}</Button>
        </div>
        <p className="mt-4 text-xs text-gray">{t("booking.note")}</p>
      </motion.form>

      <Reveal delay={0.15}>
        <Photo src={photos.booking} alt={t("photos.team")} className="h-full min-h-80 rounded-3xl" />
      </Reveal>
    </section>
  );
}
