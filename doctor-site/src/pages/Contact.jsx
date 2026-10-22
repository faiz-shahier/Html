import { FaLocationDot, FaPhone, FaRegClock } from "react-icons/fa6";
import { doctor } from "../data";
import Booking from "../sections/Booking";

const info = [
  { icon: FaLocationDot, title: doctor.hospital, text: doctor.city },
  { icon: FaPhone, title: "Phone & WhatsApp", text: doctor.phone },
  { icon: FaRegClock, title: "Clinic hours", text: "Call to confirm available times" },
];

export default function Contact() {
  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-4 px-3 pt-6 sm:grid-cols-3">
        {info.map((item) => (
          <div key={item.title} className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lavender-light text-blue"><item.icon /></span>
            <span><b className="block font-semibold">{item.title}</b><span className="text-sm text-gray">{item.text}</span></span>
          </div>
        ))}
      </div>
      <Booking />
    </>
  );
}
