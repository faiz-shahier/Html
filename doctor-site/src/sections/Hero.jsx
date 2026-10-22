import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { FaBrain, FaCrown } from "react-icons/fa6";
import { doctor, photos, memberships } from "../data";
import Button from "../components/Button";
import Photo from "../components/Photo";
import Badge from "../components/Badge";
import BrainNetwork from "../components/BrainNetwork";
import { motion } from "framer-motion";
import { ease, fadeUp } from "../components/Motion";

// The heading appears word by word; serif words are the italic part
const words = [
  ..."Advanced brain & spine care with".split(" ").map((w) => ({ w })),
  ..."expert surgical hands".split(" ").map((w) => ({ w, serif: true })),
];

// Children appear one after another when the page opens
const group = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
});

// Cards lift a little on hover
const lift = { whileHover: { y: -6 }, transition: { type: "spring", stiffness: 300, damping: 20 } };

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-3 pt-3">
      {/* Gradient panel with text + moving brain */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-lavender-light via-lavender-light to-cream px-6 pb-48 pt-14 sm:px-14 lg:pb-56 lg:pt-24">
        <motion.div className="relative z-10 max-w-lg" initial="hidden" animate="show" variants={group(0.1)}>
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-widest"># {doctor.title}</motion.span>
          <motion.h1 variants={group()} className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight lg:text-6xl">
            {/* A real space after each word, so screen readers and Google read the words correctly */}
            {words.map(({ w, serif }, i) => (
              <span key={i}>
                <motion.span variants={fadeUp} className={`inline-block ${serif ? "font-serif font-normal italic" : ""}`}>
                  {w}
                </motion.span>{" "}
              </span>
            ))}
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-10">
            <Button to="/contact">Schedule your visit</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute right-0 top-0 h-[70%] w-full opacity-50 lg:right-4 lg:top-6 lg:h-[72%] lg:w-[55%] lg:opacity-100"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <BrainNetwork className="h-full w-full" />
        </motion.div>
        {photos.hero && (
          <Photo src={photos.hero} alt="Doctor photo" className="absolute bottom-0 right-6 hidden h-[88%] w-[42%] rounded-t-[2rem] lg:block" />
        )}
        <motion.div
          className="absolute bottom-56 right-[40%] hidden lg:block"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.8 }}
          whileHover={{ scale: 1.08 }}
        >
          <Badge className="relative" />
        </motion.div>
      </div>

      {/* Cards that overlap the bottom of the panel */}
      <motion.div className="relative z-10 -mt-40 grid gap-4 px-3 sm:px-11 lg:-mt-44 lg:grid-cols-[1.9fr_1fr_1fr]"
        initial="hidden" animate="show" variants={group(0.6)}>
        <motion.div variants={fadeUp} {...lift} className="grid gap-3 rounded-3xl bg-white/80 p-3 shadow-xl shadow-navy/5 backdrop-blur sm:grid-cols-3">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Specialist Care</h3>
            <p className="mt-2 text-sm text-gray">Your safety and recovery are the first priority.</p>
            <Link to="/services" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">Learn more <GoArrowUpRight /></Link>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <FaBrain className="text-xl text-blue" />
            <p className="mt-6 text-sm text-gray">Fellowship in Neurosurgery</p>
            <p className="mt-1 text-2xl font-semibold">FCPS</p>
          </div>
          <div className="hidden sm:block">
            <Photo src={photos.clinic} alt="Clinic" className="h-full min-h-36 rounded-2xl" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} {...lift} className="rounded-3xl bg-white/80 p-7 shadow-xl shadow-navy/5 backdrop-blur">
          <p className="font-semibold">Member of 4 societies</p>
          <p className="text-sm text-gray">Recognised internationally</p>
          <motion.div variants={group(0.3)} className="mt-6 flex -space-x-2">
            {memberships.map((m) => (
              <motion.span key={m.short} title={m.full}
                variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 260, damping: 16 } } }}
                whileHover={{ y: -4, zIndex: 1 }}
                className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-lavender-light text-[10px] font-bold">
                {m.short}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} {...lift} className="rounded-3xl bg-white/80 p-7 shadow-xl shadow-navy/5 backdrop-blur">
          <FaCrown className="text-blue" />
          <p className="mt-4 italic leading-relaxed">The first neurosurgeon from Afghanistan to earn the FCPS in Neurosurgery.</p>
          <p className="mt-4 text-xs text-gray">— {doctor.hospital}, Kabul</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
