import { useState } from "react";
import { FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { doctor, photos, visitReasons } from "../data";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";
import { motion } from "framer-motion";
import { Reveal, ease } from "../components/Motion";

const line = "mt-1 w-full border-b border-navy/15 bg-transparent py-2.5 outline-none focus:border-blue";

export default function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", reason: visitReasons[0], notes: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Opens WhatsApp with the request already written
  const send = (e) => {
    e.preventDefault();
    const text = `Appointment request\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date} ${form.time}\nReason: ${form.reason}\n${form.notes}`;
    window.open(`https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="panel grid gap-14 bg-white bg-gradient-to-br from-white from-60% to-lavender shadow-sm lg:grid-cols-2">
      <motion.form
        onSubmit={send}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.7, ease }}
      >
        <Tag>Appointment booking</Tag>
        <h2 className="heading mt-6">Easy &amp; quick appointment booking</h2>

        <div className="mt-10 grid gap-x-8 gap-y-6 text-sm text-gray sm:grid-cols-2">
          <label>Full name <span className="text-red-500">*</span>
            <input required name="name" value={form.name} onChange={change} className={line} />
          </label>
          <label>Phone number <span className="text-red-500">*</span>
            <input required name="phone" type="tel" value={form.phone} onChange={change} className={line} />
          </label>
          <label className="relative">Preferred date
            <input name="date" type="date" value={form.date} onChange={change} className={line} />
            <FaRegCalendar className="pointer-events-none absolute bottom-3.5 right-0" />
          </label>
          <label className="relative">Preferred time
            <input name="time" type="time" value={form.time} onChange={change} className={line} />
            <FaRegClock className="pointer-events-none absolute bottom-3.5 right-0" />
          </label>
          <label className="sm:col-span-2">Reason for visit
            <select name="reason" value={form.reason} onChange={change} className={line}>
              {visitReasons.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2">Additional notes
            <textarea name="notes" rows={2} value={form.notes} onChange={change} className={line} />
          </label>
        </div>

        <div className="mt-10">
          <Button type="submit">Send on WhatsApp</Button>
        </div>
        <p className="mt-4 text-xs text-gray">The clinic will reply to confirm your time. In an emergency, go to the nearest hospital.</p>
      </motion.form>

      <Reveal delay={0.15}>
        <Photo src={photos.booking} alt="Doctor and team" className="h-full min-h-80 rounded-3xl" />
      </Reveal>
    </section>
  );
}
