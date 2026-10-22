import { useState } from "react";
import { FaLocationDot, FaPhone, FaClock, FaWhatsapp } from "react-icons/fa6";
import { doctor, reasons } from "../data";
import Title from "../components/Title";

const info = [
  { icon: FaLocationDot, title: doctor.hospital, text: doctor.city },
  { icon: FaPhone, title: "Phone & WhatsApp", text: doctor.phone },
  { icon: FaClock, title: "Clinic hours", text: "Call to confirm available times" },
];

const input = "mt-2 w-full rounded-xl border border-navy/10 px-4 py-3 outline-none focus:border-teal focus:ring-4 focus:ring-teal/10";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", reason: reasons[0], message: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Opens WhatsApp with the message already written
  const send = (e) => {
    e.preventDefault();
    const text = `Appointment request\nName: ${form.name}\nPhone: ${form.phone}\nReason: ${form.reason}\n${form.message}`;
    window.open(`https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <div>
          <Title small="Book a consultation" title="Take the first step toward relief" />
          <ul className="mt-10 space-y-6">
            {info.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-teal"><item.icon /></span>
                <span><b className="block">{item.title}</b><span className="text-gray">{item.text}</span></span>
              </li>
            ))}
          </ul>
          <p className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
            <b>Emergency?</b> For a serious head or spine injury, go to the nearest emergency department straight away.
          </p>
        </div>

        <form onSubmit={send} className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <label className="block text-sm font-semibold">Full name
            <input required name="name" value={form.name} onChange={change} className={input} />
          </label>
          <label className="mt-5 block text-sm font-semibold">Phone number
            <input required name="phone" type="tel" value={form.phone} onChange={change} className={input} />
          </label>
          <label className="mt-5 block text-sm font-semibold">Reason for visit
            <select name="reason" value={form.reason} onChange={change} className={input}>
              {reasons.map((reason) => <option key={reason}>{reason}</option>)}
            </select>
          </label>
          <label className="mt-5 block text-sm font-semibold">Message (optional)
            <textarea name="message" rows={4} value={form.message} onChange={change} className={input} />
          </label>
          <button type="submit" className="btn mt-7 w-full"><FaWhatsapp className="text-lg" /> Send on WhatsApp</button>
        </form>
      </div>
    </section>
  );
}
