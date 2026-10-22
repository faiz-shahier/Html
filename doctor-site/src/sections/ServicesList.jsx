import { useState } from "react";
import { serviceIcons, photos } from "../data";
import { useTranslation } from "react-i18next";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";

export default function ServicesList() {
  const [active, setActive] = useState(0);
  const { t, i18n } = useTranslation();
  const rtl = i18n.dir() === "rtl";
  const services = t("services.items").map((s, i) => ({ ...s, icon: serviceIcons[i] }));
  const service = services[active];

  return (
    <section className="panel">
      <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Tag>{t("services.tag")}</Tag>
          <h2 className="heading mt-6 max-w-xl">{t("services.title")}</h2>
        </div>
        <Button to="/contact" className="self-start sm:self-auto">{t("services.book")}</Button>
      </Reveal>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_0.75fr_0.45fr]">
        {/* Numbered list — click a service to see its details */}
        <Stagger as="ul">
          {services.map((s, i) => (
            <StaggerItem as="li" key={i}>
              <button onClick={() => setActive(i)}
                className={`flex w-full items-center gap-6 border-b border-navy/10 py-5 text-start text-xl transition ${active === i ? "text-blue" : "hover:text-blue"}`}>
                <span className="font-serif text-sm italic text-gray">0{i + 1}</span>
                <motion.span animate={{ x: active === i ? (rtl ? -8 : 8) : 0 }}>{s.title}</motion.span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <Photo src={photos.surgery} alt={t("photos.surgery")} className="aspect-[4/4.4] rounded-3xl" />
        </Reveal>

        {/* Detail card: the old one slides out, the new one slides in */}
        <Reveal delay={0.2} className="rounded-3xl bg-gradient-to-b from-white to-lavender-light p-7 shadow-xl shadow-navy/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-blue shadow-sm"><service.icon /></span>
              <p className="mt-5 font-semibold">{service.title}</p>
              <p className="mt-2 text-sm italic leading-relaxed text-gray">{service.text}</p>
            </motion.div>
          </AnimatePresence>
          <p className="mt-5 text-xs text-gray">{t("doctor.hospital")}</p>
        </Reveal>
      </div>
    </section>
  );
}
