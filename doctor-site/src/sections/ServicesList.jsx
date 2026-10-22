import { useState } from "react";
import { services, photos, doctor } from "../data";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";

export default function ServicesList() {
  const [active, setActive] = useState(0);
  const service = services[active];

  return (
    <section className="panel">
      <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Tag>Services</Tag>
          <h2 className="heading mt-6 max-w-xl">Specialist care for your brain and spine</h2>
        </div>
        <Button to="/contact" className="self-start sm:self-auto">Book now</Button>
      </Reveal>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_0.75fr_0.45fr]">
        {/* Numbered list — click a service to see its details */}
        <Stagger as="ul">
          {services.map((s, i) => (
            <StaggerItem as="li" key={s.title}>
              <button onClick={() => setActive(i)}
                className={`flex w-full items-center gap-6 border-b border-navy/10 py-5 text-left text-xl transition ${active === i ? "text-blue" : "hover:text-blue"}`}>
                <span className="font-serif text-sm italic text-gray">0{i + 1}</span>
                <motion.span animate={{ x: active === i ? 8 : 0 }}>{s.title}</motion.span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <Photo src={photos.about} alt="Treatment" className="aspect-[4/4.4] rounded-3xl" />
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
          <p className="mt-5 text-xs text-gray">{doctor.hospital}</p>
        </Reveal>
      </div>
    </section>
  );
}
