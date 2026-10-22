import { FaBrain } from "react-icons/fa6";
import { bio, photos } from "../data";
import Tag from "../components/Tag";
import Button from "../components/Button";
import Photo from "../components/Photo";
import { motion } from "framer-motion";
import { Reveal } from "../components/Motion";

export default function AboutIntro({ full = false }) {
  return (
    <section className="panel grid items-center gap-14 lg:grid-cols-2">
      <Reveal>
        <Tag>About the doctor</Tag>
        <h2 className="heading mt-6">A pioneer of neurosurgery in Afghanistan</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-gray">
          {(full ? bio : bio.slice(0, 1)).map((text) => <p key={text}>{text}</p>)}
        </div>
        <div className="mt-10">
          <Button to={full ? "/contact" : "/about"}>{full ? "Schedule your visit" : "More about him"}</Button>
        </div>
      </Reveal>

      {/* Photo with decorative orbit lines */}
      <Reveal delay={0.15} className="relative py-10">
        <motion.div
          className="absolute inset-x-[22%] -inset-y-[10%] rounded-full border border-navy/20"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <Photo src={photos.about} alt="Doctor in clinic" className="relative aspect-[16/10] w-full rounded-3xl shadow-xl" />
        {/* Icon bubble floats up and down */}
        <motion.span
          className="absolute -bottom-1 left-[calc(50%-1.75rem)] grid h-14 w-14 place-items-center rounded-full bg-white text-blue shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaBrain />
        </motion.span>
      </Reveal>
    </section>
  );
}
