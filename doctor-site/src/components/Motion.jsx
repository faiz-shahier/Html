import { motion } from "framer-motion";

/*
 * Simple animation helpers used across the site.
 *   <Reveal>       fades + slides one block up when it scrolls into view
 *   <Stagger>      list/grid whose <StaggerItem> children appear one after another
 * They start as soon as any part is on screen ("some"), so tall blocks on phones never stay hidden.
 */

export const ease = [0.22, 1, 0.36, 1];
const viewport = { once: true, amount: "some", margin: "0px 0px -60px 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
