import { FaLocationDot, FaPhone, FaRegClock } from "react-icons/fa6";
import { contact } from "../data";
import { useTranslation } from "react-i18next";
import Booking from "../sections/Booking";
import { Stagger, StaggerItem } from "../components/Motion";

export default function Contact() {
  const { t } = useTranslation();
  const info = [
    { icon: FaLocationDot, title: t("doctor.hospital"), text: t("doctor.city") },
    // dir="ltr" keeps the phone number in the right order in Dari and Pashto
    { icon: FaPhone, title: t("contact.phoneTitle"), text: <span dir="ltr">{contact.phone}</span> },
    { icon: FaRegClock, title: t("contact.hoursTitle"), text: t("contact.hoursText") },
  ];

  return (
    <>
      <Stagger className="mx-auto grid max-w-6xl gap-4 px-3 pt-6 sm:grid-cols-3">
        {info.map((item, i) => (
          <StaggerItem key={i} className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lavender-light text-blue"><item.icon /></span>
            <span><b className="block font-semibold">{item.title}</b><span className="text-sm text-gray">{item.text}</span></span>
          </StaggerItem>
        ))}
      </Stagger>
      <Booking />
    </>
  );
}
