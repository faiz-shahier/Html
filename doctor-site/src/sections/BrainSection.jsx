import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import BrainNetwork from "../components/BrainNetwork";
import Tag from "../components/Tag";
import Button from "../components/Button";
import { Reveal, Stagger, StaggerItem, ease } from "../components/Motion";

// Dark section with the moving brain network + a few key facts
export default function BrainSection() {
  const { t } = useTranslation();

  return (
    <section className="panel relative grid items-center gap-10 overflow-hidden bg-navy text-white lg:grid-cols-2">
      {/* soft glow behind the brain (the brain is on the start side) */}
      <div className="pointer-events-none absolute -start-20 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-blue/40 blur-3xl" />

      <motion.div
        className="relative order-last aspect-square w-full lg:order-none"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 1.2, ease }}
      >
        {/* light lavender on the dark background; the head faces the text */}
        <BrainNetwork color="190, 194, 255" className="h-full w-full rtl:-scale-x-100" />
      </motion.div>

      <div className="relative">
        <Reveal>
          <Tag>{t("brain.tag")}</Tag>
          <h2 className="heading mt-6 text-white">{t("brain.title")}</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-white/70">{t("brain.text")}</p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
          {t("brain.stats").map((s) => (
            <StaggerItem key={s.label}>
              <p className="text-3xl font-semibold text-lavender">{s.value}</p>
              <p className="mt-2 text-xs leading-snug text-white/60">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10">
          <Button to="/contact" white>{t("brain.cta")}</Button>
        </Reveal>
      </div>
    </section>
  );
}
