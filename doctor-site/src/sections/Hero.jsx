import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { FaBrain, FaCrown } from "react-icons/fa6";
import { photos, membershipCodes } from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import Button from "../components/Button";
import Photo from "../components/Photo";
import Badge from "../components/Badge";
import BrainNetwork from "../components/BrainNetwork";
import { motion } from "framer-motion";
import { ease, fadeUp } from "../components/Motion";

// Children appear one after another when the page opens
const group = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
});

// Cards lift a little on hover
const lift = { whileHover: { y: -6 }, transition: { type: "spring", stiffness: 300, damping: 20 } };

export default function Hero() {
  const { t, lang } = useLanguage();

  // The heading appears word by word; accent words get the softer serif style
  const words = t.hero.heading.flatMap((part) => part.text.split(" ").map((w) => ({ w, serif: part.accent })));

  return (
    <section className="mx-auto max-w-6xl px-3 pt-3">
      {/* Gradient panel with text + moving brain */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-lavender-light via-lavender-light to-cream px-6 pb-48 pt-14 sm:px-14 lg:pb-56 lg:pt-24">
        <motion.div className="relative z-10 max-w-lg" initial="hidden" animate="show" variants={group(0.1)}>
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-widest"># {t.doctor.title}</motion.span>
          <motion.h1 key={lang} variants={group()} initial="hidden" animate="show" className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight lg:text-6xl">
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
            <Button to="/contact">{t.hero.cta}</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute end-0 top-0 h-[70%] w-full opacity-50 lg:end-4 lg:top-6 lg:h-[72%] lg:w-[55%] lg:opacity-100"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          {/* The head faces the text: mirrored in right-to-left languages */}
          <BrainNetwork className="h-full w-full rtl:-scale-x-100" />
        </motion.div>
        {photos.hero && (
          <Photo src={photos.hero} alt={t.photos.doctor} className="absolute bottom-0 end-6 hidden h-[88%] w-[42%] rounded-t-[2rem] lg:block" />
        )}
        <motion.div
          className="absolute bottom-56 end-[40%] hidden lg:block"
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
            <h3 className="text-lg font-semibold">{t.hero.cardTitle}</h3>
            <p className="mt-2 text-sm text-gray">{t.hero.cardText}</p>
            <Link to="/services" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">{t.hero.learnMore} <GoArrowUpRight className="rtl:-scale-x-100" /></Link>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <FaBrain className="text-xl text-blue" />
            <p className="mt-6 text-sm text-gray">{t.hero.fellowship}</p>
            <p className="mt-1 text-2xl font-semibold">FCPS</p>
          </div>
          <div className="hidden sm:block">
            <Photo src={photos.clinic} alt={t.photos.clinic} className="h-full min-h-36 rounded-2xl" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} {...lift} className="rounded-3xl bg-white/80 p-7 shadow-xl shadow-navy/5 backdrop-blur">
          <p className="font-semibold">{t.hero.societiesTitle}</p>
          <p className="text-sm text-gray">{t.hero.societiesText}</p>
          <motion.div variants={group(0.3)} className="mt-6 flex -space-x-2">
            {membershipCodes.map((code, i) => (
              <motion.span key={code} title={t.credentials.membershipItems[i]}
                variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 260, damping: 16 } } }}
                whileHover={{ y: -4, zIndex: 1 }}
                className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-lavender-light text-[10px] font-bold">
                {code}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} {...lift} className="rounded-3xl bg-white/80 p-7 shadow-xl shadow-navy/5 backdrop-blur">
          <FaCrown className="text-blue" />
          <p className="mt-4 italic leading-relaxed">{t.hero.first}</p>
          <p className="mt-4 text-xs text-gray">{t.hero.firstSource}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
